var registerToVote = {

  // see server.rb - performance platform url
  urlUsers: '/register-to-vote-users',
  urlSatisfaction: '/register-to-vote-satisfaction',

  // array to hold 2 realtime user values
  usersCount: [],

  loadUsers: function() {
    // clear the users array
    registerToVote.usersCount.length = 0;
    loadUrl = registerToVote.urlUsers;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        registerToVote.populateUsers(d);
      }
    });
  },

  populateUsers: function(d) {
    var i, _i;
    for (i=0, _i=d.data.length; i<_i; i++) {
      registerToVote.usersCount.push(d.data[i].unique_visitors)
    }
    // update the display
    registerToVote.updateUsersDisplay();
  },

  updateUsersDisplay: function() {
    var r = getRandomInt(0, registerToVote.usersCount.length);
    $('.register-to-vote .users-count').text(registerToVote.usersCount[r]);
  },

  loadSatisfaction: function() {
    loadUrl = registerToVote.urlSatisfaction;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        renderVoteSatisfaction(d);
      }
    });
  },

};

var offlineRegisterToVote = {

  startCounter: 0,

  initDisplay: function() {

    var now = new Date;
    now.setTime(Date.now());
    var hour = now.getHours();
    var min = now.getMinutes();
    var tempDate = new Date;

    // loop through the data set and match the time as closely as possible.
    for (var i = 0; i < d.length; i++) {
      tempDate.setTime(Date.parse(d[i]._timestamp));
      tempHour = tempDate.getHours();

      if (tempHour === hour) {
        tempMin = tempDate.getMinutes();
        if (tempMin === min) {
          offlineRegisterToVote.startCounter = i;
          break;
        }
        // catch and go back 1 if we've shot over the nearest minutes
        if (tempMin > min) {
          offlineRegisterToVote.startCounter = i-1;
          break;
        }
      }
    }

    // display the figure
    offlineRegisterToVote.updateUsersDisplay(d[offlineRegisterToVote.startCounter].unique_visitors);

    // and do the pie chart
    renderVoteSatisfaction(register_to_vote_satisfaction_json);

  },

  incrementUsers: function() {
    if (offlineRegisterToVote.startCounter === d.length) {
      offlineRegisterToVote.startCounter = 0;
    } else {
      offlineRegisterToVote.startCounter++;
    }
    // display the updated figure
    offlineRegisterToVote.updateUsersDisplay(d[offlineRegisterToVote.startCounter].unique_visitors);
  },

  updateUsersDisplay: function(txt) {
    $('.users-count').text(addCommas(txt));
  }

};

var renderVoteSatisfaction = function(d) {

  var min = 1;
  var max = 5;
  var score = 0;
  for (var i = min; i <= max; i++) {
    score += (d.data[0]['rating_' + i + ':sum'] * i);
  }
  var mean = score / d.data[0]['total:sum'];

  var percent = (mean - min) / (max - min) * 100;
  percent = Math.round( percent * 10 ) / 10
  
  $('.register-to-vote .user-satisfaction').text(percent);
  var el = $('.register-to-vote .user-satisfaction-pie');
  var measure = el.width() / 2;
  renderPie($('.register-to-vote .user-satisfaction-pie').get(0), measure, measure, measure, [percent, 100 - percent], ["#fff", "transparent"], "#FF9900");
}

$(function() {
  if (typeof offline !== 'undefined') {

    d = tax_disc_users_json.data;

    offlineRegisterToVote.initDisplay(d);

    // ...and simply increment once every 2 mins to (almost) match JSON data
    var update = window.setInterval(offlineRegisterToVote.incrementUsers, 2*60*1000);

  } else {

    registerToVote.loadUsers();
    registerToVote.loadSatisfaction();
    // set up a "wobble"
    var registerToVoteWobble = window.setInterval(registerToVote.updateUsersDisplay, 10e3);
    // poll gov.uk once every 5 minutes
    var registerToVoteUpdate = window.setInterval(registerToVote.loadUsers, 300e3);

  }
});
