$(function($){
  
    $('.link').on('click', function(e){
      e.preventDefault();
      var email = $('.sub_email').val();
      $.ajax({
        url: '/api/subscriptions',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {email: email} ,

        success: function( data, textStatus, jQxhr ){ 

          $(".c-error").remove();

          if(typeof data.name !== 'undefined') {
            $('.c-message').html('<div class="c-error"> ' +
                                  'Sorry, the email you entered is already subscribed'+
                                '</div>');
          } else {
            $('.subs').html('<div class="c-thanks c-text-color-pink"> ' +
                              'Thanks for subscribing, and we hope you enjoy the challenge'+
                            '</div>');
            
          }
          console.log(data);
        },
        error: function( jqXhr, textStatus, errorThrown ){ 
          $('.c-message').html('<div class="c-error"> ' +
                            'Sorry, we are having problems, try again later'+
                          '</div>');
        }
      }); 
    });
});