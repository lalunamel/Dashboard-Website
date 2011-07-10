// Gets all notes from the server, appends them to the windowDiv element, and makes them draggable
function loadNotes()
{
	$.get("cgi-bin/dashboard/getNotes.py", function (response, status, xhr)
	{
		$("#windowDiv").append(response);
		if (status == "success")
			makeDraggable('.notes');
	});
}

// Makes a class draggable
function makeDraggable(className)
{
	var notes = $(className);
	for(var i = 0; i < notes.length; i++)
	{
		var value = notes[i];
		$(value).draggable({ containment: 'parent'});
		$(value).draggable("option", "scroll", false);
		$(value).draggable("option", "stack", value);
	}
}

// Sends a note with the id of 'id' to the server to be stored
function sendNote(id)
{
	var ele = document.getElementById(id);
	var thisName = id;
	var thisContent;
	var thisXPos = ele.style.left;
	var thisYPos = ele.style.top;
	if(ele.style.zIndex != "")
		var thisZIndex = ele.style.zIndex;
	else
		var thisZIndex = 0;

	var children = ele.childNodes;
	for (var i = 0; i < children.length; i++)
	{
		if(children[i].id == 'content')
		{
			thisContent = children[i].innerHTML;
				if(thisContent.indexOf("textarea") != -1)
				{
					thisContent = $.trim(thisContent) // Remove whitespace
					var beginning = thisContent.substring(0,thisContent.indexOf(">", 0) + 1);
					if(children[i].firstElementChild.value != null)
						var middle = children[i].firstElementChild.value;
					else
						middle = "";
					var end = thisContent.substring(thisContent.indexOf("<", thisContent.indexOf("<") + 1), thisContent.length);
					thisContent = beginning + middle + end;
				}
			break;
		}
	}

	$.post("cgi-bin/dashboard/storeNote.py", { name : id, content : thisContent, xPos : thisXPos, yPos : thisYPos, zIndex : thisZIndex});
	
}

// Creates a note with a name of 'note' + #
function createNoteWOContent()
{
	var noteName;
	$.get("/cgi-bin/dashboard/getNumNotes.py", function(response, status, xhr)
	{
		response = response.substring(0, response.length - 1) // Get rid of the return char at the end
		noteName = 'note' + response;
		xPos = 10;
		yPos = 10;
		var content = '<textarea name = "textBoxArea" id = "textArea' + response + '" class = "textAreas" onblur = "sendNote(\'' + noteName + '\')"></textarea>';
			
		var newNote = 
			'<div id = "' + noteName + '" class = "ui-widget-content notes" style = "left:' + xPos + 'px; top:' + yPos + 'px;">	 \
				<div id ="closeButton" class = "closeButtons" onmouseout = "mouseOutDelete(\'' + noteName + '\')" onmouseover = "mouseOverDelete(\'' + noteName + '\')" onmousedown = "mouseDownDelete(\'' + noteName + '\')" onmouseup = deleteNote(\'' + noteName + '\')> \
					<img src = "imgs/dashboard/deleteButton" id = "deleteButtonImg" alt = "Close" /> \
				</div> \
				<img id = "submitContent" class = "submitButtons" src="imgs/dashboard/submitContent.png" alt="submitContent" onclick="submitCont(\'' + noteName + '\')">\
				<div id ="handle" class = "handles" onClick = "sendNote(\'' + noteName + '\')"> \
					<canvas id="handleImage" class = "handleImages"> Please use a browser that supports html5 </canvas>	\
				</div> \
				<canvas id="noteImage" class = "noteImages"> Please use a browser that supports html5 </canvas> \
				<div id = "content" class = "contents">'	+ 
					content +
				'</div> \
			</div>';
		$('#windowDiv').append(newNote);
		makeDraggable('.notes');
		sendNote(noteName);
	});
	
}

// Creates a note with a name of 'note' + #
// And content denoted by passed in html code
function createNoteWContent(content)
{
	var noteName;
	$.get("/cgi-bin/dashboard/getNumNotes.py", function(response, status, xhr)
	{
		response = response.substring(0, response.length - 1) // Get rid of the return char at the end
		noteName = 'note' + response;
		xPos = 10;
		yPos = 10;
			
		var newNote = 
			'<div id = "' + noteName + '" class = "ui-widget-content notes" style = "left:' + xPos + 'px; top:' + yPos + 'px; z-Index: 0">	 \
				<div id ="closeButton" class = "closeButtons" onmouseout = "mouseOutDelete(\'' + noteName + '\')" onmouseover = "mouseOverDelete(\'' + noteName + '\')" onmousedown = "mouseDownDelete(\'' + noteName + '\')" onmouseup = deleteNote(\'' + noteName + '\')> \
					<img src = "imgs/dashboard/deleteButton" id = "deleteButtonImg" alt = "Close" /> \
				</div>  \
				<div id ="handle" class = "handles" onClick = "sendNote(\'' + noteName + '\')"> \
					<canvas id="handleImage" class = "handleImages"> Please use a browser that supports html5 </canvas>	\
				</div> \
				<canvas id="noteImage" class = "noteImages"> Please use a browser that supports html5 </canvas> \
				<div id = "content" class = "contents">'	+ 
					content +
				'</div> \
			</div>';
		$('#windowDiv').append(newNote);
		makeDraggable('.notes');
		sendNote(noteName);
	});
	
}

// Deletes a note
function deleteNote(id)
{
	var windowDiv = document.getElementById('windowDiv');
	windowDiv.removeChild(getChildElementById(windowDiv, id));
	$.post('/cgi-bin/dashboard/deleteNote.py', {name : id});
}

// Chances the icon of the delete button to the mouseOut delete button in the specified note
function mouseOutDelete(id)
{
	var note = document.getElementById(id);
	var imgElement = getChildElementById(note, 'deleteButtonImg');
	imgElement.setAttribute('src', 'imgs/dashboard/deleteButton.png')
}

// Changes the icon of the delete button to the mouseOver delete button in the specified note
function mouseOverDelete(id)
{
	var note = document.getElementById(id);
	var imgElement = getChildElementById(note, 'deleteButtonImg');
	imgElement.setAttribute('src', 'imgs/dashboard/deleteButtonMouseOver.png')
}

// Changes the icon of the delete button to the mouseDown delete button in the specified note
function mouseDownDelete(id)
{
	var note = document.getElementById(id);
	var imgElement = getChildElementById(note, 'deleteButtonImg');
	imgElement.setAttribute('src', 'imgs/dashboard/deleteButtonMouseDown.png')
}

// Gets the child element of the specified element
function getChildElementById(parent, id)
{
	var children = parent.children;
	for (var i = 0; i < children.length; i++)
	{
		if(children[i].id == id)
			return children[i];
		else if(children[i].children)
		{
			var result = getChildElementById(children[i], id);
			if(result != null)
				return result
		}
	}
	return null;
} 

// Moves the menu down into the screen
function pullMenuDown()
{
	// Move the menu up 45 pixels
	var menu = document.getElementById("menu");
	var style = menu.style;
	style.top = "0px";
}

// Moves the menu up past the screen
function pushMenuUp()
{
	var menu = document.getElementById("menu");
	var style = menu.style;
	style.top = "-50px";
}

// Inserts an element into a new note
function insertElement()
{
	// Load the input box
	var box = document.getElementById("inputBox");
	box.style.visibility = "visible";
	box.style.zIndex = 1000;
}

// Reads the text in the input box called "inputContent" 
// and creates a new note with content
function submitCont(id)
{
	var ele = document.getElementById(id);
	var newContent = $(ele).find(".textAreas")[0].value;
	$(ele).find(".contents")[0].innerHTML = newContent;
}


