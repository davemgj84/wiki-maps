const json = require('body-parser/lib/types/json');
/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) => {

  // GETS all maps
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GETS particular map
  router.get("/:id", (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM maps
    WHERE id = $1;`, [values])
      .then(data => {
        const maps = data.rows[0];
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // redirect to create new map page
  router.get("/new", (req, res) => {
    res.redirect('#new-map-page-redirect-me#')
  });

  // Creates new map
  router.post("/", (req, res) => {
    const { user_id, title, description } = req.body;
    db.query(`INSERT INTO maps (user_id, title, description)
    VALUES ($1, $2, $3) RETURNING *`, [user_id, title, description])
      .then(data => {
        const maps = data.rows[0];
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Creates new locations for a specific map
  router.post("/:id", (req, res) => {
    const locations = req.body.locations;
    const parsed = JSON.parse(locations)
    const promises = [];
    for (const location of parsed) {
      const promise = db.query(`INSERT INTO locations (map_id, title, description, image_url, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [location.map_id, location.title, location.description, location.image_url, location.latitude, location.longitude])
      promises.push(promise);
    }
    Promise.all(promises)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Deletes a map
  router.delete("/:id", (req, res) => {
    const values = req.params.id;
    db.query(`DELETE FROM maps WHERE id = $1`, [values])
      .then(data => {
        const maps = data.rows;
        res.json({ success: true });
      })
      .catch(err => {
        res
          .status(500)
          .json({ success: false, error: err });
      });
  });

  // Edits a location
  router.patch("/:id", (req, res) => {
    const { title, description, image_url, latitude, longitude, id } = req.body;
    const query = `UPDATE locations SET title = $1, description = $2, image_url = $3, latitude = $4, longitude = $5
    WHERE map_id = $6  AND id = $7 RETURNING *;`;
    db.query(query, [title, description, image_url, latitude, longitude, req.params.id, id])
    .then(data => {
      const maps = data.rows[0];
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;

};
