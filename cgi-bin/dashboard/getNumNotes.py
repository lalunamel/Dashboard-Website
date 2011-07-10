#!/usr/bin/python
# Part of Cody Sehl's dashboard website
# Retrieves data on all notes stored in the sql database

import cgi # For handling http requests
import cgitb # For debugging http stuff
import MySQLdb # For talking to MySQL

# Uncomment the next line to turn on debug mode
#cgitb.enable()

# Content is stored in the DB as name, text content, x position, y position
print  "Content-type: text/html"
print

# Init connection #
data = cgi.FieldStorage()
conn = MySQLdb.connect(host = 'localhost', user = 'root', passwd = '1170Cody', db = 'dashboard')
cursor = conn.cursor()

# Get number of rows
cursor.execute("SELECT COUNT(*) FROM notes")
n = cursor.fetchone()
print n[0]


# Close the connection
cursor.close()
conn.close()
