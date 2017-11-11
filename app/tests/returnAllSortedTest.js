
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
  let header_exists, item, data_item, i, j;
  let nowDate = new Date();
  nowDate = nowDate.toString();

  for (i = 0; i < data.length; i++) {
    item = data[i];
    header_exists = true;

    if (item['header'] !== '' || item['header'] !== this.LOWEST_CHAR) {
      allSorted.push('\n' + item['header'].trimRight());
    } else {
      header_exists = false;
    }

    if (item['data'].length > 0) {//
      if (header_exists === false) {//
        allSorted.push('');
      }
      for (j = 0; j < item['data'.length; j++]) {
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
  for (data in doneList) {
    // if type(data['done']) == list
    if (
      data['header'] === this.LOWEST_CHAR ||
      data['header'] == '{Completed Project}' ||
      len(data['header']) < 1
    ) {
      // print('header empty')//debug
      for (doneItem in data['done']) {
        allSorted.push(doneItem.trim());
      }
    } else {
      allSorted.push(data['header'])
      for (doneItem in data['done']) {
        // print('header not empty')//debug
        allSorted.push(' ' * this._spacing + doneItem.trim());
      }
    }
  }
  return allSorted.join('\n');
}

// TESTS
const input = [{header:"+Project1 @tag",data:["    task1 for project @!!!","    task2 for project","    task3 for project"],tags:["@tag","@!!!"],done:["    x done item in project","    x another done item in project","    x 3rd done item in project"]},{header:"Not a project, so it's a note",data:["    subnote with priority tag @!"],tags:["@!"],done:["    x done item for note"]},{header:"Note with tag @!",data:["    not done item for a note @tag"],tags:["@!","@tag"],done:["    x done item for note"]},{header:"note, no subnotes 1 lots of tags @! @tag @othertag @crazy",data:[],tags:["@!"],done:[]},{header:"note, no subnotes 2",data:[],tags:[],done:[]},{header:"z title should be low",data:["subnote below z title"],tags:[],done:[]},{header:"{Completed Project}",data:["subnote1 for done header","subnote2 for done header"],tags:[],done:["x Top level done item with subnote"]},{header:"~~~~~~~~~~",data:[],tags:["@innertag"],done:["x Top level done item @innertag embedded tag"]},{header:"~~~~~~~~~~",data:[],tags:["@!"],done:["x Top level done item with tag @!"]}];

// console.log(typeof input);
let test = return_all_sorted(input);
console.log(test);







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