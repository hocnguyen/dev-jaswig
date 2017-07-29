---
# Dont delete this line. This main JS file needs this front matter
---
{% include_relative vendor/jquery.matchHeight.min.js %}
{% include_relative instagram.js %}
{% include_relative scrolldesk.js %}
{% include_relative region.js %}
{% include_relative videomodal.js %}

$(document).on('ready', function() {
  $('.order-card-text').matchHeight({byRow: true});
});

$(document).on('click', '.hero .cta, .mobile-content .cta', function(event) {
  /*event.preventDefault();
  var anchor = $("#order");
  $('html,body').animate({'scrollTop' : anchor.offset().top}, 900);*/
});

var request;
$(document).on('click', '.mobile .sign_up, .desktop .sign_up', function(event) {
  var that = $(this);
  var email = that.prev().val();
  if (validateEmail(email)) {
    that.attr("disabled","disabled");
    if (request) {
      request.abort();
    }
    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycby3s4CEZZJZaHF0919GmsaOeu6NKz8u-aLcm7BqfeYNzFxfZ9U3/exec?Email="+email,
      //url: "https://script.google.com/macros/s/AKfycbx54z9FEpnt2U14TvhD-sbhj8nE_ye2Qu3d0Z0T-G1Pz-Zk9WIG/exec?email="+email,
      type: "get",
      dataType: "JSONP",
      success:function(json){
        $("#myModalLabel").html("Outstanding");
        showMsg("Be inspired by our health tips and we’ll send your tips very sporadically.");
        that.removeAttr("disabled");
        that.prev().val("");
      },
      error: function(xhr, status, error) {
        // 200 : firefox ; 404 error MIME in chrome; save and send mail success
        if (xhr.status == 200 || xhr.status == 404) {
          $("#myModalLabel").html("Outstanding");
          showMsg("Be inspired by our health tips and we’ll send your tips very sporadically.");
          that.removeAttr("disabled");
          that.prev().val("");
        }
      }
    });
  } else {
    $("#myModalLabel").html("Whoops");
    if (email == "") {
      showMsg("Something went wrong. Please input your email address again.");
    } else {
      showMsg("Something went wrong. Please make sure you entered the correct email.");
    }
  }
});

$(document).on('submit', '#register_form', function(event) {
  var that = $(this);
  var fname = that.find("input[name='first_name']").val();
  var lname = that.find("input[name='last_name']").val();
  var street = that.find("input[name='street']").val();
  var city = that.find("input[name='city']").val();
  var country = that.find("select[name='country']").val();
  var states = that.find("select[name='states']").val();
  var zip = that.find("input[name='zip_code']").val();
  var email = that.find("input[name='email']").val();
  var phone = that.find("input[name='phone']").val();
  var purchase = that.find("select[name='purchase']").val();
  if (request) {
    request.abort();
  }
  var param = "First Name="+fname+"&Last Name="+lname+"&Email="+email+"&Street="+street+"&City="+city+"&State="+states+"&Zip="+zip+"&Country="+country+"&Phone number="+phone+"&Purchased at="+purchase;
  request = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbzgL5FdyskW1IGnS2JYre4AY7lOlzPuW171OKIMGKBiIeEmhX8/exec?"+param,
    type: "get",
    dataType: "JSONP",
    success:function(json){
      $("#myModalLabel").html("Register Jaswig ");
      showMsg("You had register success on Jaswig, thank you! ");
    },
    error: function(xhr, status, error) {
      if (xhr.status == 200 || xhr.status == 404) {
        $("#myModalLabel").html("Register Jaswig ");
        showMsg("You had register success on Jaswig, thank you! ");

      }
    }
  });
  
  return false;
});

function showMsg(msg) {
  $(".content_msg").html(msg);
  $('#myModal').modal("show");
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}