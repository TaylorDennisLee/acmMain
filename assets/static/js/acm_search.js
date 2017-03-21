

$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function(i, val)
  {
    console.log(val);
    if (o[this.name])
    {
      if (!o[this.name].push)
      {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } 
    else
    {
      o[this.name] = this.value || '';
    }
 });
 return o;
};



function getCookie(name)
{
  var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r[1];
}

$(document).ready(function () {

    var data  = {};
    var my_custom_data = {};
    var complete_preview_data = {};

    //Hide confirm entry page
    $("div#confirm").hide();

    //Highlight Entry tab of Navbar
    $("#nav_search").addClass("active");




      

  });