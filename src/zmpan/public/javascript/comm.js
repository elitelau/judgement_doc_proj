function validateForm() {
   var str = document.getElementById("form_query_string").value;
   var ret = true;
   if (str === "") {
      document.getElementById("form_query_string").value = "故意伤害罪";
   }
   else if (/^[\u4E00-\u9FFF]+罪$/.test(str)) {
      ;
   }
   else {
      ret = false;
   }

   if (!ret) {
      alert("请输入正确的罪名信息");
   }
   return ret;
}

function scrollDocToChapter(doc, ch_name, duration) {
   var href_elem = $(doc).find("." + ch_name).eq(0);
   var target_elem = undefined;
   if (href_elem) {
      target_elem = href_elem.get(0);
   }

   if (target_elem) {
      var top = $(target_elem).position().top;
      top += $(doc).scrollTop();
      $(doc).animate({scrollTop: top}, duration);
   }
}
