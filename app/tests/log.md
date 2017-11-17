  <style>
  </style>

## 11-17-17

SO CONFUSED - why aren't the lines spaced correctly? after sorting, it's even weirder.
```
Items Tagged @tag

+Project1 @tag
    task1 for project @!!!
    task2 for project
    task3 for project
Note with tag @!
    not done item for a note @tag
note, no subnotes 1 lots of tags @! @tag @othertag @crazy


Done Items Tagged @tag

---
Items Tagged @!

Not a project, so it's a note
    subnote with priority tag @!
Note with tag @!
    not done item for a note @tag
note, no subnotes 1 lots of tags @! @tag @othertag @crazy


Done Items Tagged @!

x Top level done item with tag @!
```



```js

formatting:

// new version
let doneString = '';
let doneHeader = '<h4>Done Items Tagged ' + f_tag + ':</h4>';
if (doneArray.length > 0) {
  // doneString = doneHeader + '\n' + doneArray.join('\n');
  doneString = doneHeader + '<ul><li>' + doneArray.join('</li><li>') + '</li></ul>';
}
let taggedHeader = '<h4>Items Tagged ' + f_tag + ':</h4>';
let tagString = '<ul><li>' + tagArray2.join('</li><li>') + '</li></ul>';
// let htmlObject = {doneHeader: doneHeader, taggedHeader: taggedHeader, tagString: tagString};
// return htmlObject;
return taggedHeader + tagString + doneString;

////////// old version
let doneString = '';
let doneHeader = '<h2>Done Items with Tag:</h2>';
if (doneArray.length > 0) {
doneString = doneHeader + '\n' + doneArray.join('\n');
}
let taggedHeader = '<h2>Tagged Items:</h2>';
return taggedHeader + '\n' + tagArray2.join('\n') + '\n' + doneString;

doneArray 
[{"doneHeader":"Not a project, so it's a note","doneItem":["    x done item for note @tag"]},
{"doneItem":["x Top level done item with tag @! @tag"]}]

tagArray:  
[{"headerTags":true,"dataTags":false,"doneTags":false},
{"headerTags":false,"dataTags":false,"doneTags":["    x done item for note @tag"]},
{"headerTags":false,"dataTags":false,"doneTags":["x Top level done item with tag @! @tag"]},
{"headerTags":true,"dataTags":false,"doneTags":false},
{"headerTags":false,"dataTags":["    not done item for a note @tag"],"doneTags":false}]
```

## 11-15-17

UI todo:
- autofocus in text box?
- change order of buttons? (Sort first)
- couldn't get 'Copied!' to rotate...

todo:
- filter SHOULD display a full project with data on filter. Bah!
- allow more flexible formatting of filtered tag output - set in 'view' rather than 'model'
- filter logic: if both header and data are empty, then push the tag to the done list. else, look for the tag in the header and data. If it's not found, then...crap. Maybe re-encode even before searching. {header: line or '', data: need to search, done: need to search}. I am officially completely baffled. Why is it outputting 4 elements, it should be 3...

[X] update UI to include filtering (make sure 'enter' works)
```js
// enter key up
document.getElementById("id_of_textbox")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("id_of_button").click();
    }
});
```

[X] place test functions into main class
[X] rename subnotes_proto.js to 'subnotes' maybe
[X] investigate how to properly put `state.displayFilteredTags(viewTagsInput.value);` into modal. 
  - Issue: disabled modal 'data-toggle' stuff.
  - Also, can I write textContent to a `<div>` directly? YES: 

```js
let divc = document.querySelector('div.container');
divc.innerHTML = '<whatever>'

// bootstrap / jquery
$('#myModal').modal();// opens modal (bootstrap defined function using jQuery)
```

## 11/13/17

filterTags - filteredList correctly contains 5 items with '@tag'
- FIXED! Array.concat returns a **new** array
- `doneArray = doneArray.concat(doneFiltered);`

- changed bad logic in this block:
```js
if (item.headerTags !== false && item.dataTags !== false) {
    ...
```

## 11/12/2017

left off on displayTagFilters. Decided not to re-encode the whole thing, but use searches. 

FIXED - SEE ABOVE: It's a mess, and it's not adding done items to the done array.
- `x done item for note @tag` should be in 'Done Items'

left off on filterTagsTest.js 
- I want to redo how tags are initially encoded. Maybe as an object,
- {header: [tags], data: [tags], done: [tags]}
- but I'm not sure yet.

console.log(tag_filter(encList, '!'));
- -> correctly filters projects, but includes done tags as well. How to display?

return all tags:
- FIXED! ["@!", "@!!!", "@crazy", "@innertag", "@othertag", "@tag"]
- [X] ["@!","@!!!","@innertag","@tag"] -> incorrect output.

## 11/11/2017
[X] left off here: need to change "data" to something else (dammit)
```js
  // append done items to list
  for (data in doneList) {
```
run: node /Users/davecohen/Documents/DEC/Programming/-Github/subnotes/app/tests/returnAllSortedTest.js

To print object to console for view / copying for tests:
- Use JSON.parse(JSON.stringify(obj)) or JSON.stringify(obj) or JSON.stringify(obj, null, 4)
- [X] move all tests to a folder (to easily delete from /docs)

## 11/4/2017
[X] see returnAllSortedTest.js - big long mess. compare to original python (spacing is messed up)

currently importing testString, makeBlocks, subnotes_proto.

logging makeBlocks() to console -> undefined (makes sense?)

logging encoded_list of test string -> array size 9 (as expected)
```js
[{"header":"z title should be low","data":["subnote below z title"],"tags":[],"done":[]},{"header":"+Project1 @tag","data":["    task1 for project @!!!","    task2 for project","    task3 for project"],"tags":["@tag","@!!!"],"done":["    x done item in project","    x another done item in project","    x 3rd done item in project"]},{"header":"Not a project, so it's a note","data":["    subnote with priority tag @!"],"tags":["@!"],"done":["    x done item for note"]},{"header":"~~~~~~~~~~","data":[],"tags":["@innertag"],"done":["x Top level done item @innertag embedded tag"]},{"header":"{Completed Project}","data":["subnote1 for done header","subnote2 for done header"],"tags":[],"done":["x Top level done item with subnote"]},{"header":"~~~~~~~~~~","data":[],"tags":["@!"],"done":["x Top level done item with tag @!"]},{"header":"note, no subnotes 1 lots of tags @! @tag @othertag @crazy","data":[],"tags":["@!"],"done":[]},{"header":"note, no subnotes 2","data":[],"tags":[],"done":[]},{"header":"Note with tag @!","data":["    not done item for a note @tag"],"tags":["@!","@tag"],"done":["    x done item for note"]}]
```
logging sort_blocks of encList:
```js
[{"header":"+Project1 @tag","data":["    task1 for project @!!!","    task2 for project","    task3 for project"],"tags":["@tag","@!!!"],"done":["    x done item in project","    x another done item in project","    x 3rd done item in project"]},{"header":"Not a project, so it's a note","data":["    subnote with priority tag @!"],"tags":["@!"],"done":["    x done item for note"]},{"header":"Note with tag @!","data":["    not done item for a note @tag"],"tags":["@!","@tag"],"done":["    x done item for note"]},{"header":"note, no subnotes 1 lots of tags @! @tag @othertag @crazy","data":[],"tags":["@!"],"done":[]},{"header":"note, no subnotes 2","data":[],"tags":[],"done":[]},{"header":"z title should be low","data":["subnote below z title"],"tags":[],"done":[]},{"header":"{Completed Project}","data":["subnote1 for done header","subnote2 for done header"],"tags":[],"done":["x Top level done item with subnote"]},{"header":"~~~~~~~~~~","data":[],"tags":["@innertag"],"done":["x Top level done item @innertag embedded tag"]},{"header":"~~~~~~~~~~","data":[],"tags":["@!"],"done":["x Top level done item with tag @!"]}]
```

logging returnAllSortedTest
- (as you can see, without being in the 'class', output is strange, but is taken care of in class.)
```
+Project1 @tag
task1 for project @!!!
task2 for project
task3 for project

Not a project, so it's a note
subnote with priority tag @!

Note with tag @!
not done item for a note @tag

note, no subnotes 1 lots of tags @! @tag @othertag @crazy

note, no subnotes 2

z title should be low
subnote below z title

{Completed Project}
subnote1 for done header
subnote2 for done header

~~~~~~~~~~

~~~~~~~~~~

Sat Nov 11 2017 20:38:35 GMT-0600 (CST)
+Project1 @tag
NaNx done item in project
NaNx another done item in project
NaNx 3rd done item in project
Not a project, so it's a note
NaNx done item for note
Note with tag @!
NaNx done item for note
~~~~~~~~~~
NaNx Top level done item @innertag embedded tag
~~~~~~~~~~
NaNx Top level done item with tag @!
```