var sorn = {

  // see server.rb - performance platform url
  urlUsers: '/sorn-users',
  urlSatisfaction: '/sorn-satisfaction',

  // array to hold 2 realtime user values
  usersCount: [],

  loadUsers: function() {
    // clear the users array
    sorn.usersCount.length = 0;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: sorn.urlUsers,
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

    /*******************************************************/
    // Might not be the best place, but do the same thing to .figure-grid layout
    $('.figure.sorn').text(sorn.usersCount[r]);
  },

  loadSatisfaction: function() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: this.urlSatisfaction,
      success: function(d) {
        var percent = scoreToPercentage(d.data[d.data.length-1].satisfaction_sorn);
        $('.sorn .user-satisfaction').text(percent);
        renderPie($('.sorn .user-satisfaction-pie').get(0), 25, 25, 25, [percent, 100 - percent], ["#85994b", "transparent"]);
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
