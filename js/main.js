/*Javascript by Megan Roessler, 2019*/
var mydiv = document.getElementById("mydiv");
mydiv.innerHTML = "Hello World";

//initialize function called when the script loads
function initialize(){
    cities();
	addColumns();
	addEvents();
};

//function to create a table with cities and their populations
	function cities(){
    //define two arrays for cities and population
		var cities = [
			'Madison',
			'Seattle',
			'Vancouver',
			'Waco'
		];
		var population = [
			233209,
			724745,
			631490,
			136436,
		];

    //create the table element
		var table = document.createElement("table");

    //create a header row
		var headerRow = document.createElement("tr");

    //add the "City" column
		var cityHeader = document.createElement("th");
		cityHeader.innerHTML = "City";
		headerRow.appendChild(cityHeader);

    //add the "Population" column
		var popHeader = document.createElement("th");
		popHeader.innerHTML = "Population";
		headerRow.appendChild(popHeader);

    //add the row to the table
		table.appendChild(headerRow);

    //loop to add a new row for each city
		for (var i = 0; i < cities.length; i++){
			var tr = document.createElement("tr");
	
			var city = document.createElement("td");
			city.innerHTML = cities[i];
			tr.appendChild(city);

			var pop = document.createElement("td");
			pop.innerHTML = population[i];
			tr.appendChild(pop);

			table.appendChild(tr);
		};

    //add the table to the div in index.html
		var mydiv = document.getElementById("mydiv");
		mydiv.appendChild(table);
};

//added debug.js below
function addColumns(cityPop){
    
    $('tr').each(function(i){

    	if (i == 0){
			//added missing letter to "append"
    		$(this).append('<th>City Size</th>');
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
			//changed citySize to camel case
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			//added parenthesis around "this"
			//added missing > in '<td'
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};

function addEvents(){
	//removed # from 'table'
	$('table').mouseover(function(){
		//removed ; listed as syntax error
		var color = "rgb("

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += "random";

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		};

		$(this).css('color', color);
	//removed ) listed as syntax error
	};

	function clickme(){

		alert('Hey, you clicked me!');
	};

	$('table').on('click', clickme);
// added missing ) listed as syntax error
});

//call the initialize function when the window has loaded
window.onload = initialize();
//added missing }; listed as error
};