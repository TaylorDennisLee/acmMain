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

# from tornado import gen
# import tornado.httpserver
# import tornado.websocket
# import tornado.ioloop
# import tornado.web


# import jinja2
# import pyjade
# import couchdb



def verify_all():
    form_names = [forms for forms in os.listdir('.') if 'field' in forms]
    for file_name in form_names:
        try:
            json.load(open(file_name))
        except ValueError:
            print file_name

def id_forms():
    form_names = [forms for forms in os.listdir('.') if 'field' in forms]
    print form_names

def fix_forms():
    form_names = [forms for forms in os.listdir('.') if 'field' in forms]
    new_array = []
    for form in form_names:
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
        json.dump(my_new_json,open('acm_'+form,'w'), indent=2)
            # print this_form[key]
        # new_json =



def main():
    fix_forms()



if __name__ == '__main__':
    # verify_all()
    main()
