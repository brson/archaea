import sys
import subprocess
import cgi

source_file = sys.argv[1]

proc = subprocess.Popen(['git', 'log',
                         '--pretty=%H @@ %ai @@ %s',
                         '--',
                         source_file],
                        stdout=subprocess.PIPE)

commits = []

for line in proc.stdout:
    commits += [line.rstrip()]

commits.reverse()

sources = []

for commit in commits:

    sha, date, desc = commit.split(' @@ ')

    proc = subprocess.Popen(['git', 'show',
                             sha + ":" + source_file],
                            stdout=subprocess.PIPE)

    lines = ""
    for line in proc.stdout:
        lines += line

    lines = lines.strip()

    sources += [(date, desc, lines)]

print '<!DOCTYPE html>'
print '<meta charset="utf-8">'
print '<link rel="stylesheet" href="archaea.css">'
print '<script type="text/javascript" src="jquery-2.0.2.min.js"></script>'
print '<script type="text/javascript" src="archaea.js"></script>'

print '<button id="back"></button>'
print '<button id="forward"></button>'
print '<button id="action" class="start"></button>'
print '<button id="reset"></button>'
print '<span id="status"></span>'

print '<revisions count="' + str(len(sources)) + '">'

i = 0

for source in sources:
    print '<code num="' + str(i) + '" date="' + source[0] + '" desc="' + cgi.escape(source[1]) + '">'
    print cgi.escape(source[2])
    print '</code>'

    i += 1

print '</revisions>'
