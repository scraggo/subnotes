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
    this.block_list = this.groupBy(this.input_text, '');
    this.encoded_list = [];
    this._spacing = 4;//for now
    // this._spacing = spacing
    // this.set_spacing(this._spacing)
    this.spacer = ' '.repeat(this._spacing);
    this.allTags = new Set([]);
    // this.block_encoder()
    //CLASS VARIABLES
    this.TAG_REGEX = /\B@\S+/g;
    this.LOWEST_CHAR = '~'.repeat(10);
    // LOWEST_CHAR = chr(1114111) * 2
  }

  set_spacing(new_spacing=4) {
    // sets this._spacing and returns the number
    new_spacing = Number(new_spacing);//ensure number
    const valid_spacing = [2,4,5];
    let valid_index = valid_spacing.indexOf(new_spacing);
    if (valid_index > -1) {
      this._spacing = new_spacing;
      return this._spacing;
    } else {
      // set default to 4
      this._spacing = 4;
      return this._spacing;
    }
  }

  groupBy(input, g) {
    /*
    Groups array items into arrays of arrays (blocks) according to g.
    all g items are removed.
    */
  
    if (input.length < 1) {return [];}
    // if (typeof input !== 'string') {return;}
  
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
    // console.log(resultArray);//debug
    return resultArray;
  }

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
    let j, tag;
    if (tagList) {
      for (j = 0; j < tagList.length; j++) {
        tag = tagList[j];
        this.encoded_list[i].tags.push(tag);
        this.allTags.add(tag);
      }
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
    let header_exists, item, data_item, data, doneItem, i, j;
    let nowDate = new Date();
    nowDate = nowDate.toString() + '\n';

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
        for (j = 0; j < data['done'].length; j++) {
          doneItem = data['done'][j];
          allSorted.push(doneItem.trim());
        }
      } else {
        allSorted.push(data['header']);
        for (j = 0; j < data['done'].length; j++) {
          doneItem = data['done'][j];
          // print('header not empty')//debug
          allSorted.push(this.spacer + doneItem.trim());
        }
      }
    }
    // console.log(allSorted);//debug
    return allSorted.join('\n');
  }

  return_all_tags() {
    /*
    returns all the tags as an array, sorted in abc order with no duplicates
    */

    return Array.from(this.allTags).sort();
  }

  prependTagSymbol(f_tag) {
    f_tag = f_tag.trim();
    //ADD @ IF @ ISN'T FIRST
    if (!f_tag.startsWith('@')) {
      f_tag = '@' + f_tag;
    }
    return f_tag;
  }

  displayFilteredTags(f_tag) {
    /*
    Returns nothingFoundMessage or array of 2 arrays.
    */
    f_tag = this.prependTagSymbol(f_tag);
    let filteredList = this.encoded_list.filter( item => item.tags.indexOf(f_tag) > -1 );
    // console.log(filteredList);//debug
    let nothingFoundMessage = '<h4>No Tagged Items Found.</h4>';
    if (filteredList.length < 1) {
      return nothingFoundMessage;
    }
    let tagArray = [];
    let doneArray = [];
    let i, item, doneFiltered, headerSearch, dataFiltered;
    for (i = 0; i < filteredList.length; i++) {
      item = filteredList[i];
      headerSearch = item.header.includes(f_tag);//bool
      dataFiltered = item.data.filter( x => x.includes(f_tag));//array
      dataFiltered = dataFiltered.length > 0 ? true : false;//bool
      doneFiltered = item.done.filter( x => x.includes(f_tag));//array
      // console.log(headerSearch, dataFiltered, doneFiltered);//debug
      if (doneFiltered.length < 1) {
        doneFiltered = false;
      }
      // console.log('item', item);//debug
      tagArray.push({headerTags: headerSearch, dataTags: dataFiltered, doneTags: doneFiltered });
      if (headerSearch === false && dataFiltered === false) {
        if (item.header === this.LOWEST_CHAR) {
          doneArray.push({doneItem: doneFiltered})
        } else {
          doneArray.push({doneHeader: item.header, doneItem: doneFiltered})
        }
      }
    }
    // console.log('tagArray: ', tagArray);//debug
    // console.log('doneArray', doneArray);//debug
    if (doneArray.length < 1 && tagArray.length < 1) {
      return nothingFoundMessage;
    }
    // ITEMS THAT CONTAIN HEADERS AND OR DATA
    let output1 = [];
    let output2 = [];//for done items
    for (i = 0; i < filteredList.length; i++) {
      // in the case that there are ONLY done tags, skip it
      if (!tagArray[i].headerTags && !tagArray[i].dataTags) {
        // console.log('no header or data', tagArray[i]);//debug
        continue;
      }
      // now print header AND data
      output1.push(filteredList[i].header + '\n' + filteredList[i].data.join('\n') + '\n');
    }
    // DONE ITEMS:
    // output.push('\n## Done Items with Tag:\n\n');
    for (i = 0; i < doneArray.length; i++) {
      if (doneArray[i].doneHeader) {
        output2.push(doneArray[i].doneHeader + '\n' + doneArray[i].doneItem.join('\n') + '\n\n');
      } else {
        output2.push(doneArray[i].doneItem.join('\n') + '\n');
      }
    }
    // console.log(output1.join(''));//debug
    // console.log(output2.join(''));//debug

    return [output1, output2];
  }
}

// module.exports = new Subnotes;
