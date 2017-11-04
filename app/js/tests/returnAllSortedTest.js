
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

// function test_block_encoder() {
//     let f_text = test_text;
//     console.log(block_encoder(f_text));
// }

// function run_tests() {
//     test_block_encoder();
// }

// run_tests();

function return_all_sorted(data) {
    /*returns all items sorted as a string for printing or clipboard.*/

  let allSorted = [];
  let doneList = [];

  for item in data
    header_exists = True

    if item['header'] not in ['', this.LOWEST_CHAR]
      allSorted.push('\n' + item['header'].rstrip())
    else 
      header_exists = False

    if len(item['data']) > 0
      if not header_exists
      allSorted.push('')
      for data_item in item['data']
        allSorted.push(data_item.rstrip())

    if len(item['done']) > 0
      //append to separate list
      doneList.push(item)

    //put done items at end of list with timestamp

    //prints the current date and time
    allSorted.push('\n' + str(datetime.now()))

  // append done items to list
  for data in doneList
    // if type(data['done']) == list
    if data['header'] == this.LOWEST_CHAR or\
  data['header'] == '{Completed Project}'
  or\
  len(data['header']) < 1
    // print('header empty')//debug
    for doneItem in data['done']
    allSorted.push(doneItem.trim())
  else 
    allSorted.push(data['header'])
  for doneItem in data['done']
    // print('header not empty')//debug
    allSorted.push(' ' * this._spacing + doneItem.trim())

  return '\n'.join(allSorted)
}

/*

def return_all_sorted(self):
  '''returns all items sorted as a string for printing or clipboard.'''

  allSorted = []
  doneList = []

  for item in self.encoded_list:
      header_exists = True

      if item['header'] not in ['', self.LOWEST_CHAR]:
          allSorted.append('\n' + item['header'].rstrip())
      else:
          header_exists = False

      if len(item['data']) > 0:
          if not header_exists:
              allSorted.append('')
          for data_item in item['data']:
              allSorted.append(data_item.rstrip())

      if len(item['done']) > 0:
          #append to separate list
          doneList.append(item)
          
  #put done items at end of list with timestamp

  #prints the current date and time
  allSorted.append('\n' + str(datetime.now()))

  # append done items to list
  for data in doneList:
      # if type(data['done']) == list:
      if data['header'] == self.LOWEST_CHAR or\
              data['header'] == '{Completed Project}' or\
              len(data['header']) < 1:
          # print('header empty')#debug
          for doneItem in data['done']:
              allSorted.append(doneItem.strip())
      else:
          allSorted.append(data['header'])
          for doneItem in data['done']:
              # print('header not empty')#debug
              allSorted.append(' ' * self._spacing + doneItem.strip())
              
  return '\n'.join(allSorted)

*/