#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import json
import time
import socket
import curses
import subprocess
from collections import OrderedDict

file_list = [
    'acm_DSC_fields.json',
    'acm_FF_fields.json',
    'acm_Flashforge_fields.json',
    'acm_LFA_fields.json',
    'acm_Wanhao_fields.json',
    'acm_TGA_fields.json'
]

def verify_all():
    form_names = list(file_list) 
    for file_name in form_names:
        try:
            print json.load(open(file_name))
        except ValueError:
            print file_name

def id_forms():
    form_names = [forms for forms in os.listdir('.') if 'field' in forms]
    print form_names

def fix_forms():
    form_names = list(file_list)
    for form in form_names:
        neo_array = []
        new_array = []
        this_form = json.load(open(form))
        for key in this_form:
            new_dict = this_form[key].copy()
            new_dict['field_name'] = key
            new_array.append(new_dict)
        neo_array = sorted(new_array, key=lambda k: k['order'])
        # for moose in neo_array:
        #     print moose
        # print new_array
        my_new_json = {}
        my_new_json['data'] = neo_array
        json.dump(neo_array,open('acm_'+form,'w'), indent=2)
            # print this_form[key]
        # new_json =
def fix_all():
    for i in file_list:
        moose = json.load(open(i))
        print moose


def renumber_all():
    for i in file_list:
        this_file = json.load(open(i))
        for index, field in enumerate(this_file):
            field['order'] = index+1
        json.dump(this_file,open('new_'+i,'w'), indent=2)

def main():
    renumber_all()



if __name__ == '__main__':
    # verify_all()
    main()
