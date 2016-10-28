//default current tab: All
var currTab = "user";
//channels
var channels = ["freecodecamp", "riotgames", "blizzard", "dota2ti", "medrybw"];

$(document).ready(function (){
  //get info from twitch and display them on page
  $('<ul id="channels"></ul>').appendTo("#content");
  channels.forEach(function(channel){
    $('<a id="' + channel + '" href="http://www.twitch.tv/' + channel + '" class="user">').appendTo('#channels');
    showUserInfo(channel);
    showUserStatus(channel);
  });
  //when user type in, only display channels match the input
  $(document).keyup(function(e){
    filterUser();
  });
  //when user click tab above, only display channels match the channel status
  $('.navbutton').on("click", function(event){
    // $('.search').val("");
    if ($(this).hasClass('allusers')) {
      console.log(this);
      currTab = "user";
      $('.user').removeClass('hideme')
    }else if($(this).hasClass('onlinebtn')){
      console.log(this);
      currTab = "online";
      $('.online').removeClass('hideme');
      $('.offline').addClass('hideme');
    }else if($(this).hasClass('offlinebtn')){
      console.log(this);
      currTab = "offline";
      $('.offline').removeClass('hideme');
      $('.online').addClass('hideme');
    }
    filterUser();
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
      $('<li><img src="' + response.logo + '" /><h2 id="username">' + response.display_name + '</h2><p id="bio">' + response.bio + '</p><i class="status fa fa-square"></i>').appendTo('#'+response.name);
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

function filterUser(){
  $('#channelFind').empty();
  var channelFind = 0;
  var searchField = $('.search').val();
  // if(searchField !== ""){
    var myExp = new RegExp(searchField, "i");
    $.each( $('.user'), function(index, elem){
      // console.log(index);
      if ($(elem).hasClass(currTab)) {
        console.log(elem);
        console.log(elem.getElementsByTagName('h2')[0]);
        if ($(elem.getElementsByTagName('h2')[0]).html().search(myExp) === -1 && $(elem.getElementsByTagName('p')[0]).html().search(myExp) === -1){
          $(elem).addClass('hideme');
          console.log(elem + "is gonna hide");
        }else{
          $(elem).removeClass('hideme');
          channelFind++;
        }
      }
    });
  // } seems that every string matches "".
  $('<p class="channelFind">' + channelFind + ' Channel(s) found</p>').appendTo("#channelFind");
}