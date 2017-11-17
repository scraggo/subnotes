
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
mainButton.addEventListener('click', getSortWrite);
demoButton.addEventListener('click', assignTestString);
viewTagsButton.addEventListener('click', viewTags);
viewAllTagsButton.addEventListener('click', viewAllTags);
viewTagsInput.addEventListener("keyup", function(event) {
  keyboardButtonTrigger(13, viewTagsButton, event);
});

function keyboardButtonTrigger(keyCode, button, event) {
  event.preventDefault();
  if (event.keyCode === keyCode) {
    button.click();
  }
}

let state = ''; //state of app determined by user input

function setState() {
  document.getElementById("notify").className = "notify-hide";
  let textContent = textArea.value;
  // console.log(textContent);
  if (!textContent) {return false;}
  state = new Subnotes(textContent);
  state.block_encoder();
  let encList = state.encoded_list;
  state.sort_blocks(encList);
  return true;
  // console.dir(s.encoded_list);//debug
}

function getSortWrite() {
  /*
  Main function: gets text from textarea, sorts it, writes output to html
  */
  if (!setState()) return;
  textArea.value = state.return_all_sorted();
  // state = state.encoded_list;//update app state
  notifyCopyDelay(10);
}

function viewTags() {
  writeTagsToModal();
  $('#myModal').modal();
}

function writeTagsToModal() {
  // console.log(viewTagsInput.value);
  if (!setState()) return;
  let tagSearch = viewTagsInput.value;
  if (!tagSearch.includes('@')) {
    tagSearch = '@' + tagSearch.trim();
  }
  let result = state.displayFilteredTags(tagSearch);
  console.log(result[0], result[1]);
  modalBody.innerHTML = '<h4>Items Tagged ' + tagSearch + '</h4>' + 
    '<pre>' + 
    result[0].join('') + '\n' + '</pre>' + 
    '<h4>Done Items Tagged ' + tagSearch + '</h4>' + 
    '<pre>' + 
    result[1].join('') + 
    '</pre>';
  // console.log(state.encoded_list);
}

function viewAllTags() {
  writeAllTagsToModal();
  $('#myModal').modal();
}

function writeAllTagsToModal() {
  // console.log(viewTagsInput.value);
  if (!setState()) return;
  let tags = state.return_all_tags().join('</li><li>');
  // console.log(tags);
  modalBody.innerHTML = '<h4>All Tags:</h4>' + '<ul><li>' + tags + '</li></ul>';
  // console.log(state.encoded_list);
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
