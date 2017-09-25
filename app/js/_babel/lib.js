"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * clipboard.js v1.7.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var e;e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t();
  }
}(function () {
  var t, e, n;return function t(e, n, o) {
    function i(a, c) {
      if (!n[a]) {
        if (!e[a]) {
          var l = "function" == typeof require && require;if (!c && l) return l(a, !0);if (r) return r(a, !0);var s = new Error("Cannot find module '" + a + "'");throw s.code = "MODULE_NOT_FOUND", s;
        }var u = n[a] = { exports: {} };e[a][0].call(u.exports, function (t) {
          var n = e[a][1][t];return i(n || t);
        }, u, u.exports, t, e, n, o);
      }return n[a].exports;
    }for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) {
      i(o[a]);
    }return i;
  }({ 1: [function (t, e, n) {
      function o(t, e) {
        for (; t && t.nodeType !== i;) {
          if ("function" == typeof t.matches && t.matches(e)) return t;t = t.parentNode;
        }
      }var i = 9;if ("undefined" != typeof Element && !Element.prototype.matches) {
        var r = Element.prototype;r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector;
      }e.exports = o;
    }, {}], 2: [function (t, e, n) {
      function o(t, e, n, o, r) {
        var a = i.apply(this, arguments);return t.addEventListener(n, a, r), { destroy: function destroy() {
            t.removeEventListener(n, a, r);
          } };
      }function i(t, e, n, o) {
        return function (n) {
          n.delegateTarget = r(n.target, e), n.delegateTarget && o.call(t, n);
        };
      }var r = t("./closest");e.exports = o;
    }, { "./closest": 1 }], 3: [function (t, e, n) {
      n.node = function (t) {
        return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;
      }, n.nodeList = function (t) {
        var e = Object.prototype.toString.call(t);return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]));
      }, n.string = function (t) {
        return "string" == typeof t || t instanceof String;
      }, n.fn = function (t) {
        return "[object Function]" === Object.prototype.toString.call(t);
      };
    }, {}], 4: [function (t, e, n) {
      function o(t, e, n) {
        if (!t && !e && !n) throw new Error("Missing required arguments");if (!c.string(e)) throw new TypeError("Second argument must be a String");if (!c.fn(n)) throw new TypeError("Third argument must be a Function");if (c.node(t)) return i(t, e, n);if (c.nodeList(t)) return r(t, e, n);if (c.string(t)) return a(t, e, n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
      }function i(t, e, n) {
        return t.addEventListener(e, n), { destroy: function destroy() {
            t.removeEventListener(e, n);
          } };
      }function r(t, e, n) {
        return Array.prototype.forEach.call(t, function (t) {
          t.addEventListener(e, n);
        }), { destroy: function destroy() {
            Array.prototype.forEach.call(t, function (t) {
              t.removeEventListener(e, n);
            });
          } };
      }function a(t, e, n) {
        return l(document.body, t, e, n);
      }var c = t("./is"),
          l = t("delegate");e.exports = o;
    }, { "./is": 3, delegate: 2 }], 5: [function (t, e, n) {
      function o(t) {
        var e;if ("SELECT" === t.nodeName) t.focus(), e = t.value;else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
          var n = t.hasAttribute("readonly");n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value;
        } else {
          t.hasAttribute("contenteditable") && t.focus();var o = window.getSelection(),
              i = document.createRange();i.selectNodeContents(t), o.removeAllRanges(), o.addRange(i), e = o.toString();
        }return e;
      }e.exports = o;
    }, {}], 6: [function (t, e, n) {
      function o() {}o.prototype = { on: function on(t, e, n) {
          var o = this.e || (this.e = {});return (o[t] || (o[t] = [])).push({ fn: e, ctx: n }), this;
        }, once: function once(t, e, n) {
          function o() {
            i.off(t, o), e.apply(n, arguments);
          }var i = this;return o._ = e, this.on(t, o, n);
        }, emit: function emit(t) {
          var e = [].slice.call(arguments, 1),
              n = ((this.e || (this.e = {}))[t] || []).slice(),
              o = 0,
              i = n.length;for (o; o < i; o++) {
            n[o].fn.apply(n[o].ctx, e);
          }return this;
        }, off: function off(t, e) {
          var n = this.e || (this.e = {}),
              o = n[t],
              i = [];if (o && e) for (var r = 0, a = o.length; r < a; r++) {
            o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
          }return i.length ? n[t] = i : delete n[t], this;
        } }, e.exports = o;
    }, {}], 7: [function (e, n, o) {
      !function (i, r) {
        if ("function" == typeof t && t.amd) t(["module", "select"], r);else if (void 0 !== o) r(n, e("select"));else {
          var a = { exports: {} };r(a, i.select), i.clipboardAction = a.exports;
        }
      }(this, function (t, e) {
        "use strict";
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }function o(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }var i = n(e),
            r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
          return typeof t === "undefined" ? "undefined" : _typeof(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
        },
            a = function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var o = e[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
            }
          }return function (e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
          };
        }(),
            c = function () {
          function t(e) {
            o(this, t), this.resolveOptions(e), this.initSelection();
          }return a(t, [{ key: "resolveOptions", value: function t() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = "";
            } }, { key: "initSelection", value: function t() {
              this.text ? this.selectFake() : this.target && this.selectTarget();
            } }, { key: "selectFake", value: function t() {
              var e = this,
                  n = "rtl" == document.documentElement.getAttribute("dir");this.removeFake(), this.fakeHandlerCallback = function () {
                return e.removeFake();
              }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";var o = window.pageYOffset || document.documentElement.scrollTop;this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText();
            } }, { key: "removeFake", value: function t() {
              this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null);
            } }, { key: "selectTarget", value: function t() {
              this.selectedText = (0, i.default)(this.target), this.copyText();
            } }, { key: "copyText", value: function t() {
              var e = void 0;try {
                e = document.execCommand(this.action);
              } catch (t) {
                e = !1;
              }this.handleResult(e);
            } }, { key: "handleResult", value: function t(e) {
              this.emitter.emit(e ? "success" : "error", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) });
            } }, { key: "clearSelection", value: function t() {
              this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();
            } }, { key: "destroy", value: function t() {
              this.removeFake();
            } }, { key: "action", set: function t() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }, get: function t() {
              return this._action;
            } }, { key: "target", set: function t(e) {
              if (void 0 !== e) {
                if (!e || "object" !== (void 0 === e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target = e;
              }
            }, get: function t() {
              return this._target;
            } }]), t;
        }();t.exports = c;
      });
    }, { select: 5 }], 8: [function (e, n, o) {
      !function (i, r) {
        if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);else if (void 0 !== o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener"));else {
          var a = { exports: {} };r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports;
        }
      }(this, function (t, e, n, o) {
        "use strict";
        function i(t) {
          return t && t.__esModule ? t : { default: t };
        }function r(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }function a(t, e) {
          if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
        }function c(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }function l(t, e) {
          var n = "data-clipboard-" + t;if (e.hasAttribute(n)) return e.getAttribute(n);
        }var s = i(e),
            u = i(n),
            f = i(o),
            d = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
          return typeof t === "undefined" ? "undefined" : _typeof(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
        },
            h = function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var o = e[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
            }
          }return function (e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
          };
        }(),
            p = function (t) {
          function e(t, n) {
            r(this, e);var o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n), o.listenClick(t), o;
          }return c(e, t), h(e, [{ key: "resolveOptions", value: function t() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === d(e.container) ? e.container : document.body;
            } }, { key: "listenClick", value: function t(e) {
              var n = this;this.listener = (0, f.default)(e, "click", function (t) {
                return n.onClick(t);
              });
            } }, { key: "onClick", value: function t(e) {
              var n = e.delegateTarget || e.currentTarget;this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new s.default({ action: this.action(n), target: this.target(n), text: this.text(n), container: this.container, trigger: n, emitter: this });
            } }, { key: "defaultAction", value: function t(e) {
              return l("action", e);
            } }, { key: "defaultTarget", value: function t(e) {
              var n = l("target", e);if (n) return document.querySelector(n);
            } }, { key: "defaultText", value: function t(e) {
              return l("text", e);
            } }, { key: "destroy", value: function t() {
              this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null);
            } }], [{ key: "isSupported", value: function t() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                  n = "string" == typeof e ? [e] : e,
                  o = !!document.queryCommandSupported;return n.forEach(function (t) {
                o = o && !!document.queryCommandSupported(t);
              }), o;
            } }]), e;
        }(u.default);t.exports = p;
      });
    }, { "./clipboard-action": 7, "good-listener": 4, "tiny-emitter": 6 }] }, {}, [8])(8);
});
/*
Converts multi-line text into a list of lists (blocks).
all blank lines are removed.
*/

function makeBlocks(text) {
  /*
  Args
      text string, multiple lines
  Returns
      list of lists (see module docstring)
  */
  if (!text) {
    return;
  }
  if (typeof text !== 'string') {
    return;
  }
  var text_array = text.split('\n');
  var block_array = [];
  var line;

  for (var i = 0; i < text_array.length; i++) {
    line = text_array[i];
    //initializing the block delineator for empty list
    if (block_array.length <= 0) {
      block_index = 0;
    }

    //if line is blank, it's a block delineator
    if (line.trim().length <= 0) {
      //this check is performed every time there's a blank line
      //possible index error squashed by the change detector (later)
      if (block_array.length > 0) {
        block_index += 1;
      }
    } else {
      //else, line has content and it's part of a 'block'
      if (block_array.length <= 0) {
        //append the very first 'block', a list with first line
        block_array.push([line]);
      } else {
        //start/append new 'block' value OR add to last block
        if (block_index > block_array.length - 1) {
          // detect change and start a new block
          block_array.push([line]);
          // reset block_index
          block_index = block_array.length - 1;
          //continue
        } else {
          //else, add to last block
          block_array[block_index].push(line);
        }
      }
    }
  }
  return block_array;
}

/*Created on 7/25/17

@author: scraggo (github.com/scraggo)

Title: Subnotes - a plain text notes and tasks system
    see example below for the expected in format
    - spaces between each link determine 'blocks'
    - headers are the first line of a block or a single line.
*/

var Subnotes = function () {
  /*
  Subnotes takes your notes and subnotes in a simple format:
  a header line with lines (subnotes) right below and at least one line break in between
    
  - organizes the headers alphabetically.
  - puts all the 'done' items at the bottom with a time stamp.
  - tag filter allows user to display their choice of tags within their text.
  */

  function Subnotes(input_text) {
    _classCallCheck(this, Subnotes);

    this.input_text = input_text;
    this.block_list = makeBlocks(this.input_text);
    this.encoded_list = [];
    // this._spacing = spacing
    // this.set_spacing(this._spacing)
    // this.block_encoder()
    //CLASS VARIABLES
    this.TAG_REGEX = /\B@\S+/;
    this.LOWEST_CHAR = '~'.repeat(10);
    // LOWEST_CHAR = chr(1114111) * 2
  }

  /*
      set_spacing(this, new_spacing=4):
          const valid_spacing = [2,4,5];
          str_valid = ', '.join(str(x) for x in valid_spacing)
          if new_spacing in valid_spacing:
              this._spacing = new_spacing
          else:
              // raise ValueError('Spacing must be {} spaces.'.format(''.join(str_valid)))
              print('ERROR: Spacing must be {} spaces.\nQuitting.'.format(''.join(str_valid)))
              sys.exit()
          return this._spacing
  */


  _createClass(Subnotes, [{
    key: "block_encoder",
    value: function block_encoder() {
      /*
      Main function that appends dict objects to this.encoded_list as such:
      [
      {'project': '+projectB', 'done': ['    x note1B'], 'Subnote': ['    note2B']}, {'note': 'note all alone'},
      {'note': 'note with subnotes', 'Subnote': ['    note subnote1 @!', '    note subnote2']},
      {'project': '+projectA @!', 'Subnote': ['    note1A', '    note2A']}
      ]
       Properties used:
          block_list, encoded_list, spacing
      Returns:
          Sorted encodedf_list by 'header' (using sorted_blocks)
      */

      for (var i = 0; i < this.block_list.length; i++) {
        // arr[i] = 'hi';
        var block = this.block_list[i];
        // set default dictionary
        // headers are encoded as LOWEST_CHAR if first and only line is preceded by 'x'
        this.encoded_list.push({
          header: this.LOWEST_CHAR,
          data: [],
          tags: [],
          done: []
        });

        for (var j = 0; j < block.length; j++) {
          // arr[i] = 'hi';
          var line = block[j];
          // line = this.fix_spacing(line)
          // done items start with x
          if (line.trim().startsWith('x ')) {
            this.encoded_list[i].done.push(line);
          } else {

            if (line === block[0]) {
              // line is the 'header'
              this.encoded_list[i].header = line.trim();
            } else {
              // line is 'data'
              this.encoded_list[i].data.push(line);
            }
          }
          this.assignTagList(line, i);
        }
        this.assignCompletedProject(i);
      }
      // console.log(this.encoded_list);
      // this.encoded_list = this.sort_blocks(this.encoded_list)
    }
  }, {
    key: "assignTagList",
    value: function assignTagList(line, i) {
      var _this = this;

      var tagList = line.match(this.TAG_REGEX);
      // console.log(tagList);
      if (tagList) {
        tagList.forEach(function (tag) {
          return _this.encoded_list[i].tags.push(tag);
        });
      }
    }
  }, {
    key: "assignCompletedProject",
    value: function assignCompletedProject(i) {
      if (this.encoded_list[i].header === this.LOWEST_CHAR && this.encoded_list[i].data.length > 0) {
        this.encoded_list[i].header = '{Completed Project}';
      }
    }
  }]);

  return Subnotes;
}();

//   fix_spacing(this, f_text)
//     /*
//         1. Replaces tabs with class-defined spacing
//         2. Counts the leading spaces for an input string.
//         3. If spacing is inconsistent with spacing, two levels of indent are imposed.

//         Args:
//             f_text: a string of text
//         Returns:
//             a string with above operations
//         Raises:
//             sys.exit() if spacing is inconsistent
//         */

//     // if spaces % SPACING != 0:
//     //     print('WARNING - INCONSISTENT SPACING!\n>>>' + f_text)
//     //     print("has {} spaces. Convert to multiples of {} spaces.".format(spaces, SPACING))
//     //     sys.exit()

//     // convert tabs to spaces
//     line = f_text.replace('\t', ' ' * this._spacing)
//   // get number of leading spaces
//   spaces = len(f_text) - len(f_text.lstrip())
//   if spaces % 4 != 0
//     if spaces < 4
//     line = ' ' * 4 + line.trim()
//   else 
//     line = ' ' * 8 + line.trim()

//   return line

//   // @staticmethod
//   make_blocks(f_list)
//     /*
//     Args:
//         f_list: this is the user's text, list format, split by new line
//     Returns:
//         A list of lists where each list is determined by empty lines
//     */

//     return [list(g[1]) for g in itertools.groupby(f_list, key = lambda x: x.trim() != '') if g[0]]

//   // @staticmethod
//   sort_blocks(f_list)
//     /*
//     Sorts f_list by key ['header']
//     */

//     return sorted(f_list, key = lambda k: k['header'].lower())

//   return_all_tags(this)
//     /*
//     returns all the tags as a list, sorted in abc order with no duplicates
//     */

//     unsortedtags = []
//   for item in this.encoded_list
//     tagslist = item['tags']
//   if tagslist != []
//     for tag in tagslist
//     if tag not in unsortedtags
//     unsortedtags.push(tag)

//   return sorted(unsortedtags)

//   return_all_sorted(this)
//     /*returns all items sorted as a string for printing or clipboard.*/

//     allSorted = []
//   doneList = []

//   for item in this.encoded_list
//     header_exists = True

//   if item['header'] not in ['', this.LOWEST_CHAR]
//     allSorted.push('\n' + item['header'].rstrip())
//   else 
//     header_exists = False

//   if len(item['data']) > 0
//     if not header_exists
//     allSorted.push('')
//   for data_item in item['data']
//     allSorted.push(data_item.rstrip())

//   if len(item['done']) > 0
//     //append to separate list
//     doneList.push(item)

//   //put done items at end of list with timestamp

//   //prints the current date and time
//   allSorted.push('\n' + str(datetime.now()))

//   // append done items to list
//   for data in doneList
//     // if type(data['done']) == list
//     if data['header'] == this.LOWEST_CHAR or\
//   data['header'] == '{Completed Project}'
//   or\
//   len(data['header']) < 1
//     // print('header empty')//debug
//     for doneItem in data['done']
//     allSorted.push(doneItem.trim())
//   else 
//     allSorted.push(data['header'])
//   for doneItem in data['done']
//     // print('header not empty')//debug
//     allSorted.push(' ' * this._spacing + doneItem.trim())

//   return '\n'.join(allSorted)


//   tag_filter(this)
//     /*
//         Prints projects that contain f_tag input by user.
//         Done items with tags are not included.

//         Args:
//             encodedf_list: the encoded list
//         Returns:
//             None (only prints)
//         */

//     all_tags = this.return_all_tags()
//   if len(all_tags) < 1
//     print('No tags found.\n')
//   else 
//     print('Your Tags: ', end = '')
//   print(', '.join(all_tags))
//   print()
//   //get user input
//   f_tag = input('Tag to search (include @): ')
//   //filter by f_tag
//   filtered_tags = []
//   for encoded_item in this.encoded_list
//     for k, v in encoded_item.items()
//     if k == 'tags'
//     for str_tag in v
//     if str_tag.find(f_tag) > -1
//     filtered_tags.push(encoded_item['header'])
//   break

//   if len(filtered_tags) > 0
//     print()
//   print('*' * (20 + len(f_tag)))
//   print('Projects with tag: {}'.format(f_tag))
//   print('*' * (20 + len(f_tag)))
//   for header_tag in filtered_tags
//     print(header_tag)
//   print()
//   else 
//     print('No notes with {} tag found.\n'.format(f_tag))


// }

// // === end Subnotes class===
// // === start global functions ===

// function menu()
// /*
// Prints a menu, gets user choice input, returns input (string).
// */

// print('Choose from the following options:')
// print(''
//     '    1. Order your notes alphabetically.
//     2. Display priority tag(@!) notes.q.Quit ''
//     ')
//     f_choice = input('> ') return f_choice


//     function main()
//     os.system('cls'
//       if os.name == 'nt'
//       else 'clear')

//     while True
//     print('Welcome to Subnotes! ', end = '') choice = menu() if choice not in ['1', '2', '']
//     print('Thanks and goodbye!') break

//     print('Copy your notes to clipboard, enter when done:') user_pause = input('> ')
//     // todoTxt = pyperclip.paste()
//     // todoArray = todoTxt.split('\n')
//     // encodedTodos = []
//     // encodedTodos = blockEncoder(todoArray, encodedTodos)

//     my_todos = Subnotes(pyperclip.paste())

//     if choice in ['1', ''] //default if user presses enter
//     my_sorted = ''.join(my_todos.return_all_sorted())
//     // pprint(my_sorted)//debug
//     pyperclip.copy(my_sorted) print('\nYour sorted notes were copied to your clipboard.\n')

//     elif choice == '2'
//     my_todos.tag_filter()


//     main()