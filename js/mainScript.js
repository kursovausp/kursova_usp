var mainNS = {
	data: [
		{
			title: "Home Alone",
			Description: "An eight-Year-old trouble-maker must protect his home from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
			Actors: "Macaulay Culkin, Joe Pesci, Daniel Stern, John Heard, Roberts Blossom, Catherine O'Hara",
			Genre: "Comedy",
			Year: "1990"
		},
		{
			title: "Home Alone2",
			Description: "An eight-Year-old trouble-maker must protect his home from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
			Actors: "Macaulay Culkin, Joe Pesci, Daniel Stern, John Heard, Roberts Blossom, Catherine O'Hara",
			Genre: "Comedy",
			Year: "1990"
		},
		{
			title: "Home Alone3",
			Description: "An eight-Year-old trouble-maker must protect his home from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
			Actors: "Macaulay Culkin, Joe Pesci, Daniel Stern, John Heard, Roberts Blossom, Catherine O'Hara",
			Genre: "Comedy",
			Year: "1990"
		}

	],
	performSearch: function(){
		console.log('aa');

		// var xhttp = new XMLHttpRequest();
		// xhttp.onreadystatechange = function() {
		//     if (this.readyState == 4 && this.status == 200) {
		//      document.getElementById("demo").innerHTML = this.responseText;
		//     }
	 //  	};
		// xhttp.open("GET", "ajax_info.txt", true);
		// xhttp.send();
		mainNS.createTableFound();
	},

	createTableFound: function(){
		var tableContainer = document.getElementById("foundMovies");

		// Create Table Header
		var header = document.createElement("h2");
		var headerText = document.createTextNode("Found Movies");
		header.appendChild(headerText);                          
		tableContainer.appendChild(header);

		var tableConfig = {
			class: "table tableCursor tableFoundHalf",
			headerData: {
				col001: "#",
				col002: "Title"
			}
		};
		var table = mainNS.createTable(tableConfig);
		tableContainer.appendChild(table);

		// Create Table Body
		var tableBody = document.createElement("tbody");                       
		table.appendChild(tableBody);

		//Create Table Contents
		mainNS.createTableRows(tableBody);
	},

	createTable: function(config){
		// Create Table
		var table = document.createElement("table");
		table.setAttribute("class", config.class);

		var header = mainNS.createTableHeader(config);
		table.appendChild(header);
		
		return table;
	},

	createTableHeader: function(config){
		// Create Table Header
		var tableHeader = document.createElement("thead");
		tableHeader.setAttribute("class", "thead-default");
		
		// CreateTable Header Cells
		var headerRow = document.createElement("tr");
		tableHeader.appendChild(headerRow);

		var headerNum = document.createElement("th");
		var headerNumText = document.createTextNode(config.headerData.col001);
		headerNum.appendChild(headerNumText);                          
		headerRow.appendChild(headerNum);

		var headerTitle = document.createElement("th");
		var headerTitleText = document.createTextNode(config.headerData.col002);
		headerTitle.appendChild(headerTitleText);                          
		headerRow.appendChild(headerTitle);

		return tableHeader;

	},

	createTableRows: function(tableRef){
		for (var i = 0; i < mainNS.data.length; i++){
			var row = mainNS.createTableRow(mainNS.data[i], i);
			tableRef.appendChild(row);  
		}
		
	},

	createTableRow: function(rowData, index){
		var row = document.createElement("tr");
		row.setAttribute("onclick", "mainNS.showInfo('"+ index +"');");
		var rowNum =  mainNS.createTableRowNumber(index);
		var cell = mainNS.createTableCellTitle(rowData.title);

		row.appendChild(rowNum);  
		row.appendChild(cell);
		return row;
	},

	createTableRowNumber: function(index){
		var rowNum = document.createElement("th");
		var rowNumText = document.createTextNode(index + 1);
		rowNum.appendChild(rowNumText);                          
		
		return rowNum;
	},

	createTableCellTitle: function(cellData){
		var cell = document.createElement("td");
		var cellText = document.createTextNode(cellData);
		cell.appendChild(cellText);                          
		
		return cell;
	},

	showInfo: function(index){
		var tableContainer = document.getElementById("foundMovies");

		// remove old table
		if (document.getElementById("movieTable") != null){
			$( "#movieTable" ).remove();
		}

		var data = mainNS.data[index];
		var tableConfig = {
			class: "table tableMovieInfo",
			headerData: {
				col001: "",
				col002: mainNS.data[index].title
			}
		};
		var table = mainNS.createTable(tableConfig);
		tableContainer.appendChild(table);
		table.setAttribute("id", "movieTable");

		// Create Table Body
		var tableBody = document.createElement("tbody");                       
		table.appendChild(tableBody);

		//Create Table Contents
		//mainNS.createTableRows(tableBody);
		mainNS.createTableMovieInfo(tableBody, data);
	},

	createTableMovieInfo: function(tableRef, cellsData){
		var mapMovieSpecs = ['Description', 'Actors', 'Genre', 'Year'];

		for (var i = 0; i < mapMovieSpecs.length; i++){

			var tableRow = mainNS.createTableMovieRow(mapMovieSpecs[i], cellsData[mapMovieSpecs[i]]);
			tableRef.appendChild(tableRow);
		}
	},

	createTableMovieRow: function(prop, value){
		var rowDesc = document.createElement("tr");

		var decrCell1 = mainNS.createTableMovieFirstCol(prop);
		rowDesc.appendChild(decrCell1);

		var decrCell2 = mainNS.createTableMovieSecondCol(value);
		rowDesc.appendChild(decrCell2);

		return rowDesc;
	},

	createTableMovieFirstCol: function(cellsData){
		var cell = document.createElement("th");
		var cellText = document.createTextNode(cellsData);
		cell.appendChild(cellText);                          
		
		return cell;
	},

	createTableMovieSecondCol: function(cellsData){
		var cell = document.createElement("td");
		var cellText = document.createTextNode(cellsData);
		cell.appendChild(cellText);                          
		
		return cell;
	},

	addMovie: function(){
		var isInputsCorrect = mainNS.checkInputs();
		console.log("Input is " + isInputsCorrect);
		if (isInputsCorrect){
			mainNS.recordData();
			alert("You succesfully added movie!");
			mainNS.resetInputs();
		}
			mainNS.recordData();
	},

	checkInputs: function(){
		var succesCount = 0;
		succesCount += mainNS.setErrorMsgStyle("titleInput", "titleMsg");
		succesCount += mainNS.setErrorMsgStyle("actorInput", "actorsMsg");
		succesCount += mainNS.setErrorMsgStyle("yearInput", "yearMsg");
		succesCount += mainNS.setErrorMsgStyle("genreInput", "genreMsg");
		succesCount += mainNS.setErrorMsgStyle("descrInput", "descrMsg");

		if (succesCount == 5){
			return true;
		}
		else{
			return false;
		}

	},

	setErrorMsgStyle: function(input, errorID){
		if (document.getElementById(input).value == ""){
			document.getElementById(errorID).style.display = "block";
			return 0;
		}
		else{
			document.getElementById(errorID).style.display = "none";
			return 1;
		}
	},

	recordData: function(){
		console.log('here');
		// var xhttp = new XMLHttpRequest();
		// xhttp.onreadystatechange = function() {
		//     if (this.readyState == 4 && this.status == 200) {
		//      document.getElementById("demo").innerHTML = this.responseText;
		//     }
	 //  	};
		// xhttp.open("GET", "ajax_info.txt", true);
		// xhttp.send();

		var entry = {}
			entry["title"] = $("#titleInput").val();
			entry["actors"] = $("#actorInput").val();
			entry["year"] = $("#yearInput").val();
			entry["genre"] = $("#genreInput").val();
			entry["description"] = $('#descrInput').val();
			// console.log("going to ajax")
		// $.ajax({
		//     type: "POST",
		//     contentType: "application/json",
		//     url: "/add",
		//     data: JSON.stringify(data),
		//     dataType: 'json',
		//     success: function (data) {
		//     	console.log("sent")
		//     	alert("Sent!");
		//         //$("#btn-update").prop("disabled", false);
		//         //...
		//     },
		//     error: function (e) {
		//     	alert("Movie not added successfully!");
		//         //$("#btn-save").prop("disabled", false);
		//         //...
		//     }
		// });
		console.log('entry', entry);
		console.log('mainNS.data', mainNS.data);
		mainNS.data.push(entry);

	},

	resetInputs: function(){
		$('#titleInput').val('');
		$('#actorInput').val('');
		$('#yearInput').val('');
		document.getElementById('nullGenre').selected = "true";
		$('#descrInput').val('');
	}

};