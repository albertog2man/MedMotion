var $ = require('jQuery');
var packery = require('packery');
var Draggabilly = require('draggabilly');
var $hand;
var current_position;

$(function(){

  window.cursor = $('#cursor');
  window.output = $('#output');
  window.target = null;
  var referencePosition1 = null;
  var referencePosition2 = null;
  Leap.loop({enableGestures: true, hand: function(hand){
    $hand = hand;
    var screenPosition = hand.screenPosition(hand.palmPosition);
    current_position = {x: screenPosition[0], y: screenPosition[1]};
    screenX = screenPosition[1] + 600;
      if(hand.pinchStrength > 0.50){
        var el = document.elementFromPoint(
          hand.screenPosition()[0],
          screenX
        );
        if(referencePosition1 === null && referencePosition2 === null){
          target = $(el).parents(".grid-item")[0];
          $(target).addClass("is-pointer-down is-dragging");
          referencePosition1 = screenX;
          referencePosition2 = hand.screenPosition()[0];
        }
        $(target).css({transform: 'translate3d(' + ( hand.screenPosition()[0] - referencePosition2) +'px,' + (screenX - referencePosition1 ) +'px, 0px)'});
      }else{
        referencePosition1 = null;
        referencePosition2 = null;
          // target.removeClass('is-pointer-down is-dragging');
      }

    cursor.css({
      left: screenPosition[0] + 'px',
      top:  screenX + 'px'
    });
  }}, function(frame){
    if (frame.valid && frame.gestures.length > 0) {
      frame.gestures.forEach(function(gesture){
        if(gesture.type === "circle"){
          cursor.hide();
          var el = document.elementFromPoint(
              $hand.screenPosition()[0],
              screenX
          );
          cursor.show();
          var target = $(el).parents("a")[0];
          console.log(target);
          if(target){
            // $(target).trigger('click');
            window.location.href = $(target).attr('href');
          }
        }
      })
    }
  })
  .use('screenPosition', {scale: 1});
})
