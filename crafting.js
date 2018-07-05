$(document).ready(function() {
	addMachine("manual");
	var optionsHtml = "";
	var mOpts = "";
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
		mOpts += "<option value=\"" + machineKeys[i] + "\">" + machineKeys[i] + "</option>";
	}
	var matHtml = "";
	for (var i=0; i<materials.length; i++) {
		matHtml += "<option value=\"" + materials[i] + "\">";
	}	
	$("#recipe_picker").html(optionsHtml);
	$("#machine_picker").html(mOpts);
	$("#materials").html(matHtml);
	$(".js-example-basic-single").select2();
	showRecipe("accurate_autobow");
	$("#recipe_picker").on("change", function() {
		showRecipe(this.value);
	});
	$("#new_recipe").click(function() {
		$("#create_recipe").toggleClass("hidden");
		$("#machine_picker").val("manual").trigger("change");
		$("#creation_id").val("");
		$("#creation_ingredients").html("");
	});
	$("#add_ingredient").click(function() {
		$("#creation_ingredients").append("<input list=\"materials\"><br>");
	});
	$("#remove_ingredient").click(function() {
		$("#creation_ingredients").children().last().remove();
		$("#creation_ingredients").children().last().remove();
	});
	$("#save_recipe").click(function() {
		var ingredientArray = [];
		$("#creation_ingredients").children("input").each(function(i) {
			ingredientArray.push($(this).val());
		});
		addRecipe($("#machine_picker").val(), $("#creation_id").val(), ingredientArray);
		var matHtml = "";
		for (var i=0; i<materials.length; i++) {
			matHtml += "<option value=\"" + materials[i] + "\">";
		}	
		$("#materials").html(matHtml);
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
		$("#create_recipe").toggleClass("hidden");
		$("#machine_picker").val("manual").trigger("change");
		$("#creation_id").val("");
		$("#creation_ingredients").html("");
	});
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
	for (var i = 0; i <= highestLevel; i++) {
		recipeHtml += "<li><h4>Level " + i.toString() + " Cost</h4><ul>";
		var itemKeys = Object.keys(cost[i]);
		itemKeys.sort();
		for (var j=0; j<itemKeys.length; j++) {
			if (machines.hasOwnProperty(itemKeys[j])) {
				recipeHtml += "<li>" + itemKeys[j] + ": <b>x" + cost[i][itemKeys[j]] + "</b> - " + machines[itemKeys[j]];
			} else {
				recipeHtml += "<li>" + itemKeys[j] + ": <b>x" + cost[i][itemKeys[j]] + "</b> - Raw Material";
			}
		}
		recipeHtml += "</ul></li>";
	}
	recipeHtml += "</ul>";
	$("#recipe").html(recipeHtml);
}