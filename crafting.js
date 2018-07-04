$(document).ready(function() {
	var optionsHtml = "";
	var keys = Object.keys(tiers);
	keys.sort();
	for (var i=0; i<keys.length; ++i) {
		optionsHtml += "<option value=\"" + keys[i] + "\">" + keys[i] + "</option>";
	}
	$("#recipe_picker").html(optionsHtml);
	$(".js-example-basic-single").select2();
});