//
// Region detection
//

function changeRegion(region) {
  if (window.region != region) {
    $(document).trigger('changeRegion', region);
  }
  window.region = region;
  console.log("Region:", window.region);
}

function toggleShowClass(region) {
  $("[data-show]").each(function(idx, element) {
    if($(element).data("show") == region) {
      $(element).show()
    } else {
      $(element).hide()
    }
  })
}

$(document).on('changeRegion', function(event, region) {
  if (region == "US") {
    regionImage = "/images/us.png";
    $("[data-us-content]").each(function(idx, element) {
      $(element).html($(element).data("us-content"))
    })

    $("[data-us-link]").each(function(idx, element) {
      $(element).attr("href", $(element).data("us-link"))
    })

    toggleShowClass("us");
  } else {
    regionImage = "/images/eu.png";
    $("[data-eu-content]").each(function(idx, element) {
      $(element).html($(element).data("eu-content"))
    })

    $("[data-eu-link]").each(function(idx, element) {
      $(element).attr("href", $(element).data("eu-link"))
    })

    toggleShowClass("eu");
  }
  $("#regionSelector").attr("src", regionImage);
})

$(document).on("ready", function() {
  //changeRegion("EU"); // Default to EU
  changeRegion("US");
})

function geocallback(data) {
  country_code = data.country_code;
  // US and CA will get the US localised version
  /*if (country_code == "US" || country_code == "CA") {
    changeRegion("US");
  }*/
}

// IP in the us for testing:
// $.get("https://freegeoip.io/json/8.8.8.8?callback=geocallback")
$.get("https://freegeoip.io/json/?callback=geocallback")

$(document).on("click", "#regionSelector", function() {
  if (window.region == "US") {
    newRegion = "EU";
  } else {
    newRegion = "US";
  }
  changeRegion(newRegion);
})
