$(function(){
  $('#send').click(function(e){
    //Stop form submission & check the validation
    e.preventDefault();

    // Variable declaration
    var error = false;
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var message = $('#message').val();

    if(email.length == 0 || email.indexOf('@') == '-1'){
      var error = true;
      $('#email').addClass('error');
    }else{
      $('#email').removeClass('error');
    }
    if(name == ''){
      var error = true;
      $('#name').addClass('error');
    }else{
      $('#name').removeClass('error');
    }
    if(message == ''){
      var error = true;
      $('#message').addClass('error');
    }else{
      $('#message').removeClass('error');
    }

    // If there is no validation error, next to process the mail function
    if(error == false){
      // Disable submit button just after the form processed 1st time successfully.
      $('.msg').fadeOut();
      $('#send').attr({'disabled' : 'true', 'value' : 'Sending' });
      /* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to email.php*/
      //$.post("https://getsimpleform.com/messages/ajax?form_api_token=3b8bbcbdf26210278973abe522bc23f5", $("#form").serialize(),function(result){
        //alert(result);
        //if(result == 'sent'){
          ////If the email is sent successfully, remove the submit button
          //$('#send').attr({'disabled' : 'true'});
          //$('#send').text('Thank you!');
        //} else {
          //$('#send').removeAttr('disabled');
          //$('#send').text('Error!');
        //}
      //});
      // Simple Form
      $.ajax({
        dataType: 'jsonp',
        url: "http://getsimpleform.com/messages/ajax?form_api_token=3b8bbcbdf26210278973abe522bc23f5",
        data: $("#contact_form").serialize()
      }).done(function() {
        //callback which can be used to show a thank you message
        //and reset the form
        //alert("Thank you, for contacting us");
        //window.location.href = "/confirm/";
        clearForm('#contact_form');
        $('#send').attr({'disabled' : 'true'});
        $('#send').text('Thank you!');
        $('.notice').fadeIn();
      });
    } else {
      $('.msg').fadeIn();
    }
  });
});
