var thrift = require('thrift');
var Paginator = require('./paginator.js');
var url = require('url');

exports.group = function(req, res, thrift_client, qry_str, page_no) {
   thrift_client.group_scenarios(qry_str, page_no, 40,  function(err, response) {
      if (err) {
         console.log(err);
      }
      else {
         var is_empty = true;
         var total_page = 0;
         var group_list = [];
         if (response.page_data && response.page_data.constructor === Array) {
            if (response.page_data.length > 0) {
                is_empty = false;
                group_list = response.page_data;
                total_page = response.total_pages;
            }
         }
       
         var pgr = new Paginator(page_no, total_page);
         var html_code = pgr.build({dir: 'search', params: [{key: 'q', value:qry_str}]});
         var hostname = req.protocol + '://' + req.get('host');
         res.render('search', {is_null_content: is_empty, crime: qry_str, 
                               group_list: group_list, paginator_html: html_code,
                               hostname: hostname});
      }
   });
}

exports.retrieve_docs = function(req, res, thrift_client, crime, data1, data2, page_no) {
   thrift_client.get_docs_of_sgroup(crime, data1, data2, page_no, 10, function(err, response) {
      if (err) {
         req.session.title = "错误信息提示";
         req.session.error = "获取文档列表失败";
         console.log('error:' + err.desc); 
         req.session.message = err.desc;
         res.redirect('/error');
      }
      else {
         if (response.page_data && response.page_data.constructor === Array) {
            var doc_list = [];
            var regexp = /^<([a-z_]+)>$|(^<\/[a-z_]+>$)|(^[     　 ]+$)|(^.+$)/mg;

            for( var i = 0; i < response.page_data.length; ++i) {
               var doc_info  = {}; 
               var years = 0;
               var months = 0;
               doc_info.docid = response.page_data[i].docid;
               doc_info.duration = response.page_data[i].sentences[0].duration;

               months = doc_info.duration % 12;
               years = Math.floor(doc_info.duration / 12);
               doc_info.duration = "";
               if (years) {
                  doc_info.duration += years + '年';
               }
               if (months) {
                  doc_info.duration += months + '月';
               }
               if (!years && !months) {
                  doc_info.duration = '免予处罚';
               }

               doc_info.name = response.page_data[i].name;
               doc_info.date = response.page_data[i].date;
               doc_info.court_name = response.page_data[i].court_name;
               doc_info.kind = response.page_data[i].kind;
               doc_info.full_text = response.page_data[i].full_text;
               doc_list.push(doc_info);
            }

            for (var i = 0; i < doc_list.length; ++i) {
               var match;
               var inner_html = "";
               while( (match = regexp.exec(doc_list[i].full_text)) != null ) {
                  if (match[1] !== undefined) {
                     var tag_name = match[1];
                     if (tag_name === 'begin') {
                        tag_name = 'header';
                     }
                     else if (tag_name === 'end') {
                        tag_name = 'footer';
                     }
                     else if (tag_name === 'judgement') {
                        tag_name = "sentence";
                     }

                     inner_html += '<div class="chapter ' + tag_name + '">';
                  }
                  if (match[2] !== undefined) {
                     inner_html += '</div>\n';
                  }
                  if (match[4] !== undefined) {
                     inner_html += '<p>' + match[4] + '</p>';
                  } 
               }
               delete doc_list[i].full_text;
               doc_list[i].inner_html = inner_html; 
            }
         
            var pgr = new Paginator(page_no, response.total_pages);
            var html_code = pgr.build({dir:'docs', params: [{key: 'q', value: crime}, 
                                                            {key: 'd1', value: data1}, 
                                                            {key: 'd2', value: data2}]
                                      });

            var hostname = req.protocol + '://' + req.get('host');
            res.render('docs', {is_null_content: doc_list.length === 0, 
                                doc_list: doc_list, paginator_html: html_code, hostname: hostname});
         }
      }
   });
}
