$(document).ready(function (){
  var channels = ["freecodecamp", "riotgames", "blizzard", "dota2ti", "medrybw"];

  $('<ul id="channels"></ul>').appendTo("#content");
  channels.forEach(function(channel){
    $('<a id="' + channel + '" href="http://www.twitch.tv/' + channel + '" class="user">').appendTo('#channels');
    showUserInfo(channel);
    showUserStatus(channel);
  });

  $(document).keypress(function(e){
    
  });

  $('.navbutton').on("click", function(event){
    if ($(this).hasClass('allusers')) {
      console.log(this);
      $('.user').removeClass('hideme')
    }else if($(this).hasClass('onlinebtn')){
      console.log(this);
      $('.online').removeClass('hideme');
      $('.offline').addClass('hideme');
    }else if($(this).hasClass('offlinebtn')){
      console.log(this);
      $('.offline').removeClass('hideme');
      $('.online').addClass('hideme');
    }
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
      $('<li><img src="' + response.logo + '" /><h2>' + response.display_name + '</h2><p>' + response.bio + '</p><i class="status fa fa-square"></i>').appendTo('#'+response.name);
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
    },
    url: "https://api.twitch.tv/kraken/streams/" + channel +"?client_id=cqvrrm8zniwpbvkyxxl036y927jlm23",
    type: "GET",
    dataType: "json",
    success: function(response){
      console.log("ajax success");
      console.log(response);
      if (response.stream !== null) {
        // document.getElementById(channel).getElementsByTagName("i")[0].className += " online";
        document.getElementById(channel).className += " online";
      }else{
        // document.getElementById(channel).getElementsByTagName("i")[0].className += " offline";
        document.getElementById(channel).className += " offline";
      }
    },
    error: function(error){
      console.log("ajax failed");
      console.log(error);
      return false;
    }
  });
}