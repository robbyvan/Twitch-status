$(document).ready(function (){
  var channels = ["freecodecamp", "riotgames", "blizzard", "medrybw", "dota2ti"];

  channels.forEach(function(channel){
    var channelInfo = getChannelInfo(channel);
    console.log(channelInfo);
  });

});

function getChannelInfo(channel){
  $.ajax({
    headers: {
      Accept: "application/vnd.twitchtv.v3+json"
      //,"Client-ID": "<cqvrrm8zniwpbvkyxxl036y927jlm23>"
      //"Client-ID": "cqvrrm8zniwpbvkyxxl036y927jlm23"
      //"client_id": "<cqvrrm8zniwpbvkyxxl036y927jlm23>"

      /*Somehow all commented lines above does not work, 
      though Twitch says include client id in the header should be like this: 
            Client-ID: <client_id>
      But I still get 400 error (Bad request) says "No client id specified" 
      No idea why this happens.
      If add "?client_id=cqvrrm8zniwpbvkyxxl036y927jlm23" to the URL, 
      then it works. Maybe figure this out later*/

    },
    url: "https://api.twitch.tv/kraken/channels/" + channel +"?client_id=cqvrrm8zniwpbvkyxxl036y927jlm23",
    type: "GET",
    dataType: "json",
    // jsonp: "callback",
    // jsonpCallback: "callbackFunction",
    /*jsonp is not always the correct choice, here if using jsonp will get 4+200+load error*/
    success: function(r){
      console.log("ajax success");
      console.log(r);
      return r;
    },
    error: function(e){
      console.log("ajax failed");
      console.log(e);
      return false;
    }
  });
}