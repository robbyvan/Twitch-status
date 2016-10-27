$(document).ready(function (){
  var channels = ["freecodecamp", "riotgames", "blizzard", "dota2ti", "medrybw"];

  $('<ul id="channels"></ul>').appendTo("#content");

  channels.forEach(function(channel){
    $('<a id="' + channel + '" href="http://www.twitch.tv/' + channel + '">').appendTo('#channels');
    showUserInfo(channel);
    // showUserStatus(channel);

    /*'cuz used AJAX, the time when userInfo & streamInfo arrived are not ordered like 
    in loop here, i.e, not in pairs: user1 -> streamInfo1 -> user2 -> streamInfo2 ->
    Thats's why the output in console are out of order(however respectively in order .)
    So need figure out how to match them */

    // console.log(channelInfo);
    /*should not process data in another function, here it will print undefined
    Process the data in $.ajax().success() */
  });
});

function showUserInfo(channel){
  $.ajax({
    async:false,
    headers: {
      Accept: "application/vnd.twitchtv.v3+json"
    },
    url: "https://api.twitch.tv/kraken/users/" + channel +"?client_id=cqvrrm8zniwpbvkyxxl036y927jlm23",
    type: "GET",
    dataType: "json",
    success: function(response){
      console.log("ajax success");
      console.log(response);
      $('<li name="'+ response.name + '"><img src="' + response.logo + '" /><h2>' + response.display_name + '</h2><p>' + response.bio + '</p><i class="status fa fa-square"></i>').appendTo('#'+response.name);
    },
    error: function(error){
      console.log("ajax failed");
      console.log(error);
    }
  });
}

function showUserStatus(channel){
  $.ajax({
    async:false,
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
    url: "https://api.twitch.tv/kraken/streams/" + channel +"?client_id=cqvrrm8zniwpbvkyxxl036y927jlm23",
    type: "GET",
    dataType: "json",
    // jsonp: "callback",
    // jsonpCallback: "callbackFunction",
    /*jsonp is not always the correct choice, here if using jsonp will get 4+200+load error*/
    success: function(response){
      console.log("ajax success");
      console.log(response);
      showUserStatus();
    },
    error: function(error){
      console.log("ajax failed");
      console.log(error);
      return false;
    }
  });
}