#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on 7/25/17

@author: davecohen

Title: Subnotes - a plain text notes and tasks system
    see example below for the expected in format
    - spaces between each link determine 'blocks'
    - headers are the first line of a block or a single line.
"""
import os
# import sys
import itertools
from datetime import datetime
import pyperclip
import re
from pprint import pprint


def blockEncoder(f_list, encodedf_list):
    '''
    Main function that appends dict objects to encodedf_list as such:
    [
    {'project': '+projectB', 'done': ['    x note1B'], 'Subnote': ['    note2B']}, {'note': 'note all alone'},
    {'note': 'note with subnotes', 'Subnote': ['    note subnote1 @!', '    note subnote2']},
    {'project': '+projectA @!', 'Subnote': ['    note1A', '    note2A']}
    ]

    Args:
        f_list: this is the user's text, list format, split by new line
        encodedf_list: this is an empty list
    Returns:
        Sorted encodedf_list by 'header'
    '''

    f_list = makeBlocks(f_list)
    tagRegex = re.compile(r'\B@\S+')

    for i, block in enumerate(f_list):
        encodedf_list.append({})
        # headers are encoded as 'zzzzzZZZZZ' if first and only line is preceded by 'x'
        encodedf_list[i].setdefault('header', 'zzzzzZZZZZ')
        encodedf_list[i].setdefault('data', [])
        encodedf_list[i].setdefault('tags', [])
        encodedf_list[i].setdefault('done', [])
        for line in block:
            #fix spacing and convert tabs to spaces
            line = line.replace('\t', ' ' * SPACING)
            spaces = spaceChecker(line)
            if spaces % 4 != 0:
                if spaces < 4:
                    line = '    ' + line.strip()
                else:
                    line = '        ' + line.strip()

            # done items start with x
            if line.strip().startswith('x '):
                encodedf_list[i]['done'].append(line)

            else:
                if line == block[0]: # line is the 'header'
                    encodedf_list[i]['header'] = line.strip()
                else: # line is 'data'
                    encodedf_list[i]['data'].append(line)

                tagList = tagRegex.findall(line)
                if tagList:
                    for tag in tagList:
                        encodedf_list[i]['tags'].append(tag)

    return sortBlocks(encodedf_list)

def spaceChecker(f_text):
    '''
    We want a file that has mod 4 spaces and no tabs.

    Args:
        text: a string of text with tabs already replaced.
    Returns:
        the number of leading spaces in the text
    Raises:
        sys.exit() if spacing is inconsistent
    '''

    #count how many leading spaces
    spaces = (len(f_text) - len(f_text.lstrip()))

    # if spaces % SPACING != 0:
    #     print('WARNING - INCONSISTENT SPACING!\n>>>' + f_text)
    #     print("has {} spaces. Convert to multiples of {} spaces.".format(spaces, SPACING))
    #     sys.exit()

    return spaces

def makeBlocks(f_list):
    '''
    Args:
        f_list: this is the user's text, list format, split by new line
    Returns:
        A list of lists where each list is determined by empty lines
    '''
    return [list(g[1]) for g in itertools.groupby(f_list, key=lambda x: x.strip() != '') if g[0]]

def sortBlocks(f_list):
    '''
    Sorts f_list by key ['header']
    '''
    return sorted(f_list, key=lambda k: k['header'].lower())


def printHeader(f_dataItem):
    '''f_dataItem is a single dict object from encoded todos'''

    if f_dataItem['header'] != 'zzzzzZZZZZ':
        print(f_dataItem['header'])

def printData(f_dataItem):
    '''f_dataItem is a single dict object from encoded todos'''
    if f_dataItem['data'] != []:
        for item in f_dataItem['data']:
            print(item)


def printDone(encodedf_list):
    '''
    Prints done items with timestamp above.
    '''
    #prints the current date and time
    time_now = str(datetime.now())
    print(time_now)

    # filter by done
    doneList = []
    for todoData in encodedf_list:
        if len(todoData['done']) > 0:
            # doneList.append(todoData)

            # pprint(doneList)#debug

            # display notes
            # for data in doneList:
                # pass
            # if type(data['done']) == list:
            if todoData['header'] == 'zzzzzZZZZZ' or len(todoData['header']) < 1:
                # print('header empty')#debug
                for doneItem in todoData['done']:
                    print(doneItem.strip())
                    doneList.append(doneItem.strip())
            else:
                print(todoData['header'])
                doneList.append(todoData['header'])
                for doneItem in todoData['done']:
                    # print('header not empty')#debug
                    print('    ' + doneItem.strip())
                    doneList.append('    ' + doneItem.strip())

    return doneList.insert(0, time_now)


def printAllTags(encodedf_list):
    """
    prints all the tags, sorted in abc order with no duplicates
    """
    sortedtags = []
    for item in encodedf_list:
        tagslist = item['tags']
        if tagslist != []:
            for tag in tagslist:
                if tag not in sortedtags:
                    sortedtags.append(tag)

    for s_tag in sorted(sortedtags):
        print(s_tag, end=' ')


def printAllSorted(encodedf_list):
    '''prints sorted'''
    for item in encodedf_list:
        if item['header'] not in ['', 'zzzzzZZZZZ']:
            printHeader(item)
            if item['data'] == []:
                print()
        if item['data'] != []:
            printData(item)
            print()
    printDone(encodedf_list)

def returnAllSorted(encodedf_list):
    '''returns all items sorted as a string for printing or clipboard.'''

    allSorted = []
    doneList = []

    for item in encodedf_list:
        header_exists = True

        if item['header'] not in ['', 'zzzzzZZZZZ']:
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
        if data['header'] == 'zzzzzZZZZZ' or len(data['header']) < 1:
            # print('header empty')#debug
            for doneItem in data['done']:
                allSorted.append(doneItem.strip())
        else:
            allSorted.append(data['header'])
            for doneItem in data['done']:
                # print('header not empty')#debug
                allSorted.append('    ' + doneItem.strip())
                
    return '\n'.join(allSorted)
    # return str(allSorted)


def tagFilter(encodedf_list):
    '''
    Only print projects that contain f_tag input by user.
    Done items with tags are not included.

    Args:
        encodedf_list: the encoded list
    Returns:
        None (only prints)
    '''
    print('Your Tags: ', end='')
    printAllTags(encodedf_list)
    print()
    #get user input
    f_tag = input('Tag to search (include @): ')
    #filter by f_tag
    print('*'*28)
    print('Projects with {} tag'.format(f_tag))
    print('*'*28)
    for item in encodedf_list:
        for k, v in item.items():
            if k == 'tags':
                for str_tag in v:
                    if str_tag.find(f_tag) > -1:
                        print(item['header'])
                        break


def menu():
    '''
    Prints a menu, gets user choice input, returns input (string).
    '''
    print('Choose from the following options:')
    print('''    1. Order your notes alphabetically.
    2. Display priority tag (@!) notes.
    q. Quit''')
    f_choice = input('> ')
    return f_choice


#GLOBAL, QUICK CONFIG:
SPACING = 4

if __name__ == '__main__':

    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print('Welcome to Subnotes! ', end='')
        choice = menu()
        if choice not in ['1', '2', '']:
            print('Thanks and goodbye!')
            break

        print('Copy your notes to clipboard, enter when done:')
        user_pause = input('> ')
        todoTxt = pyperclip.paste()
        todoArray = todoTxt.split('\n')
        encodedTodos = []

        encodedTodos = blockEncoder(todoArray, encodedTodos)

        if choice in ['1', '']: #default if user presses enter
            printAllSorted(encodedTodos)

        elif choice == '2':
            tagFilter(encodedTodos)

        print('\n\nCool! But, what now?')
        print(
            'You may select and this output to your clipboard to put into your personal file system.\n\
    To return to main menu, hit enter.\n\
    If you\'ve got everything you need, hit q to quit.')
        pause = input('> ')
        if pause.lower() == 'q':
            print('Thanks and goodbye!')
            break
