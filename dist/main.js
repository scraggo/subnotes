'use strict';

new Clipboard('#mainButton');
console.log('Awaiting input...');
var textArea = document.getElementById('mainTextArea');
var mainButton = document.getElementById('mainButton');
var demoButton = document.getElementById('demoButton');
// console.log(textArea);
// console.log(mainButton);
mainButton.addEventListener('click', asdf1);
demoButton.addEventListener('click', asdf3);

function asdf1() {
  /*
  Main function: gets text from textarea, sorts it, writes output to html
  */
  document.getElementById("notify").className = "notify-hide";
  var textContent = textArea.value;
  // console.log(textContent);
  if (!textContent) {
    return;
  }
  var sortedArray = block_encoder(textContent).sort(abcSort);
  var sortedText = sortedOutput(sortedArray);
  var newText = sortedText.join('\n\n');
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
  return arr.map(function (block) {
    return block.join('\n');
  });
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
  textArea.value = 'a\nasdf\n\ns\nasdf\n\nd\nasdf\n\n\nf\nasdf\nasdf\n\ng\nasdf\nasdf\nasdf\n\ne\n\nw\n\nz\n\nr\n  ';
}
// function asdf2() {
//   return new Promise(function(resolve, reject) {
//   )
// });
// p.then(() => {})}

//# sourceURL=userscript.js