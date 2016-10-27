$(document).ready(function (){
  $.ajax({
    headers: {
      Accept: "application/vnd.twitchtv.v3+json",
    },
    url: "https://api.twitch.tv/kraken/streams/test_channel",
    type: "GET",
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "callbackFunction",
    success: function(r){
      console.log("ajax success");
      console.log(r);
    },
    error: function(e){
      console.log("ajax failed");
      console.log(e);
    }
  });
});