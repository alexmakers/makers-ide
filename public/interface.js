$(document).ready(function(){
  $('.files').on('click', '.delete', function(e) {
    e.preventDefault();
    $item = $(this).parent();

    if(confirm('Really delete this file?')) {
      $.ajax('/files?file=' + $(this).data('file'), {
        type: 'delete',
        success: function() {
          $item.addClass('removed-item');      
        }
      })
    }
  });

  $('.files').on('webkitAnimationEnd', 'a', function(){
    if($(this).hasClass('removed-item')) {
      $(this).remove();
    } else {
      $(this).removeClass('new-item');
    }
  });

  $('.new-file').on('submit', function(e) {
    e.preventDefault();
    var $filename = $(this).find('input')
    var newFile = Mustache.render($('#new-file-template').html(), { file: $filename.val() });

    $.post('/files?file=' + $filename.val(), { content: '' }, function() {
      $('.files').append(newFile);
    }).always(function(){
      $filename.val('');
    })
  })
})