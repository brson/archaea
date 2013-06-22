import sys

files = sys.argv[1:]

print '<!DOCTYPE html>'
print '<meta charset="utf-8">'

for file in files:
    print '<a href="' + file + '.html">' + file + '</a><br/>'
