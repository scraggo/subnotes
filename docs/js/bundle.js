(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// var clipboard = require('./clipboard');
var makeBlocks = require('./makeBlocks');
var subnotesProto = require('./subnotes_proto');
console.log(subnotesProto);//debug
console.log(makeBlocks);//debug

new Clipboard('#mainButton');
console.log('Awaiting input...')
const textArea = document.getElementById('mainTextArea');
const mainButton = document.getElementById('mainButton');
const demoButton = document.getElementById('demoButton');
// console.log(textArea);
// console.log(mainButton);
mainButton.addEventListener('click', asdf1);
demoButton.addEventListener('click', asdf3);


// let asdf = makeBlocks();
// console.log(asdf);
// let s = new Subnotes(getTestString());
// s.block_encoder();
// console.dir(s.encoded_list);

function asdf1() {
  /*
  Main function: gets text from textarea, sorts it, writes output to html
  */
  document.getElementById("notify").className = "notify-hide";
  let textContent = textArea.value;
  // console.log(textContent);
  if (!textContent) {return;}
  let s = new Subnotes(textContent);
  // let s = new subnotesProto.Subnotes(textContent);
  s.block_encoder();
  console.dir(s.encoded_list);
  return;
  // let sortedArray = makeBlocks(textContent).sort(abcSort);
  // let sortedText = sortedOutput(sortedArray);
  // let newText = sortedText.join('\n\n');
  // console.log(newText);
  textArea.value = newText;
  asdf4(10);
}

function abcSort(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}

function sortedOutput(arr) {
  return arr.map(block => block.join('\n'));
}

function asdf4(time) {
  /*
  delays the addition of notify-show class by param:time
  */
  window.setTimeout(function () {
    document.getElementById("notify").className = "notify-show";
  }, time);
}

function asdf3() {
  /*
  assigns a test tring to textarea
  */
  textArea.value = `a
asdf

s
asdf

d
asdf


f
asdf
asdf

g
asdf
asdf
asdf

e

w

z

r
  `
}
// function asdf2() {
//   return new Promise(function(resolve, reject) {
//   )
// });
// p.then(() => {})}

//# sourceURL=userscript.js
},{"./makeBlocks":2,"./subnotes_proto":3}],2:[function(require,module,exports){
/*
Converts multi-line text into a list of lists (blocks).
all blank lines are removed.
*/

function makeBlocks(text) {
  /*
  Args
      text string, multiple lines
  Returns
      list of lists (see module docstring)
  */
  if (!text) {return;}
  if (typeof text !== 'string') {return;}
  const text_array = text.split('\n');
  const block_array = [];
  var line;
  var block_index;

  for (let i = 0; i < text_array.length; i++) {
    line = text_array[i]
    //initializing the block delineator for empty list
    if (block_array.length <= 0) {
      block_index = 0;
    }

    //if line is blank, it's a block delineator
    if (line.trim().length <= 0) {
      //this check is performed every time there's a blank line
      //possible index error squashed by the change detector (later)
      if (block_array.length > 0) {
        block_index += 1;
      }
    } else {
      //else, line has content and it's part of a 'block'
      if (block_array.length <= 0) {
        //append the very first 'block', a list with first line
        block_array.push([line]);
      } else {
        //start/append new 'block' value OR add to last block
        if (block_index > block_array.length - 1) {
          // detect change and start a new block
          block_array.push([line]);
          // reset block_index
          block_index = block_array.length - 1;
          //continue
        } else {
          //else, add to last block
          block_array[block_index].push(line);
        }
      }
    }
  }
  return block_array;
}

module.exports = makeBlocks;
},{}],3:[function(require,module,exports){
/*Created on 7/25/17

@author: scraggo (github.com/scraggo)

Title: Subnotes - a plain text notes and tasks system
    see example below for the expected in format
    - spaces between each link determine 'blocks'
    - headers are the first line of a block or a single line.
*/

class Subnotes {
  /*
  Subnotes takes your notes and subnotes in a simple format:
  a header line with lines (subnotes) right below and at least one line break in between
    
  - organizes the headers alphabetically.
  - puts all the 'done' items at the bottom with a time stamp.
  - tag filter allows user to display their choice of tags within their text.
  */

  constructor(input_text) {
    this.input_text = input_text
    this.block_list = makeBlocks(this.input_text);
    this.encoded_list = [];
    // this._spacing = spacing
    // this.set_spacing(this._spacing)
    // this.block_encoder()
    //CLASS VARIABLES
    this.TAG_REGEX = /\B@\S+/;
    this.LOWEST_CHAR = '~'.repeat(10);
    // LOWEST_CHAR = chr(1114111) * 2
  }

  
  /*
      set_spacing(this, new_spacing=4):
          const valid_spacing = [2,4,5];
          str_valid = ', '.join(str(x) for x in valid_spacing)
          if new_spacing in valid_spacing:
              this._spacing = new_spacing
          else:
              // raise ValueError('Spacing must be {} spaces.'.format(''.join(str_valid)))
              print('ERROR: Spacing must be {} spaces.\nQuitting.'.format(''.join(str_valid)))
              sys.exit()
          return this._spacing
  */
  block_encoder() {
    /*
    Main function that appends dict objects to this.encoded_list as such:
    [
    {'project': '+projectB', 'done': ['    x note1B'], 'Subnote': ['    note2B']}, {'note': 'note all alone'},
    {'note': 'note with subnotes', 'Subnote': ['    note subnote1 @!', '    note subnote2']},
    {'project': '+projectA @!', 'Subnote': ['    note1A', '    note2A']}
    ]

    Properties used:
        block_list, encoded_list, spacing
    Returns:
        Sorted encodedf_list by 'header' (using sorted_blocks)
    */

    for (let i = 0; i < this.block_list.length; i++) {
      // arr[i] = 'hi';
      let block = this.block_list[i];
      // set default dictionary
      // headers are encoded as LOWEST_CHAR if first and only line is preceded by 'x'
      this.encoded_list.push({
        header: this.LOWEST_CHAR,
        data: [],
        tags: [],
        done: []
      })

      for (let j = 0; j < block.length; j++) {
        // arr[i] = 'hi';
        let line = block[j];
        // line = this.fix_spacing(line)
        // done items start with x
        if (line.trim().startsWith('x ')) {
          this.encoded_list[i].done.push(line)
        } else {

          if (line === block[0]) {
            // line is the 'header'
            this.encoded_list[i].header = line.trim()
          } else {
            // line is 'data'
            this.encoded_list[i].data.push(line)
          }
        }
        this.assignTagList(line, i);
      }
      this.assignCompletedProject(i);
    }
    // console.log(this.encoded_list);
    // this.encoded_list = this.sort_blocks(this.encoded_list)
  }
  
  assignTagList(line, i) {
    let tagList = line.match(this.TAG_REGEX);
    // console.log(tagList);
    if (tagList) {
      tagList.forEach((tag) =>
        this.encoded_list[i].tags.push(tag)
      )
    }
  }

  assignCompletedProject(i) {
    if (this.encoded_list[i].header === this.LOWEST_CHAR && this.encoded_list[i].data.length > 0) {
      this.encoded_list[i].header = '{Completed Project}'
    }
  }
    // @staticmethod
  sort_blocks(f_list) {
    /*
    Sorts f_list by key ['header']
    */
    function byHeader(a,b) {
      a = a['header'].toLowerCase();
      b = b['header'].toLowerCase();
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    return f_list.sort(byHeader);
  }

  return_all_sorted() {
      /*returns all items sorted as a string for printing or clipboard.*/

    let allSorted = [];
    let doneList = [];
    let header_exists, item, data_item, data, i, j;
    let nowDate = new Date();
    nowDate = nowDate.toString();

    for (i = 0; i < this.encoded_list.length; i++) {
      item = this.encoded_list[i];
      header_exists = true;

      if (item['header'] !== '' && item['header'] !== this.LOWEST_CHAR) {
        allSorted.push('\n' + item['header'].trimRight());
      } else {
        header_exists = false;
      }

      if (item['data'].length > 0) {//
        if (header_exists === false) {//
          allSorted.push('');
        }
        for (j = 0; j < item['data'].length; j++) {
          data_item = item['data'][j];
          allSorted.push(data_item.trimRight());
        }
      }

      if ((item['done'].length) > 0) {
        //append to separate list
        doneList.push(item);
      }
    }
      //put done items at end of list with timestamp

      //prints the current date and time
      allSorted.push('\n' + nowDate);

    // append done items to list
    for (i = 0; i < doneList.length; i++) {
      data = doneList[i];
      // if type(data['done']) == list
      if (
        data['header'] === this.LOWEST_CHAR ||
        data['header'] === '{Completed Project}' ||
        data['header'].length < 1
      ) {
        // print('header empty')//debug
        for (j = 0; j < data['done']; j++) {
          doneItem = data['done'][j];
          allSorted.push(doneItem.trim());
        }
      } else {
        allSorted.push(data['header'])
        for (j = 0; j < data['done']; j++) {
          doneItem = data['done'][j];
          // print('header not empty')//debug
          allSorted.push(' ' * this._spacing + doneItem.trim());
        }
      }
    }
    // console.log(allSorted);//debug
    return allSorted.join('\n');
  }
}

module.exports = new Subnotes;

// todo
// return_all_sorted(this)
// this method does a lot. create done array, etc.

// skipping
// fix_spacing
//   make_blocks(f_list) (another file)
//   return_all_tags(this)


//   fix_spacing(this, f_text)
//     /*
//         1. Replaces tabs with class-defined spacing
//         2. Counts the leading spaces for an input string.
//         3. If spacing is inconsistent with spacing, two levels of indent are imposed.

//         Args:
//             f_text: a string of text
//         Returns:
//             a string with above operations
//         Raises:
//             sys.exit() if spacing is inconsistent
//         */

//     // if spaces % SPACING != 0:
//     //     print('WARNING - INCONSISTENT SPACING!\n>>>' + f_text)
//     //     print("has {} spaces. Convert to multiples of {} spaces.".format(spaces, SPACING))
//     //     sys.exit()

//     // convert tabs to spaces
//     line = f_text.replace('\t', ' ' * this._spacing)
//   // get number of leading spaces
//   spaces = len(f_text) - len(f_text.lstrip())
//   if spaces % 4 != 0
//     if spaces < 4
//     line = ' ' * 4 + line.trim()
//   else 
//     line = ' ' * 8 + line.trim()

//   return line

//   // @staticmethod
//   make_blocks(f_list)
//     /*
//     Args:
//         f_list: this is the user's text, list format, split by new line
//     Returns:
//         A list of lists where each list is determined by empty lines
//     */

//     return [list(g[1]) for g in itertools.groupby(f_list, key = lambda x: x.trim() != '') if g[0]]

//   return_all_tags(this)
//     /*
//     returns all the tags as a list, sorted in abc order with no duplicates
//     */

//     unsortedtags = []
//   for item in this.encoded_list
//     tagslist = item['tags']
//   if tagslist != []
//     for tag in tagslist
//     if tag not in unsortedtags
//     unsortedtags.push(tag)

//   return sorted(unsortedtags)

//   return_all_sorted(this)
//     /*returns all items sorted as a string for printing or clipboard.*/

//     allSorted = []
//   doneList = []

//   for item in this.encoded_list
//     header_exists = True

//   if item['header'] not in ['', this.LOWEST_CHAR]
//     allSorted.push('\n' + item['header'].rstrip())
//   else 
//     header_exists = False

//   if len(item['data']) > 0
//     if not header_exists
//     allSorted.push('')
//   for data_item in item['data']
//     allSorted.push(data_item.rstrip())

//   if len(item['done']) > 0
//     //append to separate list
//     doneList.push(item)

//   //put done items at end of list with timestamp

//   //prints the current date and time
//   allSorted.push('\n' + str(datetime.now()))

//   // append done items to list
//   for data in doneList
//     // if type(data['done']) == list
//     if data['header'] == this.LOWEST_CHAR or\
//   data['header'] == '{Completed Project}'
//   or\
//   len(data['header']) < 1
//     // print('header empty')//debug
//     for doneItem in data['done']
//     allSorted.push(doneItem.trim())
//   else 
//     allSorted.push(data['header'])
//   for doneItem in data['done']
//     // print('header not empty')//debug
//     allSorted.push(' ' * this._spacing + doneItem.trim())

//   return '\n'.join(allSorted)


//   tag_filter(this)
//     /*
//         Prints projects that contain f_tag input by user.
//         Done items with tags are not included.

//         Args:
//             encodedf_list: the encoded list
//         Returns:
//             None (only prints)
//         */

//     all_tags = this.return_all_tags()
//   if len(all_tags) < 1
//     print('No tags found.\n')
//   else 
//     print('Your Tags: ', end = '')
//   print(', '.join(all_tags))
//   print()
//   //get user input
//   f_tag = input('Tag to search (include @): ')
//   //filter by f_tag
//   filtered_tags = []
//   for encoded_item in this.encoded_list
//     for k, v in encoded_item.items()
//     if k == 'tags'
//     for str_tag in v
//     if str_tag.find(f_tag) > -1
//     filtered_tags.push(encoded_item['header'])
//   break

//   if len(filtered_tags) > 0
//     print()
//   print('*' * (20 + len(f_tag)))
//   print('Projects with tag: {}'.format(f_tag))
//   print('*' * (20 + len(f_tag)))
//   for header_tag in filtered_tags
//     print(header_tag)
//   print()
//   else 
//     print('No notes with {} tag found.\n'.format(f_tag))


// }

// // === end Subnotes class===
// // === start global functions ===

// function menu()
// /*
// Prints a menu, gets user choice input, returns input (string).
// */

// print('Choose from the following options:')
// print(''
//     '    1. Order your notes alphabetically.
//     2. Display priority tag(@!) notes.q.Quit ''
//     ')
//     f_choice = input('> ') return f_choice


//     function main()
//     os.system('cls'
//       if os.name == 'nt'
//       else 'clear')

//     while True
//     print('Welcome to Subnotes! ', end = '') choice = menu() if choice not in ['1', '2', '']
//     print('Thanks and goodbye!') break

//     print('Copy your notes to clipboard, enter when done:') user_pause = input('> ')
//     // todoTxt = pyperclip.paste()
//     // todoArray = todoTxt.split('\n')
//     // encodedTodos = []
//     // encodedTodos = blockEncoder(todoArray, encodedTodos)

//     my_todos = Subnotes(pyperclip.paste())

//     if choice in ['1', ''] //default if user presses enter
//     my_sorted = ''.join(my_todos.return_all_sorted())
//     // pprint(my_sorted)//debug
//     pyperclip.copy(my_sorted) print('\nYour sorted notes were copied to your clipboard.\n')

//     elif choice == '2'
//     my_todos.tag_filter()



//     main()
},{}]},{},[1]);
