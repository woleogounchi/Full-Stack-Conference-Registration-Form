let total = 0;
// Focus on the name input
$('#name').focus();
// Target the ‘Other’ input field, and hide it initially
$("#other-title").hide();
// Hide the 'select theme' option element in the 'design' menu
$('#design option').eq(0).text("");
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
        $('#color option').eq(1).attr('selected', true);
        for (let i = 1; i <= 3; i++) {
            $('#color option').eq(i).show();
        }
        /* If “heart js” is selected, hide the three “js puns” option elements in the “Color” 
        drop down menu, show the three “heart js” option elements, and update the “Color” 
        field to the first available color. */
    } else if ($('#design option:selected').val() === "heart js") {
        $('#color option').eq(4).attr('selected', true);
        for (let i = 1; i <= 3; i++) {
            $('#color option').eq(i).hide();
            $('#color option').eq(i + 3).show();
        }
    }
});

// Create an element to display the total activity cost
priceTotal = $('<label>').addClass('total').text('The total price is: $' + total);
$('.activities').append(priceTotal);
// Listen for changes in the Activity section
$('[type="checkbox"]').click((e) => {
    // Target the activity checked
    const activityChecked = $(e.target);
    // Get the text inside the checked activity label
    const insideText = activityChecked.parent().text();
    // Get the dollar sign index in the text to locate
    // the activity cost value
    const dolIndex = insideText.indexOf('$')
        // Slice the activity cost value
    const stringCost = insideText.slice(dolIndex + 1, insideText.length);
    // Convert the activity cost into an integer value
    const cost = parseInt(stringCost);
    // Update, display the total activity cost and disable conflicting activities
    if (activityChecked.is(':checked')) {
        total += cost;
        $('.total').text('The total price is: $' + total);
        // In order to disable any conflicting activities,
        // first we need to fetch the day and time for each activity 
        const dashIndex = insideText.indexOf('-');
        const comIndex = insideText.indexOf(',');
        const dayNtime = insideText.slice(dashIndex + 1, comIndex);
        // We may now disable every activity happening at the same day and time 
        const checkboxes = $('[type="checkbox"]');
        for (let i = 0; i < checkboxes.length; i++) {
            const checkboxText = checkboxes.eq(i).parent().text();
            if (checkboxText.includes(dayNtime) && checkboxText !== insideText) {
                checkboxes.eq(i).attr("disabled", true);
                checkboxes.eq(i).parent().css("color", "grey");
            } else {
                checkboxes.eq(i).attr("disabled", false);
                checkboxes.eq(i).parent().css("color", "black");
            }
        }
    } else {
        total -= cost;
        $('.total').text('The total price is: $' + total);
    }
});