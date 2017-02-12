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
$(document).on('click', '.sign_up', function(event) {
  var that = $(this);
  var email = $(".txtemail").val();
  if (validateEmail(email)) {
    that.addClass("loading_bg");
    that.attr("disabled","disabled");
    if (request) {
      request.abort();
    }
    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbx54z9FEpnt2U14TvhD-sbhj8nE_ye2Qu3d0Z0T-G1Pz-Zk9WIG/exec?email="+email,
      type: "get",
      dataType: "jsonp",
      success:function(json){
        showMsg("You had sign up email with Jaswig site success! Thank you!");
        that.removeClass("loading_bg");
        that.removeAttr("disabled");
        that.prev().val("");
      },
      error: function(xhr, status, error) {
        if (xhr.status == 200) {
          showMsg("You had sign up email with Jaswig site success! Thank you!");
          that.removeClass("loading_bg");
          that.removeAttr("disabled");
          that.prev().val("");
        }
      }
    });
  } else {
    showMsg("Please sure you had inputted correct email!");
  }

});
function showMsg(msg) {
  $(".content_msg").html(msg);
  $('#myModal').modal("show");
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}