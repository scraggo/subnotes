from subnotes import *

#get test document
with open("todotest.txt") as f:
   text = f.readlines()
   
# print(text)

#String version of text
textstr = ''.join(text)

#######
# TESTS
#######

print()
print('='*40)
print()

# spaceChecker (relies on SPACING)
for line in text:
    if spaceChecker(line.rstrip()) not in list(range(0,80,4)):
        print('spaceChecker fail')
        print(line)
        break
else:
    print('spaceChecker pass')

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
# pprint(blockEncoder(text, []))

print()
print('='*40)
print()


# printDone
pdtest = blockEncoder(text, [])
# pprint(pdtest)
printDone(pdtest)

print()
print('='*40)
print()
