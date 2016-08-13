var controller = new Leap.Controller();

window.controller.use('riggedHand', {
  boneLabels: function(boneMesh, leapHand){
    return boneMesh.name
  }
}).connect();
