// var PatientFinder = (function () {
//   return {
//     getAllPatients: function(){
//       $.get('https://guarded-atoll-78576.herokuapp.com/patients', function(data){
//         return data;
//       });
//     },
//     getByFirstName: function(name){
//       $.get('https://guarded-atoll-78576.herokuapp.com/api_patient?first_name=' + name, function(data){
//         return data
//       });
//     }
//   }
// })();
function htmlMock(data){
  return `<a href="#" title="">
    <div class="col-xs-12 col-md-4 grid-item">
      <div class="card testimonial-card">
        <div class="card-up primary-color">
        </div>
        <div class="avatar"><img src="http://mdbootstrap.com/wp-content/uploads/2015/10/avatar-2.jpg" class="img-circle img-responsive">
        </div>
        <div class="card-block">
          <h4 class="card-title" id='name'>${data.first_name} ${data.last_name}</h4>
          <hr>
        </div>
      </div>
    </div>
    </a>`;
}
$(function(){
  $.ajax({
    url: "https://guarded-atoll-78576.herokuapp.com/patients",
    method: "GET",
    dataType: 'json'
  })
  .done(function( data ) {
    $.each(data, function(index, value){
      $('.grid').append(htmlMock(value));
      // console.info(value);
    })
  });
  
})


$(document).on('ready', function(){
  setTimeout(function(){
    var $grid = $('.grid').packery({
      itemSelector: '.grid-item',
    });

    $grid.find('.grid-item').each(function(i, gridItem) {
      var draggie = new Draggabilly(gridItem);
      console.log("got it");
      $grid.packery('bindDraggabillyEvents', draggie);
    });    
  }, 1000)
})