// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  CommentsController.bindEvents();
});

var CommentsController = {
  bindEvents: function () {
    // ajax:beforeSend (before form is submitted)
    // ajax:success (when server returns successfully)
    // ajax:error (when server returns unsuccessfully)
    // ajax:complete (when server returns no matter what)   

    // listen for new_question_comment_path and new_answer_comment_path link
    $(document).on('ajax:success', 'span.click_new_comment', this.onLinkSuccess);
    
    // listen for something other than document
    $(document).on('ajax:beforeSend', 'form#new_comment', this.beforeSend);
    $(document).on('ajax:success', 'form#new_comment', this.onSuccess);
    $(document).on('ajax:error', 'form#new_comment', this.onError);
  },

  beforeSend: function(e) {
    $(e.target).find('.errors').remove();
  },

  onSuccess: function(e, response, status, xhr) {
    $newComment = $(response.html).find('li').last();
    insideonSuccess = $(this)
    $commentsDisplay = $(this).parent().find('.comments_display ul').append($newComment);
    var comment = $(response.html).first('id ul');
  comment.append($newComment);

  },

  onError: function(e, xhr, status, message) {
    if (xhr.responseJSON == null)
    {
      window.alert("remember to log in or create an account");
    }
    else
    {
      $(e.target).parent().html(xhr.responseJSON.html);
    }
  }, 

  onLinkSuccess: function(e, partial, status, xhr) {
    $(this).closest('div.create_comment').html(partial.html);
    $(this).closest('div.comments_display').remove();
  }
};
