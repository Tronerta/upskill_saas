/* global $, Stripe */
$(document).on('turbolinks:load', function(){
  const theForm = $('#pro-form');
  const submitBtn = $('#form-signup-btn');

  // Set Stripe public key
  Stripe.setPublishableKey( $('meta[name: "stripe-key"]').attr('content'));

  submitBtn.on('click', function(event){
    // prevent default form submit
    event.preventDefault();
    submitBtn.val('Processing').prop('disabled', true);

    // collect credit catd fields
    let ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

    // Use Stripe.js to validate
    let error = false;

    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }

    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }

    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }

    if (error) {
      // if there is error dont send to Stripe
      submitBtn.val('Sign Up').prop('disabled', false);
    } else {
      // send the card info to Stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }

    return false;
  });

  // Stripe response with a token
  function stripeResponseHandler (status, response){
    let token = response.id;

    // Inject card token in hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );

    // submit form to Rails app
    theForm.get(0).submit();
  }
})