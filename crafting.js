$(document).ready(function() {
	var optionsHtml = "";
	for (var itemKey in tiers) {
		optionsHtml += "<option value=\"" + itemKey + "\">" + itemKey + "</option>";
	}
	console.log(optionsHtml);
	$("#recipe_picker").html(optionsHtml);
});