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