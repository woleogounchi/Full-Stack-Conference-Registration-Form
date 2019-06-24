$('#name').focus();
// Target the ‘Other’ input field, and hide it initially
$("#other-title").hide();
// Hide the 'select theme' option element in the 'design' menu
$('#design option').eq(0).text("");
// Update the 'color' field to read 'Please select a T-Shirt theme'
$('#color option:first').before('<option selected="selected">Please select a T-Shirt theme</options>');
// Hide the colors in the “Color” drop down menu
$('#color option').hide();