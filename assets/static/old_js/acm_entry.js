

$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function(i, val)
  {
    // console.log(val);
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
    $("#nav_entry").addClass("active");

    //Display new selected units
    $("a.numeric_units_selector").click(function(){
      $($(this).parents()[1]).siblings().html($(this).text() + "<span class=\"caret\"></span>");
    });


    //
    $("#preview_submission").click(function(event)
    {
      $("div#main").hide();


      //Create preview data
      var numeric_preview_data = {};
      $("button#numeric_units_selected").each(function() {
        var this_input = $(this).parent().siblings(":text");
        if(this_input.val())
        {
          numeric_preview_data[this_input.attr("name")] = this_input.val() + ' ' + $(this).text();
        }
      });

      //Fill Preview Table
      complete_preview_data = $('#my_form').serializeObject();

      //Add units to Numeric Data
      $.each(numeric_preview_data, function(key,val) {
        complete_preview_data[key] = numeric_preview_data[key];
      });

      var preview_table = $('<table></table>').addClass('table');
      preview_table.append('<thead><tr><th>Field</th><th>Value</th></tr>');
      $.each(complete_preview_data, function(key, val) {
        preview_table.append("<tr><td>" + key + "</td><td>" + val + "</td></tr>");
      })
      $("div#results_table").append(preview_table);
      $("div#confirm").show();


    });

    // Add a custom field


    // $("#add_custom_field").click(function(event)
    // {
    //     $('#my_form').append('<hr><div class="control-group form-group"><label for="custom_field_name" class="control-label">Custom Field Name:</label><input type="text" name="custom_field_name" ng-model="custom_field_name" class="form-control"/><label for="{{key}}" class="control-label ng-bin" ng-bind="custom_field_name">{{key}}:</label><div class="controls"></div><input type="text" name="{{key}}" class="form-control"/></div>');
    //
    // });

    $("#confirm_submission").click(function(event)
    {
        // var output_dict = $('#my_form').serializeObject();
        // console.log(output_dict);
      data['data_serialize_object'] = JSON.stringify($('#my_form').serializeObject());
      data['data_serialize'] = JSON.stringify($('#my_form').serialize());
      data['data_serialize_array'] = JSON.stringify($('#my_form').serializeArray());
      data['form_name'] = $('p[name=form_name]').text();
      data['preview_data'] = JSON.stringify(complete_preview_data);

      //New form data here:


      var serialized_data = $('#my_form').serializeArray();
      var structured_data = {};
      for (var i in serialized_data) {
          var this_dict = serialized_data[i];
          console.log(i);
          structured_data[this_dict["name"]] = {};
          structured_data[this_dict["name"]]["value"] = this_dict["value"];
      }
      data['structured_data'] = JSON.stringify(structured_data);

    //   var order_count = 0;
    //   $(".form-group").each()





      //NEVER FORGET HOW TORNADO ADDS COOKIES!!!
      data._xsrf = document.cookie.match("\\b" + name + "=([^;]*)\\b")[1];
      $.post( "/entry", data ,
      function(data)
      {
        window.location.href = "/home";
        $("#info").val("Upload complete.");

      });

    });

    $("#cancel_submission").click(function(event)
    {
      $("#main").show();
      $("#confirm").hide();
      $("div#results_table").empty();




    });


  });
