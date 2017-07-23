# subnotes-python

Subnotes is a plaintext-based system for note taking and task-management. Going beyond the todo.txt system, you can keep indented lines (subnotes) with a header line (note).

## Current Features
* Automatically sort all items in alphabetical order with projects (prefixed by '+') on top and non-prefixed notes below. Subnotes remain attached to the header line if they're indented by 4 spaces.
* All done items (prefixed by 'x ') will be placed at the bottom of a file with a time stamp.

## Usage

Command prompt asks for you to copy your notes to the clipboard (in this format:)
```
+Project @tag
    x done item in project
    task1 for project
    x another done item in project
    task2 for project
    task3 for project

Not a project, so it's a note
    x done item for note
    subnote with priority tag @!

x Top level done item

x Top level done item with tag @!

Note with tag @!
    x done item for note
    not done item for a note @tag
```
After you hit 'enter', notes will come out like such:
```
+Project @tag
    task1 for project
    task2 for project
    task3 for project

Not a project, so it's a note
    subnote with priority tag @!

Note with tag @!
    not done item for a note @tag

2017-07-23 17:45:44.704704
x done item in project, +Project @tag
x another done item in project, +Project @tag
x done item for note, (Not a project,...)
x Top level done item
x Top level done item with tag @!
x done item for note, (Note with tag ...)
```


## Requirements
* convert tabs to 4 spaces using [Replace and Convert Tabs To Spaces Online.](http://tabstospaces.com/) - this will be fixed in the future. Currently, an error occurs if spacing isn't in multiples of 4.
* pyperclip module (will be most-likely be removed in the future.) [pyperclip 1.5.27 : Python Package Index](https://pypi.python.org/pypi/pyperclip)

## Features to add
This is a work in progress. Below are what I hope to implement:

* Filter your notes by project, note name, or tags.
* Allow for file-input and output (rather than copy-paste.)
* Allow for user to set their spacing preferences.