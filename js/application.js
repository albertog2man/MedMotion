var $ = require('jQuery');
var packery = require('packery');
var Draggabilly = require('draggabilly');
var $hand;
$(function(){

  window.cursor = $('#cursor');
  window.output = $('#output');

  Leap.loop({enableGestures: true, hand: function(hand){
    $hand = hand;
    var screenPosition = hand.screenPosition(hand.palmPosition);

    var outputContent = "x: " + (screenPosition[0].toPrecision(4)) + 'px' +
           "        <br/>y: " + (screenPosition[1].toPrecision(4)) + 'px' +
           "        <br/>z: " + (screenPosition[2].toPrecision(4)) + 'px';


    // hide and show the cursor in order to get second-topmost element.
    cursor.hide();
    var el = document.elementFromPoint(
        hand.screenPosition()[0],
        hand.screenPosition()[1]
    );
    cursor.show();

    if (el){
      outputContent += '<br>Topmost element: '+ el.tagName + ' #' + el.id +  ' .' + el.className;
    }

    output.html(outputContent);

    cursor.css({
      left: screenPosition[0] + 'px',
      top:  screenPosition[1] + 'px'
    });

  }}, function(frame){
    if (frame.valid && frame.gestures.length > 0) {
      frame.gestures.forEach(function(gesture){
        if(gesture.type === "circle"){
          cursor.hide();
          var el = document.elementFromPoint(
              $hand.screenPosition()[0],
              $hand.screenPosition()[1]
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
