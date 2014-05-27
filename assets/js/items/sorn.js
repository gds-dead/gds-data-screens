var sorn = {

  // see server.rb - performance platform url
  urlUsers: '/sorn-users',
  urlSatisfaction: '/sorn-satisfaction',
  offlineUsers: 'data/sorn-realtime.json',
  offlineSatisfaction: 'data/sorn-satisfaction.json',

  // array to hold 2 realtime user values
  usersCount: [],

  loadUsers: function() {
    // clear the users array
    sorn.usersCount.length = 0;
    loadUrl = sorn.urlUsers;
    if (offline === true) {
      loadUrl = sorn.offlineUsers;
    }
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        var i, _i;
        for (i=0, _i=d.data.length; i<_i; i++) {
          sorn.usersCount.push(d.data[i].unique_visitors)
        }
        // update the display
        sorn.updateUsersDisplay();
      }
    });
  },

  updateUsersDisplay: function() {
    var r = getRandomInt(0, sorn.usersCount.length);
    $('.sorn .users-count').text(sorn.usersCount[r]);
  },

  loadSatisfaction: function() {
    loadUrl = sorn.urlSatisfaction;
    if (offline === true) {
      loadUrl = sorn.offlineSatisfaction;
    }
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        var percent = scoreToPercentage(d.data[d.data.length-1].satisfaction_sorn);
        $('.sorn .user-satisfaction').text(percent);
        var el = $('.tax-disc .user-satisfaction-pie');
        var measure = el.width() / 2;
        renderPie($('.sorn .user-satisfaction-pie').get(0), measure, measure, measure, [percent, 100 - percent], ["#fff", "transparent"], "#006435");
      }
    });
  }

};

$(function() {
  sorn.loadUsers();
  sorn.loadSatisfaction();
  // set up a "wobble"
  var sornWobble = window.setInterval(sorn.updateUsersDisplay, 10e3);
  // poll gov.uk once every 5 minutes
  var sornUpdate = window.setInterval(sorn.loadUsers, 300e3);
});
