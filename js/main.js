$(function() {
    $('.order-card-text').matchHeight({byRow: true});

    $('.hero .cta').click(function() {
        var anchor = $("#order");
        $('html,body').animate({'scrollTop' : anchor.offset().top}, 900);
    });

    $('.play-video').click(function (e) {
      var video = $(this).data('video');
      modal.openModal(video);
      e.preventDefault();
    });
});

//
// Scroll desk
//

// States:
// 0 = rest
// 1 = rotating to user
// 2 = adjusting height
// 3 = rotating away from user
window.scrollDesk = {
  state: 0,
  position: 1,
  transitioning: false,
}

$(document).on('click', '#scroll-desk-up', function(event) {
  if(window.scrollDesk.position < 7) {
    updateScrollDeskPosition(window.scrollDesk.position + 1);
  }
});

$(document).on('click', '#scroll-desk-down', function(event) {
  if(window.scrollDesk.position > 1) {
    updateScrollDeskPosition(window.scrollDesk.position - 1);
  }
});

$(document).on('input', '#scroll-desk-position', function(event) {
  new_value = parseInt($('#scroll-desk-position').val())
  if (new_value > 7) {
    updateScrollDeskPosition(7);
  } else if (new_value < 1) {
    updateScrollDeskPosition(1);
  } else if (1 <= new_value && new_value <= 7){
    updateScrollDeskPosition(new_value);
  }
});

function updateScrollDeskPosition(new_position) {
  if(window.scrollDesk.state < 2) {
    // Only allow updates while in state 0 or 1
    window.scrollDesk.position = new_position;
    if($("#scroll-desk-position").val() != new_position) {
      $("#scroll-desk-position").val(new_position);
    }
  }
  if(window.scrollDesk.state == 0) {
    scrollDeskNextState();
  }
}

function scrollDeskNextState() {
  if(!window.scrollDesk.transitioning) {
    window.scrollDesk.transitioning = true;

    var position = window.scrollDesk.position,
        positionLabel = $("#scroll-desk-position-label"),
        heightLabel = $("#scroll-desk-position-height"),
        deskTop = $("#desk-top"),
        left = parseInt(deskTop.css("left")),
        bottom = parseInt(deskTop.css("bottom"));

    var rotateUp = 8,
        rotateLeft = 17,
        stepUp = 10,
        stepLeft = -3.5;

    switch(window.scrollDesk.state) {
      case 0: // Rotating towards user
        window.scrollDesk.state = 1;
        deskTop.css({
          "transform": "rotate(7deg)",
          "left": left + rotateLeft,
          "bottom": bottom + rotateUp,
        });
        waitForNextStep()
        break;
      case 1: // Adjusting height
        window.scrollDesk.state = 2;
        deskTop.css({
          "left": 46 + stepLeft * (position-1) + rotateLeft,
          "bottom": 50 + stepUp * (position-1) + rotateUp,
        });
        waitForNextStep()
        break;
      case 2: // Rotating away from user
        window.scrollDesk.state = 3;
        deskTop.css({
          "transform": "rotate(0deg)",
          "left": left - rotateLeft,
          "bottom": bottom - rotateUp,
        });
        waitForNextStep()
        break;
      case 3: // After last step, reset to rest position
        window.scrollDesk.state = 0;
        window.scrollDesk.transitioning = false;
        positionLabel.text(window.scrollDesk.position);
        heightLabel.text(Math.round(64+3.333*(window.scrollDesk.position-1)));
        break;
    }
  }
}

function waitForNextStep() {
  // Needs the setTimeout
  window.setTimeout(function() {
    $("#desk-top").on("transitionend", function() {
      if(window.scrollDesk.transitioning) {
        // Must turn the event off so we don't trigger multiple times
        $("#desk-top").off("transitionend")
        window.scrollDesk.transitioning = false;
        scrollDeskNextState();
      }
    });
  }, 0);
}
