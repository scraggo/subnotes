# subnotes-python

Subnotes is a plaintext-based system for note taking and task-management. Taking inspiration from Taskpaper and the todo.txt system, you can keep your notes and subnotes in a simple format: a header line (note) with indented lines (subnotes) right below.

*Subnotes remain attached to the header line if they're indented by multiples of 4 spaces or tabs\*. There's only one level of subnotes, but feel free to indent as much as you like.*

*\*Tabs are automatically converted to spaces.*

## Current Features
* **Organize your notes:** You can sort all items in alphabetical order with projects (prefixed by '+') on top and non-prefixed notes below. 
* **Easily clear your done items:** All done items (prefixed by 'x ') will be placed at the bottom of a file with a time stamp.
* **See what's next:** You can choose to display only your priority tag (@!) notes.

## Usage

The first command prompt asks for your choice of sorting your notes or seeing only your priority items. Then, you're asked to copy your notes to your clipboard (in this format:)
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
(Feel free to copy the above text to experiment with Subnotes.)

The sorted output:
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
At this point, you can copy your notes into your personal file system.

Afterwards, you can choose to display only your priority tag (@!) notes:
```
PRIORITY ITEMS - with @! tag
************************************
Not a project, so it's a note
    subnote with priority tag @!
    x done item for note

x Top level done item with tag @!

Note with tag @!
    not done item for a note @tag
    x done item for note
```

## Requirements
* You can convert tabs to 4 spaces using [Replace and Convert Tabs To Spaces Online.](http://tabstospaces.com/) - this will be fixed in the future. Currently, an error occurs if spacing isn't in multiples of 4.
* pyperclip module (will be most-likely be removed in the future.) [pyperclip 1.5.27 : Python Package Index](https://pypi.python.org/pypi/pyperclip)

## Features to add
This is a work in progress and could use some help. I hope to eventually implement:

* Filter your notes by project, note name, or tags.
* Allow for file-input and output (rather than copy-paste.)
* Allow for user to set their spacing preferences.

see [issues.md](https://github.com/scraggo/subnotes-python/blob/master/issues.md)