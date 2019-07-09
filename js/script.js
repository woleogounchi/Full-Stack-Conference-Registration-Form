// Run the javascript code whenever the DOM is ready
$(document).ready(function() {
    // We start by declaring our variables
    let total = 0;
    const creditCard = $('div #credit-card');
    const payPal = $('div p:first');
    const bitCoin = $('div p:last');
    const checkboxes = $('[type="checkbox"]');
    const $name = $('#name');
    const $nameRegEx = /^\S+$/;
    const $mail = $('#mail');
    const $mailRegEx = /^[^@.]+@[^@.]+\.[^@.]+$/i;
    const $ccNum = $('#cc-num');
    const $ccRegEx = /^(\d){13,16}$/;
    const $zipCode = $('#zip');
    const $zipRegEx = /^(\d){5}$/;
    const $cvvNum = $('#cvv');
    const $cvvRegEx = /^(\d){3}$/;
    // const errorMessage = 'Invalid entry. Please try again.';
    const $activityField = $('.activity');
    // Focus on the name input
    $('#name').focus();
    // Target the ‘Other’ input field, and hide it initially
    $("#other-title").hide();
    $('#title').on('change', () => {
        if ($('#title option:selected').val() === 'other') {
            $("#other-title").show();
        }
    });

    // Update the 'color' field to read 'Please select a T-Shirt theme'
    $('#color option:first').before('<option selected="selected">Please select a T-Shirt theme</options>');
    // Hide the colors in the “Color” drop down menu
    $('#color option').hide();
    /* When one of the two themes is selected, only the appropriate colors show in the “Color” 
    drop down menu, and the “Color” field should update to the first available color. */
    $('#design').on('change', () => {
        /* If “js puns” is selected, hide the three “heart js” option elements in the “Color” 
        drop down menu, show the three “js puns” option elements, and update the “Color” 
        field to the first available color. */
        if ($('#design option:selected').val() === "js puns") {
            for (let i = 1; i <= 3; i++) {
                $('#color option').eq(1).prop('selected', true);
                $('#color option').eq(i).show();
                $('#color option').eq(i + 3).hide();
            }
            /* If “heart js” is selected, hide the three “js puns” option elements in the “Color” 
            drop down menu, show the three “heart js” option elements, and update the “Color” 
            field to the first available color. */
        } else if ($('#design option:selected').val() === "heart js") {
            for (let i = 1; i <= 3; i++) {
                $('#color option').eq(4).prop('selected', true);
                $('#color option').eq(i).hide();
                $('#color option').eq(i + 3).show();
            }
        }
    });

    // ========Display Total Activity Cost========
    priceTotal = $('<label>').addClass('total').text('The total price is: $' + total);
    $('.activities').append(priceTotal);
    // Listen for changes in the Activity section
    $('[type="checkbox"]').click((e) => {
        // Target the activity checked
        const activityChecked = $(e.target);
        // Get the text inside the checked activity label
        const insideText = activityChecked.parent().text();
        const dashIndex = insideText.indexOf('—');
        const comIndex = insideText.indexOf(',');
        const dayNtime = insideText.slice(dashIndex + 1, comIndex);
        // Get the dollar sign index in the text to locate
        // the activity cost value
        const dolIndex = insideText.indexOf('$')
            // Slice the activity cost value
        const stringCost = insideText.slice(dolIndex + 1, insideText.length);
        // Convert the activity cost into an integer value
        const cost = parseInt(stringCost);
        // Update, display the total activity cost
        if (activityChecked.is(':checked')) {
            total += cost;
            $('.total').text('The total price is: $' + total);
        } else {
            total -= cost;
            $('.total').text('The total price is: $' + total);
        }
        // ========Disabling Conflicting Activities========
        for (let i = 0; i < checkboxes.length; i++) {
            const checkboxText = checkboxes.eq(i).parent().text();
            if (checkboxText.includes(dayNtime) && checkboxText !== insideText) {
                if (activityChecked.is(':checked')) {
                    checkboxes.eq(i).attr("disabled", true);
                    checkboxes.eq(i).parent().css("color", "grey");
                } else {
                    checkboxes.eq(i).attr("disabled", false);
                    checkboxes.eq(i).parent().css("color", "black");
                }
            }
        }
    });

    // ========Payment Section========
    // Hide the "Select Payment Method" option
    $('[value="select_method"]').remove();
    // Set the behaviour for each payment method selected
    // Keep 'Paypal' and 'Bitcoin' payment options hidden by default
    payPal.hide();
    bitCoin.hide();
    // Listen for a change in the payment options
    $('#payment').change(function() {
        // Get the value of the payment option selected
        const paymentOption = $(this).children('option:selected').val();
        // Set the behaviour for each payment option
        if (paymentOption === 'credit card') {
            creditCard.show();
        } else if (paymentOption === 'paypal') {
            creditCard.hide();
            payPal.show();
            bitCoin.hide();
        } else if (paymentOption === 'bitcoin') {
            creditCard.hide();
            payPal.hide();
            bitCoin.show();
        }
    });
    // ========Form validation========
    // Function that will be used to validate both the name and email address entries
    function validation(field, regex) {
        if (regex.test(field.val()) === false) {
            field.removeClass('valid');
            field.addClass('error');
            field.after('<span class="error-message">Invalid entry. Please try again.</span>');
            return false;
        } else {
            field.addClass('valid');
            field.removeClass('error');
            $('.error-message').remove();
            return true;
        }
    }
    // Function to validate that at least one activity has been checcked
    function activityValidation() {
        let j = 0;
        for (i = 0; i < $('input:checkbox').length; i++) {
            if ($('input:checkbox')[i].checked) {
                j++;
            }
        }
        if (j === 0) {
            $('.activities')
                .append($('<span class="error-message">Please pick at least one activity.</span>'))
                .css('display', 'block');
            return false;
        } else {
            $(".error-message").remove();
            return true;
        }
    }
    // An event listener to validate everything when the submit button us clicked
    $('button').click((e) => {
        const $payment = $('#payment');
        const $nameValid = validation($name, $nameRegEx);
        const $mailValid = validation($mail, $mailRegEx);
        const $activityValid = activityValidation();
        const $ccValid = validation($ccNum, $ccRegEx);
        const $zipValid = validation($zipCode, $zipRegEx);
        const $cvvValid = validation($cvvNum, $cvvRegEx);
        if ($payment.val() === 'credit card') {
            if ($nameValid && $mailValid && $activityValid && $ccValid && $zipValid && $cvvValid) {
                $('form').submit();
                alert('Thank you for registering!');
            } else {
                e.preventDefault();
            }
        } else {
            if ($nameValid && $mailValid && $activityValid) {
                $('form').submit();
                alert('Thank you for registering!');
            } else {
                e.preventDefault();
            }
        }
    });
});