var taxDisc = {

  // see server.rb - performance platform url
  urlUsers: '/tax-disc-users',
  urlSatisfaction: '/tax-disc-satisfaction',

  // array to hold 2 realtime user values
  usersCount: [],

  loadUsers: function() {
    // clear the users array
    this.usersCount.length = 0;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: this.urlUsers,
      success: function(d) {
        var i, _i;
        for (i=0, _i=d.data.length; i<_i; i++) {
          taxDisc.usersCount.push(d.data[i].unique_visitors)
        }
        // update the display
        taxDisc.updateUsersDisplay();
      }
    });
  },

  updateUsersDisplay: function() {
    var r = getRandomInt(0, taxDisc.usersCount.length);
    $('#usersCount').text(taxDisc.usersCount[r]);
  },

  loadSatisfaction: function() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: this.urlSatisfaction,
      success: function(d) {
        var percent = scoreToPercentage(d.data[d.data.length-1].satisfaction_tax_disc);
        $('#userSatisfaction').text(percent);
        renderPie($('.tax-disc .user-satisfaction-pie').get(0), 25, 25, 25, [percent, 100 - percent], ["#85994b", "transparent"]);
      }
    });
  }

};

$(function() {
  taxDisc.loadUsers();
  taxDisc.loadSatisfaction();
  // set up a "wobble"
  //var taxDiscWobble = window.setInterval(taxDisc.updateUsersDisplay, 10e3);
});
