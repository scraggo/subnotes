
// var clipboard = require('./clipboard');

/*
var makeBlocks = require('./makeBlocks');
var subnotesProto = require('./subnotes_proto');
console.log(subnotesProto);//debug
console.log(makeBlocks);//debug
*/

new Clipboard('#mainButton');
console.log('Awaiting input...')
const textArea = document.getElementById('mainTextArea');
const mainButton = document.getElementById('mainButton');
const demoButton = document.getElementById('demoButton');
const viewTagsInput = document.getElementById('viewTagsInput');
const viewTagsButton = document.getElementById('viewTags');
const viewAllTagsButton = document.getElementById('viewAllTags');
const modalBody = document.querySelector('.modal-body');
// console.log(textArea);
// console.log(mainButton);
mainButton.addEventListener('click', getSortWrite);
demoButton.addEventListener('click', assignTestString);
viewTagsButton.addEventListener('click', function() {
    viewTags();
    $('#myModal').modal();
  });

let state = ''; //state of app determined by user input

// let asdf = makeBlocks();
// console.log(asdf);
// let s = new Subnotes(getTestString());
// s.block_encoder();
// console.dir(s.encoded_list);

function getSortWrite() {
  /*
  Main function: gets text from textarea, sorts it, writes output to html
  */
  document.getElementById("notify").className = "notify-hide";
  let textContent = textArea.value;
  // console.log(textContent);
  if (!textContent) {return;}
  state = new Subnotes(textContent);
  state.block_encoder();
  let encList = state.encoded_list;
  state.sort_blocks(encList)
  // console.dir(s.encoded_list);//debug

  // non-class implementation
  // let sortedArray = makeBlocks(textContent).sort(abcSort);
  // let sortedText = sortedOutput(sortedArray);
  // let newText = sortedText.join('\n\n');
  // console.log(newText);
  textArea.value = state.return_all_sorted();
  // state = state.encoded_list;//update app state
  notifyCopyDelay(10);
}

function viewTags() {
  // console.log(viewTagsInput.value);
  let tagSearch;
  if (state.length < 1) {
    getSortWrite();
    return;
  } else {
    tagSearch = state.displayFilteredTags(viewTagsInput.value);
    console.log(tagSearch);
  }
  modalBody.innerHTML = tagSearch;
  console.log(state.encoded_list);
}

function abcSort(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}

function sortedOutput(arr) {
  return arr.map(block => block.join('\n'));
}

function notifyCopyDelay(time) {
  /*
  delays the addition of notify-show class by param:time
  */
  window.setTimeout(function () {
    document.getElementById("notify").className = "notify-show";
  }, time);
}

function assignTestString() {
  /*
  assigns a test tring to textarea
  */
  textArea.value = 
`z title should be low
subnote below z title

+Project1 @tag
    x done item in project
    task1 for project @!!!
    x another done item in project
    task2 for project
    task3 for project
    x 3rd done item in project

Not a project, so it's a note
    x done item for note
    subnote with priority tag @!

x Top level done item @innertag embedded tag

x Top level done item with subnote
subnote1 for done header
subnote2 for done header

x Top level done item with tag @!

note, no subnotes 1 lots of tags @! @tag @othertag @crazy

note, no subnotes 2

Note with tag @!
    x done item for note
    not done item for a note @tag
      `
}
// function asdf2() {
//   return new Promise(function(resolve, reject) {
//   )
// });
// p.then(() => {})}

//# sourceURL=userscript.js