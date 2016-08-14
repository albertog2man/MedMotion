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
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function htmlMock(data){
  return `<a href="#" title="">
    <div class="col-xs-12 grid-item">
      <div class="card testimonial-card">
        <div class="card-up primary-color">
        </div>
        <div class="avatar"><img src="http://mdbootstrap.com/wp-content/uploads/2015/10/avatar-2.jpg" class="img-circle img-responsive">
        </div>
        <div class="card-block">
          <h4 class="card-title" id='name'>${data.first_name.capitalize()} ${data.last_name.capitalize()}</h4>
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
      $('.grid1').append(htmlMock(value));
      $('.grid2').append(htmlMock(value));
      $('.grid3').append(htmlMock(value));
      // console.info(value);
    })
  });
  
})

function setGrid(selector){
  var $grid1 = $(`${selector}`).packery({
    itemSelector: '.grid-item',
  });

  $grid1.find('.grid-item').each(function(i, gridItem) {
    var draggie = new Draggabilly(gridItem);
    $grid1.packery('bindDraggabillyEvents', draggie);
  }); 
}


$(document).on('ready', function(){
  setTimeout(function(){
    setGrid('.grid1')
    setGrid('.grid2')
    setGrid('.grid3')
  }, 1000)
  
})