import sys
import subprocess
import cgi

source_file = sys.argv[1]

proc = subprocess.Popen(['git', 'log',
                         '--pretty=%H',
                         '--',
                         source_file],
                        stdout=subprocess.PIPE)

commits = []

for line in proc.stdout:
    commits += [line.rstrip()]

commits.reverse()

sources = []

for commit in commits:
    proc = subprocess.Popen(['git', 'show',
                             commit + ":" + source_file],
                            stdout=subprocess.PIPE)

    lines = ""
    for line in proc.stdout:
        lines += line

    sources += [lines]

i = 0

print '<!DOCTYPE html>'
print '<meta charset="utf-8">'
print '<link rel="stylesheet" href="archaea.css">'
print '<script type="text/javascript" src="jquery-2.0.2.min.js"></script>'
print '<script type="text/javascript" src="archaea.js"></script>'

print '<button id="play"></button>'

print '<revisions count="' + str(len(sources)) + '">'

for source in sources:
    print '<code num="' + str(i) + '">'
    print cgi.escape(source)
    print '</code>'

    i += 1

print '</revisions>'
