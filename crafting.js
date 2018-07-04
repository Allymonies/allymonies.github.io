$(document).ready(function() {
	var optionsHtml = "";
	for (var itemKey in tiers) {
		optionsHtml += "<option value=\"" + itemKey + "\">" + itemKey + "</option>";
	}
	$("#recipe_picker").html(optionsHtml);
	$("js-example-basic-single").select2();
});