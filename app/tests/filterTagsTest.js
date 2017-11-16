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
  function headerTagLine() {
    return item.header.includes(' ' + f_tag) ? item.header : '';
  }

  function dataTagLines() {
    // returns an array of lines that include f_tag
    return item.data
      .filter( x => x.includes(f_tag))
      .map( x => x.trim() );
  }

  function doneTagLines() {
    // returns an array of lines that include f_tag
    return item.done
      .filter( x => x.includes(f_tag))
      .map( x => x.trim() );
  }

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
    // if (item.data.length < 1 || item.header === this.LOWEST_CHAR || item.header.length < 1) {
    if ((item.data.length < 1) && (item.header === LOWEST_CHAR || item.header.length < 1)) {//REMEMBER TO REPLACE LOWEST_CHAR WITH this.LOWEST_CHAR IN THIS LINE
      doneFiltered = doneTagLines();
      if (doneFiltered.length > 0) {
        doneArray = doneArray.concat(doneFiltered);
      }
      console.log('item', item);//debug
      // console.log((item.data.length < 1) && (item.header === LOWEST_CHAR || item.header.length < 1));//debug
      // console.log(doneFiltered, doneArray);//debug
      console.log('tagArray inside weird block: ', tagArray);
    } else {
      tagArray.push({headerTags: headerTagLine(), dataTags: dataTagLines() });
    }
  }
  console.log('tagArray: ', tagArray);//debug
  console.log('doneArray: ', doneArray);//debug

  if (doneArray.length < 1 && tagArray.length < 1) {
    return nothingFoundMessage;
  }

  // convert tagArray to array of strings
  let tagArray2 = tagArray.map(function(item) {
    if (item.headerTags !== false && item.dataTags !== false) {
      return item.headerTags + item.dataTags.join('\n') + '\n';
    } else if (item.headerTags !== false && item.dataTags === false) {
      return item.headerTags + '\n';
    } else if (item.headerTags === false) {
      console.log(item);
      return item.dataTags.join('\n') + '\n';
    }
  })
  
  // console.log(tagArray2);//debug
  let doneString = '';
  let doneHeader = '<h2>Done Items with Tag:</h2>';
  if (doneArray.length > 0) {
    doneString = doneHeader + '\n' + doneArray.join('\n');
  }
  let taggedHeader = '<h2>Tagged Items:</h2>';
  return taggedHeader + '\n' + tagArray2.join('\n') + '\n' + doneString;
}
