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
import itertools
from pprint import pprint
import os, sys
import re
import pyperclip
from datetime import datetime

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

    if spaces % SPACING != 0:
        print('WARNING - INCONSISTENT SPACING!\n>>>' + text)
        print("has {} spaces. Convert to multiples of {} spaces.".format(spaces, SPACING))
        sys.exit()

    return spaces

def makeBlocks(f_list):
    '''
    Args:
        f_list: this is the user's text, list format, split by new line
    Returns:
        A list of lists where each list is determined by empty lines
    '''
    return [list(g[1]) for g in itertools.groupby(f_list, key= lambda x: x.strip() != '') if g[0]]

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
        encodedf_list: this is an empty list (global)
    Returns:
        None (global encodedf_list is manipulated with encoding)
    '''

    f_list = makeBlocks(f_list)

    # dataBlocks = []
    # for sublist in blocks:
    #     if sublist[1]:
    #         dataBlocks.append({'header': sublist[0], 'data': sublist[1:]})
    #     else:
    #         dataBlocks.append({'header': sublist[0], 'data': []})
    # dataBlocks = sorted(dataBlocks, key=lambda k: k['header'].lower())
    # # pprint(dataBlocks)
    # return dataBlocks
    
    for i, block in enumerate(f_list):
        encodedf_list.append({})
        encodedf_list[i].setdefault('header', [])
        encodedf_list[i].setdefault('data', [])
        encodedf_list[i].setdefault('done', [])
        for line in block:
            line = line.replace('\t', ' ' * SPACING)
            spaces = spaceChecker(line)

            if line.strip().startswith('x '):
                encodedf_list[i]['done'].append(line)

            else: #line doesn't start with x
                if len(block) == 1:
                    encodedf_list[i]['header'].append(line)
                elif len(block) > 1:
                    if line == block[0]:
                        encodedf_list[i]['header'].append(line)
                    else:
                        encodedf_list[i]['data'].append(line)


def printHeader(dataItem):
    '''dataItem is a single dict object from encoded todos'''

    if dataItem['header'] != [],
        print(dataItem['header'][0])

def printData(dataItem):
    '''dataItem is a single dict object from encoded todos'''

    if dataItem['data'] != []:
        for item in dataItem['data']:
            print(item)


def printTodo(todoItem):
    '''todoItem is a single dict object from encoded todos'''

    if 'project' in todoItem:
        print(todoItem['project'])

    elif 'note' in todoItem:
        print(todoItem['note'])

    if 'subnote' in todoItem:
        for subNote in todoItem['subnote']:
            print(subNote)

    if 'done' in todoItem:
        for doneItem in todoItem['done']:
            print(doneItem)

def printAllHeaders(encodedf_list):
    '''sort and print'''
    headerList = []
    for data in encodedf_list:
        if data['header']:
            headerList.append(data['header'][0])

    # sort by header name
    headerList = sorted(headerList, key=lambda k: k.lower())

    # display headers
    for header in headerList:
        print(header)


def printAllData(encodedf_list):
    '''just print'''
    dataList = []
    for data in encodedf_list:
        if data['data']:
            dataList.append(data['data'])

    # sort by data name
    # dataList = sorted(dataList, key=lambda k: k.lower())

    # display projects
    for data in dataList:
        print(data)

# def printProjects(encodedf_list):
#     # print('\nPROJECTS:\n')
#     # filter by projects
#     projectList = []
#     for data in encodedf_list:
#         if 'project' in data:
#             projectList.append(data)

#     # sort by project name
#     projectList2 = sorted(projectList, key=lambda k: k['project'].lower())

#     # display projects
#     for project in projectList2:
#         print(project['project'])
#         if 'subnote' in project:
#             for note in project['subnote']:
#                 print(note) #with 4 preceding spaces?

# def printNotes(encodedf_list):
#     # print('\nNOTES:\n')
#     # filter by notes
#     noteList = []
#     for data in encodedf_list:
#         if 'project' not in data and 'note' in data: #and 'done' not in data (removed)
#             noteList.append(data)

#     # sort by note name
#     noteList2 = sorted(noteList, key=lambda k: k['note'].lower())

#     # display notes
#     for note in noteList2:
#         print(note['note'])
#         if 'subnote' in note:
#             for note in note['subnote']:
#                 print(note) #with 4 preceding spaces?
#         print()

def printDone(encodedf_list):
    # print('DONE:')

    #prints the current date and time
    print(str(datetime.now()))

    # filter by done
    doneList = []
    for fullData in encodedf_list:
        if 'done' in fullData:
            doneList.append(fullData)    

    # display notes
    for data in doneList:
        # if type(data['done']) == list:
        for doneItem in data['done']:
            if data['header'] == []:
                # print('header empty')#debug
                print(doneItem.strip())
            else:
                # print('header not empty')#debug
                # print(doneItem.strip() + ', ' + data['header'][0])
                print(doneItem.strip() + ' -> ' + data['header'][0])

def sortAll(encodedf_list):
    '''prints sorted'''
    printHeader(encodedf_list)
    # printProjects(encodedf_list)
    print()
    printData(encodedf_list)
    # printNotes(encodedf_list)
    printDone(encodedf_list)


def priorityTagFilter():
    #Beware of global encodedTodos!
    #filter by @!
    print(r'PRIORITY ITEMS - with @! tag')
    print('*'*28)
    for todoItem in encodedTodos:
        for v in todoItem.values():
            if type(v) == str and '@!' in v:
                printTodo(todoItem)
                print()
                break #inner loop only?
            elif type(v) == list:
                for subItem in v:
                    if '@!' in subItem:
                        printTodo(todoItem)
                        print()
                        break

def menu():
    print('Choose from the following options:')
    print('''    1. Order your notes alphabetically.
    2. Display priority tag (@!) notes.
    q. Quit''')
    choice = input('> ')
    return choice

def debugPrintAll():
    #test - rename without '2' at end
    todoTxt2 = '''
+projectB
    x note1B
    note2B
    
note all alone

note with subnotes
    note subnote1 @!
    note subnote2

+projectA @!
    note1A
    note2A
'''
    todoArray = todoTxt2.split('\n')
    encodedTodos2 = []
    blockEncoder(todoArray, encodedTodos2)
    #debug encoded todos
    print(encodedTodos2)
    #prints all
    for todoItem in encodedTodos2:
        printTodo(todoItem) #see function, rename var
        print()

# debugPrintAll()
# pause = input('>')

#GLOBAL, QUICK CONFIG:
SPACING = 4

if __name__ == '__main__':

    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print('Welcome to Subnotes! ', end='')
        choice = menu()
        if choice not in ['1', '2']:
            print('Thanks and goodbye!')
            break

        print('Copy your notes to clipboard, enter when done:')
        pause = input('> ')
        todoTxt = pyperclip.paste()
        todoArray = todoTxt.split('\n')
        encodedTodos = []

        blockEncoder(todoArray, encodedTodos)

        if choice == '1':
            sortAll(encodedTodos)

        elif choice == '2':
            priorityTagFilter()

        print('\n\nCool! But, what now?')
        print(
        'You may select and this output to your clipboard to put into your personal file system.\n\
    To return to main menu, hit enter.\n\
    If you\'ve got everything you need, hit q to quit.')
        pause = input('> ')
        if pause.lower() == 'q':
            print('Thanks and goodbye!')
            break

