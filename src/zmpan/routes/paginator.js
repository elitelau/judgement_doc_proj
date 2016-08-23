/*
 *  refer to : https://github.com/deoxxa/paginator
 */

module.exports = Paginator;

function Paginator(page_no, total_page) {
    this.page_no = page_no;
    this.total_page =total_page;
    /*
    this.per_page = per_page || 40;
    // maximum with 13 button: prev  1 2 3 4 5 6 7 8... 63 64 next (13 buttons)
    // when navigating on page 6
    this.length = length || 0;
    this.total_page = Math.ceil(length / per_page); 

    this.get_total_page = function() {
        return this.total_page;
    }
    */

    this.set_param = function(page_no, total_page) {
       this.page_no = page_no;
       this.total_page =total_page;
    }

    this.gen_html = function(page_btn_list, crime) {
       var btn_array = [];
       for (var i = 0; i < page_btn_list.length; ++i) {
          switch(page_btn_list[i].page) {
          case -1:
          case -100:
             btn_array.push(new SentinelButton(page_btn_list[i].page, 
                                               page_btn_list[i].focus,
                                               page_btn_list[i].enable)); 
             break;
          default:
             if (page_btn_list[i].deleted === undefined) {
                btn_array.push(new Button(page_btn_list[i].page, 
                                          page_btn_list[i].focus,
                                          page_btn_list[i].enable)); 
             }
          }
       }
       var html_code = '';
       for(var i = 0; i < btn_array.length; ++i) {
          html_code += btn_array[i].get_html_code(crime, this.page_no) + '\n';
       }

       return html_code;
    }
}

Paginator.prototype.build = function(url_param) {
    var page_btn_list = [];   // with elements {num: 0, focus: true}
    var PAGE_DISTANCE = 5;
    var HALF_PAGE_DISTANCE = 3;

    if (this.page_no < 1) {
        this.page_no = 1;
    }

    if (this.page_no > this.total_page) {
        this.page_no = this.total_page;
    }

    // previous button
    page_btn_list.push({page: -1, enable: true}); 

    if (this.page_no <= 1) {
        page_btn_list[0].enable = false;
    }

    // setup paginator buttons from page 1 to current page 
    var prev_dist = HALF_PAGE_DISTANCE;
    if (this.page_no <= PAGE_DISTANCE) {
       for (var i = 1; i <= this.page_no; ++i) {
          page_btn_list.push({page: i, enable: true});
       }
       prev_dist = Math.min(HALF_PAGE_DISTANCE, this.page_no);
    }
    else {
       for (var i = 1; i <= 2; ++i) {
          page_btn_list.push({page: i, enable: true});
       }

       page_btn_list.push({page:0, enable: true}); // 0 stands for '..'

       for (var i = this.page_no - 2; i <= this.page_no; ++i) {
          page_btn_list.push({page: i, enable: true});
       }
    }
    page_btn_list[page_btn_list.length-1].focus = true;

    var up_bound = 0;
    if (prev_dist >= HALF_PAGE_DISTANCE) {
       up_bound = Math.min(this.page_no + 2, this.total_page);
    }
    else {
       up_bound = Math.min(PAGE_DISTANCE, this.total_page);
    }

    // setup paginators from current page to last page
    for (var i = this.page_no + 1; i <= up_bound; ++i) {
       page_btn_list.push({page: i, enable: true});
    }

    if (up_bound < this.total_page) {
       page_btn_list.push({page:0, enable: true}); // 0 stands for '..'
       
       for (var i = Math.max(up_bound+1, this.total_page - 1); i <= this.total_page; ++i) {
          page_btn_list.push({page: i, enable: true});
       }
    }

    // elimination process
    // 1 2 .. 4 5 6 7 8  => 1 2 3 4 5 6 7 8  ( '..' => 3)
    //            ~                   ~
    // 1 2 .. 59 60 61 62 63 .. 64  ( delete '..')
    //
    for (var i = 0; i < page_btn_list.length; ++i) {
       if (page_btn_list[i].page === 0) {
          if (page_btn_list[i+1].page - page_btn_list[i-1].page === 2) {
             page_btn_list[i].page = page_btn_list[i-1].page + 1;
          }
          else if (page_btn_list[i+1].page - page_btn_list[i-1].page == 1) {
             page_btn_list[i].deleted = true;  
          }
       }
    }
    
    // next page button
    page_btn_list.push({page: -100, enable: true});
    if (this.page_no >= this.total_page) {
       page_btn_list[page_btn_list.length-1].enable = false;
    }

    Button.prototype.dir = url_param.dir;
    Button.prototype.url_params = url_param.params;

    // print_array(page_btn_list);
    var html_code = this.gen_html(page_btn_list);
    return html_code;
}

function Button(number, focus) {
   this.number = number;
   this.focus = focus;
}

Button.prototype.get_html_code = function(cur_page_no) {
   if (this.number === 0) {
      return '<span class="disabled">...</span>';
   }

   if (this.focus !== undefined && this.focus) {
      return '<em class="current">' + this.number + '</em>'; 
   }

   var html_code = '<a href="/' + this.dir + '?' + this.url_params[0].key + '=' + this.url_params[0].value;
   for (var i = 1; i < this.url_params.length; ++i) {
      html_code += '&' + this.url_params[i].key;
      html_code += '=' + this.url_params[i].value;
   }
   html_code += '&p=' + this.number + '">' + this.number + '</a>';
   return html_code;
}

function SentinelButton(number, focus, enable) {
   this.number = number;
   this.focus = focus;
   this.enable = enable;
}

SentinelButton.prototype = new Button();

SentinelButton.prev_button_label = "Preivous";
SentinelButton.next_button_label = "Next";

SentinelButton.prototype.get_html_code = function(crime, cur_page_no) {
   var link_page_no = cur_page_no;
   var class_name = "previous_page";
   var label = '';

   if (this.number === -1) {
      link_page_no = cur_page_no - 1;
      label = SentinelButton.prev_button_label;
   }
   if (this.number === -100) {
      class_name = "next_page";
      link_page_no = cur_page_no + 1;
      label = SentinelButton.next_button_label;
   }
   if (this.enable) {
      var html_code = '<a class="' + class_name + '" href="/' + 
                      this.dir + '?' + this.url_params[0].key + '=' + this.url_params[0].value;
      for (var i = 1; i < this.url_params.length; ++i) {
         html_code += '&' + this.url_params[i].key;
         html_code += '=' + this.url_params[i].value;
      }
      html_code += '&p=' + link_page_no + '">' + label + '</a>';
      return html_code;
   }
  
   return '<span class="' + class_name + ' disabled">' + label + '</span>';
}


function print_array(page_btn_list) {
   var str = "";
   for (var i = 0; i < page_btn_list.length; ++i) {
      switch(page_btn_list[i].page) {
      case 0:
         if (page_btn_list[i].deleted === undefined)
         {
            str += '..';
         }
         else if (page_btn_list[i].deleted) {
            ;  // do nothing for deleted item
         }
         else {
            console.log('error');
         }
         break;
      case -1: 
         if (page_btn_list[i].enable) {
            str += 'prev';
         }
         else {
            str += '!prev';
         }
         break;
      case -100:
         if (page_btn_list[i].enable) {
            str += 'next';
         }
         else {
            str += '!next';
         }
         break;
      default:
         //if (!page_btn_list[i].enable) {
         //   console.log(page_btn_list);
         //   process.exit(1);
         //}
         console.assert(page_btn_list[i].enable);
         if (page_btn_list[i].focus === undefined) {
            str += page_btn_list[i].page;
         }
         else {
            str += "["  + page_btn_list[i].page + "]";
         }
      }
      str += " ";
   }
   console.log(str);
}

// var pgr = new Paginator(1, 64);
// pgr.build();
