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
  // let f_tag = GETELEMENT!
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
  // this.LOWEST_CHAR
  let LOWEST_CHAR = '~'.repeat(10);
  let tagArray = [];
  let doneArray = [];
  let i, item;
  for (i = 0; i < filteredList.length; i++) {
    item = filteredList[i];
    // if (item.data.length < 1 || item.header === this.LOWEST_CHAR || item.header.length < 1) {
    if ((item.header === LOWEST_CHAR || item.header.length < 1) && item.data.length < 1) {//REMEMBER TO REPLACE LOWEST_CHAR WITH this.LOWEST_CHAR IN THIS LINE
      doneFiltered = item.done.filter( x => x.includes(f_tag));
      doneArray.concat(doneFiltered);
    } else {
      headerSearch = item.header.includes(' ' + f_tag) ? item.header : false;
      dataFiltered = item.data
        .filter( x => x.includes(' ' + f_tag))
        .map( x => x.trim() );
      tagArray.push({headerTags: headerSearch, dataTags: dataFiltered });
    }
  }
  console.log(tagArray, doneArray);

  if (doneArray.length < 1 && tagArray.length < 1) {
    return '<h2>No Tagged Items Found.</h2>'
  }

  // convert tagArray to array of strings
  let tagArray2 = tagArray.map(function(item) {
    if (item.headerTags !== false && item.dataTags !== false) {
      return '' + item.headerTags + item.dataTags.join('\n') + '\n';
    } else if (item.headerTags !== false && item.dataTags.length < 1) {
      return '' + item.headerTags + '\n';
    } else if (item.headerTags === false) {
      return '' + item.dataTags.join('\n') + '\n';
    }
  })
  
  console.log(tagArray2);
  let doneString = '';
  let doneHeader = '<h2>Done Items with Tag:</h2>';
  if (doneArray.length > 0) {
    doneString = doneHeader + '\n' + doneArray.join('\n');
  }
  let taggedHeader = '<h2>Tagged Items:</h2>';
  return taggedHeader + '\n\n' + tagArray2.join('\n') + '\n' + doneString;
  // OR block:
  // if data = empty, header = lowest char, header = empty
  // append to 'done' at end for display
  // else
  // display header AND data that contains tag.
}
/*
  if len(filtered_tags) > 0
    print()
  print('*' * (20 + len(f_tag)))
  print('Projects with tag: {}'.format(f_tag))
  print('*' * (20 + len(f_tag)))
  for header_tag in filtered_tags
    print(header_tag)
  print()
  else 
    print('No notes with {} tag found.\n'.format(f_tag))
  }

}

function view_all_tags(all_tags) {
  // input?
  let output = [];
  if (all_tags.length < 1) {
      alert('No tags found.\n');
      return;
  } else {
      return 'Your Tags: ' + all_tags.join(', ');
  }
}

*/