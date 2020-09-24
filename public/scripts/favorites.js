$(document).ready(() => {

  const $heart = $('#side-bar');
  $heart.on('click', `.favorite`, (event) => {
    $.post(`/users/1/favorites`, {
      map_id: `${event.target.id}`
    })
    $(`#side-bar .favorite #${event.target.id}`).css('color', 'red');
  });
});