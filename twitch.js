//default current tab: All
//div: inside
//i..
//classes..
//current tab bg
//bio should not be in the a: <li><a><img><h2></h2><i></i></a><p></p></li>
var currTab = "user";
//channels
var channels = ["freecodecamp", "medrybw", "riotgames", "blizzard", "dota2ti"];

$(document).ready(function (){
  //get info from twitch and display them on page
  $('<ul id="channels"></ul>').appendTo("#content");
  channels.forEach(function(channel){
    $('<li id="' + channel + '" class="user"><div class="insideli"><a href="http://www.twitch.tv/' + channel + '"></a></div></li>').appendTo('#channels');
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

    $(".navbutton").each(function(index, elem){
      $(elem).removeClass('currentTab');
    });
    $(this).addClass('currentTab');

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
      $('<img src="' + response.logo + '" /><h2 id="username">' + response.display_name + '</h2><i class="status fa"></i><div class="clear"></div>').appendTo($('#'+response.name).find("a"));
      $('<p id="bio"> Bio: ' + response.bio + '</p>').appendTo($('#'+response.name).find(".insideli"));
    },
    error: function(error){
      console.log("ajax failed");
      console.log(error);
      $("<h1>Sorry, request Time out.</h1>").appendTo($('#'+response.name).find("a"));
    }
  });
}

function showUserStatus(channelName){
  $.ajax({
    async:false,
    headers: {
      Accept: "application/vnd.twitchtv.v3+json"
    },
    url: "https://api.twitch.tv/kraken/streams/" + channelName +"?client_id=cqvrrm8zniwpbvkyxxl036y927jlm23",
    type: "GET",
    dataType: "json",
    success: function(response){
      console.log("ajax success");
      console.log(response);
      if (response.stream !== null) {
        // document.getElementById(channel).getElementsByTagName("i")[0].className += " online";
        document.getElementById(channelName).className += " online";
        $('#' + channelName).find("i").addClass("fa-toggle-on");
        // $(document.getElementById(channelName)).find("i").addClass("fa-toggle-on");
      }else{
        // document.getElementById(channel).getElementsByTagName("i")[0].className += " offline";
        document.getElementById(channelName).className += " offline";
        $('#' + channelName).find("i").addClass("fa-toggle-off");
        // $(document.getElementById(channelName)).find("i").addClass("fa-toggle-off");
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
    $.each( $('#channels li'), function(index, elem){
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