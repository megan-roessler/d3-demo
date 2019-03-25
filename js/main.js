/*Javascript by Megan Roessler, 2019*/
window.onload = function(){
	var w = 900, h = 500;
	
	var container = d3.select("body") //Ex. 1.1, get body element from DOM
		.append("svg") //Ex. 1.2, create svg element
		.attr("width", w) //Ex. 1.3, assign width
		.attr("height", h) //Ex. 1.3, assign height
		.attr("class", "container") //Ex. 1.3, assign class
		.style("background-color", "rgba(0,0,0,0.2)"); //Ex 1.4, add style
		
	var innerRect = container.append("rect") //Ex. 1.6, add innerRect block, add to svg
		.datum(400) //Ex 1.7, add datum
		.attr("width", function(d){ //Ex 1.8, rectangle width
			return d * 2; // 400 * 2 = 800
		})
		.attr("height", function(d){ //Ex. 1.8, rectangle height
			return d; //400
		})
		//Ex. 1.9, adding styles/attributes to rectangle
		.attr("class", "innerRect")//class name
		.attr("x", 50) //position from left on x
		.attr("y", 50) //position from top on y
		.style("fill", "#FFFFFF"); //add fill color
		
		//Ex. 2.3, add an array
		//var dataArray = [10, 20, 30, 40, 50];
		
		//Ex. 2.8, city population data
		var cityPop = [
			{
				city: 'Boca Raton',
				population: 98150
			},
			{
				city: 'Palm Springs', 
				population: 48142
			},
			{
				city: 'Atlantic City',
				population: 38429
			},
			{
				city: 'Honolulu',
				population: 351792
			}
		];
		
		//Ex. 3.1, creating an x coord linear scale
		var x = d3.scaleLinear()//create scale
			.range([90, 715]) //min and max of output
			.domain([0, 3]); //min and max of input
		
		//Ex. 3.3, max and min pop values
		//find min value of array
		var minPop = d3.min(cityPop, function(d){
			return d.population;
		});
		//Ex. 3.3, max value of array
		var maxPop = d3.max(cityPop, function(d){
			return d.population;
		});
		//scale for circles center y coord
		var y = d3.scaleLinear()
			//Ex. 3.11, update y scale for axis
			.range([450, 50]) //OLD --> 440, 95
			.domain([0, 400000]); //OLD --> minPop, maxPop
			
		//Ex. 3.5, implementing a color scale
		var color = d3.scaleLinear()
			.range([
				"#FDBE85",
				"#D94701"
			])
			.domain([
				minPop,
				maxPop
			]);
		
		//Ex. 3.6, create y axis
		var yAxis = d3.axisLeft(y);
		//Ex. 3.7/3.9, create g element and add axis
		var axis = container.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(50, 0)")
			.call(yAxis);
		//Ex. 3.8, invert call yAxis
		yAxis(axis);
		
		//Ex. 3.12, adding a title
		var title = container.append("text")
			.attr("class", "title")
			.attr("text-anchor", "middle")
			.attr("x", 450)
			.attr("y", 30)
			.text("City Populations");
			
		//Ex. 3.14, creating citcle labels
		var labels = container.selectAll(".labels")
			.data(cityPop)
			.enter()
			.append("text")
			.attr("class", "labels")
			.attr("text-anchor", "left")
			.attr("y", function(d){
				//vertical pos centered on circle
				return y(d.population);
			});
			
		//Ex. 3.15, create <tspan> elements
		var nameLine = labels.append("tspan")
			.attr("class", "nameLine")
			.attr("x", function(d,i){
				//horizontal pos 2 right of circle
				return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
			})
			.text(function(d){
				return d.city;
			});
			
		//Ex. 3.17, formatting population numbers
		var format = d3.format(",");
		
		//Ex. 3.15, fix labels
		var popLine = labels.append("tspan")
			.attr("class", "popLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
			})
			.attr("dy", "15") //Ex. 3.16, offsetting second line, set verticle offset
			.text(function(d){
				return "Pop. " + format(d.population);
			});
			

		
		//Ex. 2.4/2.8, add magic trio "the triple threat", use city data
		var circles = container.selectAll(".circles")//THERE ARE NO CIRCLES
			.data(cityPop)//feed array to circles
			.enter()//poof, magic!
			.append("circle")//Ex. 2.5, add circle for each datum
			.attr("class", "circles") //apply class name 2 circles
			.attr("id", function(d){ //Ex. 2.8, get city names
				return d.city;
			})
				
			.attr("r", function(d){//Ex. 2.6, define circle radius
				//Ex. 2.8, calc radius from populations
				var area = d.population * 0.01;
				return Math.sqrt(area/Math.PI);
			})
			.attr("cx", function(d, i){ //Ex. 2.6/2.8/3.2, x coord
				return x(i);//return 90 + (i * 180);
			})
			.attr("cy", function(d){ //Ex. 2.6/2.8, y coord
				return y(d.population); //Ex. 3.4 and OLD --> return 450 - (d.population * 0.0005);
			})
			.style("fill", function(d, i){ //Ex. 3.5, add fill color
				return color(d.population);
			})
			.style("stroke", "#000"); //Ex. 3.5, plain 'ol black stroke
			
};
