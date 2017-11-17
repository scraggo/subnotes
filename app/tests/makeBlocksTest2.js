function groupBy(input, g) {
  /*
  Groups array items into arrays of arrays (blocks) according to g.
  all g items are removed.
  */

  if (!text) {return;}
  if (typeof text !== 'string') {return;}

  const textArray = input
    .split('\n')
    .map( x => {//.map to make white space blank string
      if (x.trim() === '') {
        return '';
      }
      return x;
    });
  const len = textArray.length;
  let resultArray = [];
  let i = 0;
  let start, end, group;
  // console.log(textArray, len);//debug
  while (i < len) {
    if (textArray[i + 1] && textArray[i] === g && textArray[i + 1] === g) {
      i++;
      continue;
    } else {
      start = i;
      end = textArray.indexOf(g, i);//or i + 1?
      end = end > -1 ? end : len;//if not found, end is len, or len - 1?
      group = textArray.slice(start, end);
      if (group.length > 0) {
        resultArray.push(group);
        i += group.length;
      } else {
        i++;
      }
    }
  }
  return resultArray;
}

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

// module.exports = makeBlocks;
/*
EXPECTED OUTPUT
[['1some start', '2random end'], ['3stuff start', '4with end'], ['5random start/end'], ['6lines start/end'], ['7in start', '8certain', '9places end']]
*/

const test_text = `1some start
2random end

3stuff start
4with end


5random start/end

6lines start/end

7in start
8certain
9places end
`

function test_block_encoder() {
  let f_text = test_text;
  console.log(block_encoder(f_text));
}

function testGroupBy() {
  let f_text = test_text;
  console.log(groupBy(f_text, ''));
}
function run_tests() {
    // test_block_encoder();
    testGroupBy();
}

run_tests();