# subnotes-python

Subnotes is a plaintext-based system for note taking and task-management. Going beyond the todo.txt system, you can keep indented lines (subnotes) with a header line (note) as such:

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

## Requirements
* convert tabs to 4 spaces using http://tabstospaces.com/ - this will be fixed in the future.
* pyperclip module (will be most-likely be removed in the future.)

## Features to add
Filter your notes by project, note name, or tags.
