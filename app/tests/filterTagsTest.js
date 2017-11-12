function tag_filter() {
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
  let f_tag = GETELEMENT!
  // let f_tag = input('Tag to search (include @): ')

  //filter by f_tag
  let filtered_tags = [];
  this.encoded_list
    .map( item => item.tags )
    .filter( item =>  )
  for encoded_item in this.encoded_list
    for k, v in encoded_item.items()
    if k == 'tags'
    for str_tag in v
    if str_tag.find(f_tag) > -1
    filtered_tags.push(encoded_item['header'])
  break

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