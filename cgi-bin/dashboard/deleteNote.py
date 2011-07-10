#!/usr/bin/python
# Part of Cody Sehl's dashboard website
# Stores the properties of a single note in a sql database

import cgi # For handling http requests
import cgitb # For debugging http stuff
import MySQLdb # For talking to MySQL


# Uncomment next line to turn on debug mode
cgitb.enable() 

# Content is recieved as name
# Keys:
# name

# Init connection #
data = cgi.FieldStorage()
conn = MySQLdb.connect(host = 'localhost', user = 'root', passwd = '1170Cody', db = 'dashboard')
cursor = conn.cursor()
name = data['name'].value;

print  "Content-type: text/html"
print
print name
print 'DELETE FROM notes WHERE name = "{0}"'.format(name)

#MySQL code below
######################
cursor.execute('DELETE FROM notes WHERE name = "{0}";'.format(name))

cursor.close()
conn.close()
