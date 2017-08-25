from subnotes import *

#get test document
with open("todotest.txt") as f:
    text = f.readlines()
   
# print(text)

def PRINTLINE():
    print()
    print('='*40)
    print()

#######
# TESTS
#######

PRINTLINE()

#  Test main
maintest = ''.join(text)
# print(maintest)

try:
    my_todos = Subnotes(maintest)
    pyperclip.copy(my_todos.return_all_sorted())
    print('Notes copied to clipboard.')
except Exception as e:
    print(e)

PRINTLINE()

#  Test spacing
spacingtest = ''.join(text)
# print(maintest)

my_todos = Subnotes(spacingtest) #default 4
print(my_todos.set_spacing())
my_todos2 = Subnotes(spacingtest, 2)
# my_todos3 = Subnotes(spacingtest, 3) #correctly raises error
my_todos4 = Subnotes(spacingtest, 4)
my_todos5 = Subnotes(spacingtest, 5)


PRINTLINE()

# test block_encoder
block_e_test = ''.join(text)
my_todos = Subnotes(block_e_test)
pprint(my_todos.encoded_list)

PRINTLINE()

# test return_all_tags
ratags_test = ''.join(text)
my_todos = Subnotes(ratags_test)
pprint(my_todos.return_all_tags())


PRINTLINE()

# test return_all_sorted
ras_test = ''.join(text)
my_todos = Subnotes(ras_test)
pprint(my_todos.return_all_sorted())


PRINTLINE()

# test tag_filter
tf_test = ''.join(text)
my_todos = Subnotes(tf_test)
my_todos.tag_filter()
#test empty
my_todos_tf_test = my_todos
my_todos_tf_test.encoded_list = []
my_todos_tf_test.tag_filter()

PRINTLINE()


"""

print()
print('='*40)
print()

# makeBlocks
mbtest = makeBlocks(text)
# pprint(mbtest)
for line in mbtest:
    if line == '':
        print('\nmakeBlocks fail')
else:
    print('\nmakeBlocks pass')

print()
print('='*40)
print()

# blockEncoder - relies on sortBlocks
pprint(blockEncoder(text, []))

print()
print('='*40)
print()


# printDone
pdtest = blockEncoder(text, [])
# pprint(pdtest)
print(printDone(pdtest))

print()
print('='*40)
print()


# printData
pdatatest = blockEncoder(text, [])
for pdata in pdatatest:
    printData(pdata)

print()
print('='*40)
print()


# findTag proto function
'''
fttest = blockEncoder(text, [])
tagRegex = re.compile(r'\B@\S+')
for ftdata in fttest:
    for ftkey, ftvalue in ftdata.items():
        if ftkey == 'header':
            searchkey = ftvalue
            tagList = tagRegex.findall(searchkey)
            if tagList:
                print('header tags:')
                print(tagList)
        elif ftkey == 'data':
            for ftditem in ftvalue:
                searchkey = ftditem
                tagList = tagRegex.findall(searchkey)
                if tagList:
                    print('data tags:')
                    print(tagList)

print()
print('='*40)
print()
'''
# tagFilter
ptagtest = blockEncoder(text, [])
# tagFilter(ptagtest)

print()
print('='*40)
print()

'''
# printAllTags
printtagtest = blockEncoder(text, [])
printAllTags(printtagtest)

print()
print('='*40)
print()
'''


#returnAllSorted(encodedf_list)
print('returnAllSorted test')
rtstest = blockEncoder(text, [])
print(returnAllSorted(rtstest))

"""