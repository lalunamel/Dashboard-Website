// Gets all notes from the server, appends them to the windowDiv element, and makes them draggable
function loadNotes()
{
  var windowDiv = document.getElementById("windowDiv");
	for(var noteId in localStorage) 
  {
    windowDiv.innerHTML += localStorage[noteId];
  }
  // Need extra for loop because notes are not ready in the one above
  for(var noteId in localStorage) 
  {
    makeDraggable(noteId);
  }
}

// Makes a class draggable
function makeDraggable(id)
{
	var note = document.getElementById(id);
  $(note).draggable({
    containment: "parent",
    scroll: false,
    stack: ".notes" 
  });
}

// Stores a note in localstorage
function sendNote(id)
{
  var note = document.getElementById(id).outerHTML;
  localStorage[id] = note;
}

// Creates a note with a name of 'note' + #
function createNoteWOContent()
{  
  var noteNumber = new Date().getTime();
  var noteName = "note" + noteNumber;
  var xPos = 10;
  var yPos = 10;
  var content = '<textarea name = "textBoxArea" id = "textArea' + noteNumber + '" class = "textAreas" onblur = "sendNote(\'' + noteName + '\')"></textarea>';
  
  var newNote = 
			'<div id = "' + noteName + '" class = "ui-widget-content notes" style = "left:' + xPos + 'px; top:' + yPos + 'px;">	 \
				<div class = "closeButtons" onmouseup = deleteNote(\'' + noteName + '\')> \
				</div> \
				<img class = "submitButtons" src="imgs/dashboard/submitContent.png" alt="submitContent" onclick="submitCont(\'' + noteName + '\')">\
				<div class = "handles" onClick = "sendNote(\'' + noteName + '\')"> \
				</div> \
				<div class = "contents">'	+ 
					content +
				'</div> \
			</div>';
  $('#windowDiv').append(newNote);
  makeDraggable(noteName);
  sendNote(noteName);
}

// Creates a note with a name of 'note' + #
// And content denoted by passed in html code
function createNoteWContent(content)
{
  var noteNumber = new Date().getTime();
  var noteName = "note" + noteNumber;
  var xPos = 10;
  var yPos = 10;
    
  var newNote = 
    '<div id = "' + noteName + '" class = "ui-widget-content notes" style = "left:' + xPos + 'px; top:' + yPos + 'px; z-Index: 0">	 \
      <divclass = "closeButtons" onmouseup = deleteNote(\'' + noteName + '\')> \
      </div>  \
      <divclass = "handles" onClick = "sendNote(\'' + noteName + '\')"> \
      </div> \
      <div class = "contents">'	+ 
        content +
      '</div> \
    </div>';
  $('#windowDiv').append(newNote);
  makeDraggable(noteName);
  sendNote(noteName);
}

// Deletes a note
function deleteNote(id)
{
  var parent = document.getElementById("windowDiv");
  var note = document.getElementById(id);
  parent.removeChild(note);
  localStorage.removeItem(id);
}

// Reads the text in the input box called "inputContent" 
// and creates a new note with content
function submitCont(id)
{
	var contentWrapper = document.getElementById(id).lastElementChild;
	var newContentHTML = contentWrapper.firstElementChild.value;
	contentWrapper.innerHTML = newContentHTML;
}


