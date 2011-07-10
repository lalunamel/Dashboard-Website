#!/usr/bin/python
# Part of Cody Sehl's dashboard website
# Retrieves data on all notes stored in the sql database

import cgi # For handling http requests
import cgitb # For debugging http stuff
import MySQLdb # For talking to MySQL

# Uncomment the next line to turn on debug mode
cgitb.enable()

# Content is stored in the DB as name, text content, x position, y position
# Keys:
# name, content, xPos, yPos, zIndex

print  "Content-type: text/html"
print

# Init connection #
data = cgi.FieldStorage()
conn = MySQLdb.connect(host = 'localhost', user = 'root', passwd = '1170Cody', db = 'dashboard')
cursor = conn.cursor()

cursor.execute('SELECT * FROM notes') # Get all notes
notes = cursor.fetchall()
for note in notes:
	print  """<div id = "{0}" class = "ui-widget-content notes" style = "left:{1}px; top:{2}px; z-index:{3};">
							<div id ="closeButton" class = "closeButtons" onmouseout = "mouseOutDelete('{4}')" onmouseover = "mouseOverDelete('{5}')" onmousedown = "mouseDownDelete('{6}')" onmouseup = deleteNote('{7}')>
								<img src = "imgs/deleteButton" id = "deleteButtonImg" alt = "Close" />
							</div>
							<img id = "submitContent" class = "submitButtons" src="imgs/submitContent.png" alt="submitContent" onClick="submitCont('{8}')">
							<div id ="handle" class = "handles" onClick = "sendNote('{9}')"> 
								<canvas id="handleImage" class = "handleImages"> Please use a browser that supports html5 </canvas>
							</div>
							<canvas id="noteImage" class = "noteImages"> Please use a browser that supports html5 </canvas>
							<div id = "content" class = "contents">
								{10}
							</div>
						</div>""".format(note[0], # name
														 note[2], # xPos
														 note[3], # yPos
														 note[4], # zIndex
														 note[0], # name
														 note[0], # name
														 note[0], # name
														 note[0], # name
														 note[0], # name
														 note[0], # name
														 note[1]) # content


cursor.close()
conn.close()
