# subnotes-python
*Issues*

## Globals and Functions
- [ ] How to properly deal with globals?
- [ ] put user-todos into a function.
- [X] get rid of empty lines in function
- [X] proper module, if name == main
- [ ] make the encoding style swappable with modules
- [ ] filter by tag without pasting in todos again...

## File IO
- [ ] Allow for file-input and output (rather than copy-paste.)
    * pyperclip module (will be most-likely be removed in the future.) [pyperclip 1.5.27 : Python Package Index](https://pypi.python.org/pypi/pyperclip)

## Filtering
- [X] Instead of `print()`, it might be better to collect what needs to be printed, then use a generic print formatting function. You'll see that in the defined functions with 'print' in them.
- [X] Add filter for tags. Use `re` module. 
- [ ] Display lines with tags
- [X] Add filter for just project names (headers)
- [X] if multiple 'x' (done items) it looks kind of ugly.

## Spacing
- [ ] Allow for user to set their spacing preferences. 
- [X] Currently, an error occurs if spacing isn't in multiples of 4. This isn't very flexible (and probably unnecessary.)

## UI
- [ ] The command line user interface is admittedly a bit strange and unwieldy. Ideally, the screen would **fully** clear (not just print 100 new lines and reset to the top.)

## Code quality / Review
* The fixes above will help maintain the code, but there's much more I could fix. I'd very much appreciate suggestions from anyone who has experience with this type of programming.

## Data
Data structure now looks like:
```
[{'data': ['    task1 for project\n',
           '    task2 for project\n',
           '    task3 for project\n'],
  'done': ['    x done item in project\n',
           '    x another done item in project\n',
           '    x 3rd done item in project\n'],
  'header': '+Project1 @tag'},
 {'data': ['    subnote with priority tag @!\n'],
  'done': ['    x done item for note\n'],
  'header': "Not a project, so it's a note"},
 {'data': ['    not done item for a note @tag'],
  'done': ['    x done item for note\n'],
  'header': 'Note with tag @!'},
 {'data': [], 'done': [], 'header': 'note, no subnotes 1'},
 {'data': [], 'done': [], 'header': 'note, no subnotes 2'},
 {'data': [], 'done': ['x Top level done item\n'], 'header': 'zzzzzZZZZZ'},
 {'data': ['subnote for done header\n'],
  'done': ['x Top level done item with subnote\n'],
  'header': 'zzzzzZZZZZ'},
 {'data': [],
  'done': ['x Top level done item with tag @!\n'],
  'header': 'zzzzzZZZZZ'}]
```
CHANGED:
{'header': 'zzzzzZZZZZ', 'data': [], 'done': []}
Maybe this could be part of a class?