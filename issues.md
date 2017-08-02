# subnotes-python
*Issues*

## Data
Data structure now looks like:
```
[
    {'project': '+projectB', 'done': ['    x note1B'], 'Subnote': ['    note2B']}, {'note': 'note all alone'}, 
    {'note': 'note with subnotes', 'Subnote': ['    note subnote1 @!', '    note subnote2']}, 
    {'project': '+projectA @!', 'Subnote': ['    note1A', '    note2A']}
]
```
instead of `'project'`, I'm thinking `'note'` would always be the header and 'project' could always be there as `True` or `False`. Maybe this could be part of a class?

## Globals and Functions
* How to properly deal with globals?
* put user-todos into a function.
* get rid of empty lines in function
* proper module, if name == main
* make the encoding style swappable with modules

## File IO
* Allow for file-input and output (rather than copy-paste.)
    * pyperclip module (will be most-likely be removed in the future.) [pyperclip 1.5.27 : Python Package Index](https://pypi.python.org/pypi/pyperclip)

## Filtering
* Instead of `print()`, it might be better to collect what needs to be printed, then use a generic print formatting function. You'll see that in the defined functions with 'print' in them.
* The `re` module will be necessary for doing more than filtering by priority (@!) tag. Not sure how to implement at the moment. Ideally, I'd be able to filter just project names as well.

## Spacing
* Allow for user to set their spacing preferences. Currently, an error occurs if spacing isn't in multiples of 4. This isn't very flexible (and probably unnecessary.)

## UI
* The command line user interface is admittedly a bit strange and unwieldy. Ideally, the screen would **fully** clear (not just print 100 new lines and reset to the top.)

## Code quality / Review
* The fixes above will help maintain the code, but there's much more I could fix. I'd very much appreciate suggestions from anyone who has experience with this type of programming.
