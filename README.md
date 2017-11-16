# Subnotes

[Subnotes web-app - https://scraggo.github.io/subnotes](https://scraggo.github.io/subnotes/)

Subnotes is a plaintext-based system for note taking and task-management. Taking inspiration from Taskpaper and the todo.txt system, you can keep your notes and subnotes in a simple format: a header line with lines (subnotes) right below. If you capture your notes and ideas in one document, this system allows you to easily organize all these separate lines.

## Current Features
* **Organize your notes:** You can sort all items by header in alphabetical order.

* **Collect your done items:** All done items (prefixed by 'x ') will be placed at the bottom of a file with a time stamp.
* **See what's next:** You can choose to display only notes with a tag of your choice. Example: your priority tag (@!) notes.

## Usage

In the text box, write notes in a format similar to:
```
Header line 1
part of this block
    this indented line is also part of the block
also part of the block (doesn't have to be indented)

+I use a prefix so I'll be put on top (and I'm a new header)
    x done item in project
    task1 for project
    x another done item in project
    task2 for project
    we're indented for fun!

This header has a tag and should be at end of line -> @tag
    x done item for note
    subnote with priority tag @!

x Top level done item

x Top level done item with tag @!

Note with priority tag @!
    x done item for note
    not done item for a note @tag
```

\* Click 'Demo Text' to experiment!

The sorted output:
```
+I use a prefix so I'll be put on top (and I'm a new header)
    task1 for project
    task2 for project
    we're indented for fun!

Header line 1
part of this block
    this indented line is also part of the block
also part of the block (doesn't have to be indented)

Note with priority tag @!
    not done item for a note @tag

This header has a tag and should be at end of line -> @tag
    subnote with priority tag @!

Wed Nov 15 2017 18:24:17 GMT-0600 (CST)
+I use a prefix so I'll be put on top (and I'm a new header)
    x done item in project
    x another done item in project
Note with priority tag @!
    x done item for note
This header has a tag and should be at end of line -> @tag
    x done item for note
x Top level done item
x Top level done item with tag @!
```
Your notes are automatically copied to your clipboard. So, at this point, you can simply paste your notes into your personal file system.

### Tag Filtering
You can search for notes with a certain tag and display them. Example: your priority tag (@!) notes:
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

## Features to add
This is a work in progress and could use some help. I hope to eventually implement:

* [ ] Saving notes to local storage
* [ ] Display full project note on filter
* [ ] More advanced filtering
* [ ] Updated UI with 2-way binding

see [issues.md](https://github.com/scraggo/subnotes-python/blob/master/issues.md)

What else?

The prototype for this app was written in Python (you can find the code in this repo.)
