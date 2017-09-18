# subnotes

**Preview the web-version:** [https://scraggo.github.io/subnotes](https://scraggo.github.io/subnotes/)

Subnotes is a plaintext-based system for note taking and task-management. Taking inspiration from Taskpaper and the todo.txt system, you can keep your notes and subnotes in a simple format: a header line with lines (subnotes) right below. Subnotes can optionally be indented to add structure to your notes.

*Subnotes remain attached to the header line as long as there are no blank lines. If they're indented by tabs, they'll be converted to multiples of 4 spaces. Spacing that doesn't follow 4's are converted to 4 or 8 spaces.*

## Current Features
* **Organize your notes:** You can sort all items by header in alphabetical order.
* **Easily clear your done items:** All done items (prefixed by 'x ') will be placed at the bottom of a file with a time stamp.
* **See what's next:** You can choose to display only your priority tag (@!) notes.

## Usage

* Download subnotes.py

* Run `python subnotes.py` at the terminal.

The first command prompt asks for your choice of sorting your notes or seeing only your priority items. Then, you're asked to copy your notes to your clipboard (in a format similar to this:)
```
Header line 1
part of this block
also part of the block

+I use a prefix so I'll be put on top
    x done item in project
    task1 for project
    x another done item in project
    task2 for project
    we're indented for fun!

No need for a prefix @tag
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
+I use a prefix so I'll be put on top
    task1 for project
    task2 for project
    we're indented for fun!

Header line 1
part of this block
also part of the block

No need for a prefix @tag
    subnote with priority tag @!

Note with tag @!
    not done item for a note @tag

2017-08-03 18:50:24.021893
+I use a prefix so I'll be put on top
    x done item in project
    x another done item in project
No need for a prefix @tag
    x done item for note
Note with tag @!
    x done item for note
x Top level done item
x Top level done item with tag @!
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
* Python 3.x
* pyperclip module [pyperclip 1.5.27 : Python Package Index](https://pypi.python.org/pypi/pyperclip)

## Features to add
This is a work in progress and could use some help. I hope to eventually implement:

* [ ] Filter your notes by project, note name, or tags.
* [ ] Allow for file-input and output (rather than utilizing the clipboard with pyperclip.)

see [issues.md](https://github.com/scraggo/subnotes-python/blob/master/issues.md)
