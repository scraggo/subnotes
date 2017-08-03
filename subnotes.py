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
import sys
import itertools
from datetime import datetime
import pyperclip
# import re
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

    for i, block in enumerate(f_list):
        encodedf_list.append({})
        encodedf_list[i].setdefault('header', 'zzzzz')
        encodedf_list[i].setdefault('data', [])
        encodedf_list[i].setdefault('done', [])
        for line in block:
            line = line.replace('\t', ' ' * SPACING)
            spaces = spaceChecker(line) #error if spacing is off
            if spaces % 4 != 0:
                if spaces < 4:
                    line = '    ' + line.strip()
                else:
                    line = '        ' + line.strip()
            if line.strip().startswith('x '):
                encodedf_list[i]['done'].append(line)

            else: #line doesn't start with x
                if line == block[0]:
                    encodedf_list[i]['header'] = line.strip()
                else:
                    encodedf_list[i]['data'].append(line)
    # print(encodedf_list)#debug
    return sortBlocks(encodedf_list)

def spaceChecker(text):
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
    spaces = (len(text) - len(text.lstrip()))

    # if spaces % SPACING != 0:
    #     print('WARNING - INCONSISTENT SPACING!\n>>>' + text)
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


def printHeader(dataItem):
    '''dataItem is a single dict object from encoded todos'''

    if dataItem['header'] != 'zzzzz':
        print(dataItem['header'])

def printData(dataItem):
    '''dataItem is a single dict object from encoded todos'''

    if dataItem['data'] != []:
        for item in dataItem['data']:
            print(item)


def printDone(encodedf_list):
    '''
    Prints done items with timestamp above.
    '''
    #prints the current date and time
    print(str(datetime.now()))

    # filter by done
    doneList = []
    for todoData in encodedf_list:
        if len(todoData['done']) > 0:
            doneList.append(todoData)

    # pprint(doneList)#debug

    # display notes
    for data in doneList:
        # if type(data['done']) == list:
        if data['header'] == 'zzzzz' or len(data['header']) < 1:
            # print('header empty')#debug
            for doneItem in data['done']:
                print(doneItem.strip())
        else:
            print(data['header'])
            for doneItem in data['done']:
                # print('header not empty')#debug
                print('    ' + doneItem.strip())

def printAllSorted(encodedf_list):
    '''prints sorted'''
    for item in encodedf_list:
        if item['header'] not in ['', 'zzzzz']:
            printHeader(item)
            if item['data'] == []:
                print()
        if item['data'] != []:
            printData(item)
            print()
    printDone(encodedf_list)


def priorityTagFilter(encodedf_list):
    '''
    Only print items that contain '@!'

    Args:
        encodedf_list: the encoded list
    Returns:
        None (only prints)
    '''
    #filter by @!
    print(r'PRIORITY ITEMS - with @! tag')
    print('*'*28)
    for item in encodedf_list:
        for k, v in item.items():
            if k == 'header' and '@!' in v:
                print(v)
                print()
            elif k == 'data':
                for subItem in v:
                    if '@!' in subItem:
                        print(item['header'])
                        print(subItem)
                        print()


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
            priorityTagFilter(encodedTodos)

        print('\n\nCool! But, what now?')
        print(
            'You may select and this output to your clipboard to put into your personal file system.\n\
    To return to main menu, hit enter.\n\
    If you\'ve got everything you need, hit q to quit.')
        pause = input('> ')
        if pause.lower() == 'q':
            print('Thanks and goodbye!')
            break
