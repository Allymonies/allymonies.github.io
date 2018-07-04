$(document).ready(function() {
	var optionsHtml = "";
	var machineKeys = Object.keys(recipes);
	machineKeys.sort();
	for (var i=0; i<machineKeys.length; i++) {
		optionsHtml += "<optgroup label=\"" + machineKeys[i] + "\">";
		var itemKeys = Object.keys(recipes[machineKeys[i]]);
		itemKeys.sort();
		for (var j=0; j<itemKeys.length; ++j) {
			optionsHtml += "<option value=\"" + itemKeys[j] + "\">" + itemKeys[j] + "</option>";
		}
		optionsHtml += "</optgroup>";
	}
	$("#recipe_picker").html(optionsHtml);
	$(".js-example-basic-single").select2();
});

function showRecipe(item) {
	var cost = calculateCost(item);
	var highestLevel = 0;
	var recipeHtml = "<ul>";
	for (var costLevel in cost) {
		if (cost.hasOwnProperty(costLevel)) {
			if (costLevel > highestLevel) {
				highestLevel = costLevel;
			}
		}
	}
	for (var i = 0; i < highestLevel; i++) {
		recipeHtml += "<li><h4>Level " + i.toString() + " Cost</h4><ul>";
		var itemKeys = Object.keys(cost[i]);
		itemKeys.sort();
		for (var j=0; j<itemKeys.length; i++) {
			recipeHtml += "<li>" + itemKeys[j] + ": <b>x" + cost[i][itemKeys[j]] + "</b> - " + machine[itemKeys[j]];
		}
		recipeHtml += "</ul></li>";
	}
	recipeHtml += "</ul>";
	$("#recipe").html(recipeHtml);
}

$("#recipe_picker").on("change", function() {
	showRecipe(this.value);
});