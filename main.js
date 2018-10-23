//Datepicker
$(document).ready(function() {
  $('#date').datepicker();
});


var $feedbackForm = $('.feedback-form');
var $feedbackInput = $feedbackForm.find('input');
var $dialog = $('#dialog');
var inp = [];
//Проверка заполненности полей feedback формы
$feedbackForm.on('submit', (e) => {
  e.preventDefault();
  for (var i = 1; i <= $feedbackInput.length; i++) {
    let item = $feedbackInput.eq(i - 1);
    if (item.val() == '') {
      item.addClass('is-invalid');
      item.effect('bounce');
      inp.push(i);
      $dialog.dialog("open");
    } else {
      item.removeClass('is-invalid');
    }
  }
  $dialog.find('p').text((!!inp[0] ? ('Заполните поля '+ inp[0]) : '') + (!!inp[1] ? (', '+ inp[1]) : '') + (!!inp[2] ? (' и '+ inp[2]) : ''))
  inp = [];
})

$("#dialog").dialog({
  autoOpen: false,
});

//drag and drop
/*
function setDND() {
  $("#product-list > div").draggable({
    stack: "cart",
    cursor: 'move',
    helper: 'clone',
    revert: true,
  });
  $(".cart").droppable({
    over: function() {
      $(".cart").css("background", "#d7fa99");
    },
    out: function() {
      $(".cart").css('background', '')
    },
    drop: function(a, b) {
      $(b.draggable).detach().appendTO(this)
    }
  });
}
 */
function setDND() {}
