/* global $, Stripe */
$(document).on('turbolinks:load', function(){
  const theForm = $('#pro-form');
  const submitBtn = $('#form-submit-btn');

  // Set Stripe public key
  Stripe.setPublishableKey( $('meta[name: "stripe-key"]').attr('content'));

  submitBtn.on('click', function(event){
    // prevent default form submit
    event.preventDefault();

    // collect credit catd fields
    let ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

    // send the card info to Stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
})