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
    f_tag = '@' + f_tag;
  }
  // let f_tag = input('Tag to search (include @): ')

  //filter by f_tag
  let filtered_tags = [];
  return encList.filter( item => item.tags.indexOf(f_tag) > -1 );
  // return this.encoded_list.filter( item => item.tags.indexOf(f_tag) > -1 );
}

function displayFilteredTags() {
  // this.LOWEST_CHAR
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