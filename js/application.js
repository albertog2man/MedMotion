$(function(){

  var $grid = $('.grid').packery({
    itemSelector: '.grid-item'
  });

  $grid.find('.grid-item').each(function(i, gridItem) {
    var draggie = new Draggabilly(gridItem);
    console.log("got it");
    $grid.packery('bindDraggabillyEvents', draggie);
  });

})
