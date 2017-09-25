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