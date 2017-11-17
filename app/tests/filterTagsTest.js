function tag_filter(encList, f_tag) {
    /*
        Prints projects that contain f_tag input by user.
        Done items with tags are not included.

        Args:
            encodedf_list: the encoded list
        Returns:
            None (only prints)
        */

    // let all_tags = this.return_all_tags();
  let all_tags = ["@!", "@!!!", "@crazy", "@innertag", "@othertag", "@tag"];

  //get user input
  // let f_tag = GET-ELEMENT!
  //ADD @ IF @ ISN'T FIRST
  if (!f_tag.startsWith('@')) {
    f_tag = '@' + f_tag.trim();
  }
  // let f_tag = input('Tag to search (include @): ')

  //filter by f_tag
  let filtered_tags = [];
  return encList.filter( item => item.tags.indexOf(f_tag) > -1 );
  // return this.encoded_list.filter( item => item.tags.indexOf(f_tag) > -1 );
}

function displayFilteredTags(filteredList, f_tag) {
  let nothingFoundMessage = '<h2>No Tagged Items Found.</h2>';
  if (filteredList.length < 1) {
    return nothingFoundMessage;
  }
  // this.LOWEST_CHAR
  let LOWEST_CHAR = '~'.repeat(10);
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
      if (item.header === LOWEST_CHAR) {
        doneArray.push({doneItem: doneFiltered})
      } else {
        doneArray.push({doneHeader: item.header, doneItem: doneFiltered})
      }
    }
  }
  // console.log('tagArray: ', tagArray);//debug
  // console.log('doneArray', doneArray);//debug

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
  console.log(output1.join(''));//debug
  console.log(output2.join(''));//debug

  return [output1, output2];
}
