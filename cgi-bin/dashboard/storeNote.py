#!/usr/bin/python
# Part of Cody Sehl's dashboard website
# Stores the properties of a single note in a sql database

import cgi # For handling http requests
import cgitb # For debugging http stuff
import MySQLdb # For talking to MySQL

# Adds slashes to a string with quotes in it
# Taken from http://www.php2python.com/wiki/function.addslashes/
def addslashes(s):
    d = {'"':'\\"', "'":"\\'", "\0":"\\\0", "\\":"\\\\"}
    return ''.join(d.get(c, c) for c in s)

# Uncomment next line to turn on debug mode
cgitb.enable() 

# Content is recieved as name, text content, x position, y position
# Keys:
# name, content, xPos, yPos, zIndex


print  "Content-type: text/html"
print

#MySQL code below
######################

# Init connection #
data = cgi.FieldStorage()
conn = MySQLdb.connect(host = 'localhost', user = 'root', passwd = '1170Cody', db = 'dashboard')
cursor = conn.cursor()

	

# Compute Things #
cursor.execute("SELECT * FROM notes WHERE name = '{0}';".format(data['name'].value) )
currentNote = cursor.fetchone()
if 'content' not in data:
	content = ''
else:
	content = addslashes(data['content'].value)
if currentNote is None: # If an entry with the same name is not already in the table
	cursor.execute("""INSERT INTO notes (name, content, xPos, yPos, zIndex) 
				VALUES ("{0}", "{1}", "{2}", "{3}", "{4}")""".format(
												data['name'].value, 
												content,
												data['xPos'].value, 
												data['yPos'].value,
												data['zIndex'].value)) # Add a new entry
else: # If an entry with the same name exists
	cursor.execute("""UPDATE notes SET content = "{0}",
									   xPos    = "{1}",
									   yPos	   = "{2}",
									   zIndex  = "{3}"
									WHERE name = "{4}";""".format(content, 
																								data['xPos'].value,
																								data['yPos'].value,
																								data['zIndex'].value,
																								data['name'].value)) # Update its contents, xPos, and yPos

cursor.close()
conn.close()
