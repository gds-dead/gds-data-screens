var taxDisc = {

  // see server.rb - performance platform url
  urlUsers: '/tax-disc-users',
  urlSatisfaction: '/tax-disc-satisfaction',

  // array to hold 2 realtime user values
  usersCount: [],

  loadUsers: function() {
    // clear the users array
    taxDisc.usersCount.length = 0;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: taxDisc.urlUsers,
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
    $('.tax-disc .users-count').text(taxDisc.usersCount[r]);

    /*******************************************************/
    // Might not be the best place, but do the same thing to .figure-grid layout
    //$('.figure.tax-disc').text(taxDisc.usersCount[r]);
  },

  loadSatisfaction: function() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: this.urlSatisfaction,
      success: function(d) {
        var percent = scoreToPercentage(d.data[d.data.length-1].satisfaction_tax_disc);
        $('.tax-disc .user-satisfaction').text(percent);
        renderPie($('.tax-disc .user-satisfaction-pie').get(0), 40, 40, 30, [percent, 100 - percent], ["#fff", "transparent"], "#006435");
      }
    });
  }

};

$(function() {
  taxDisc.loadUsers();
  taxDisc.loadSatisfaction();
  // set up a "wobble"
  var taxDiscWobble = window.setInterval(taxDisc.updateUsersDisplay, 10e3);
  // poll gov.uk once every 5 minutes
  var taxDiscUpdate = window.setInterval(taxDisc.loadUsers, 300e3);
});
