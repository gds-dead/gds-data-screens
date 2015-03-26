var taxDisc = {

  // see server.rb - performance platform url
  urlUsers: '/tax-disc-users',
  urlSatisfaction: '/tax-disc-satisfaction',

  // array to hold 2 realtime user values
  usersCount: [],

  loadUsers: function() {
    // clear the users array
    taxDisc.usersCount.length = 0;
    loadUrl = taxDisc.urlUsers;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        taxDisc.populateUsers(d);
      }
    });
  },

  populateUsers: function(d) {
    var i, _i;
    for (i=0, _i=d.data.length; i<_i; i++) {
      taxDisc.usersCount.push(d.data[i].unique_visitors)
    }
    // update the display
    taxDisc.updateUsersDisplay();
  },

  updateUsersDisplay: function() {
    var r = getRandomInt(0, taxDisc.usersCount.length);
    $('.tax-disc .users-count').text(taxDisc.usersCount[r]);
  },

  loadSatisfaction: function() {
    loadUrl = taxDisc.urlSatisfaction;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        renderSatisfaction(d);
      }
    });
  },

};

var offlineTaxDisc = {

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
          offlineTaxDisc.startCounter = i;
          break;
        }
        // catch and go back 1 if we've shot over the nearest minutes
        if (tempMin > min) {
          offlineTaxDisc.startCounter = i-1;
          break;
        }
      }
    }

    // display the figure
    offlineTaxDisc.updateUsersDisplay(d[offlineTaxDisc.startCounter].unique_visitors);

    // and do the pie chart
    renderSatisfaction(satisfaction_json);

  },

  incrementUsers: function() {
    if (offlineTaxDisc.startCounter === d.length) {
      offlineTaxDisc.startCounter = 0;
    } else {
      offlineTaxDisc.startCounter++;
    }
    // display the updated figure
    offlineTaxDisc.updateUsersDisplay(d[offlineTaxDisc.startCounter].unique_visitors);
  },

  updateUsersDisplay: function(txt) {
    $('.users-count').text(addCommas(txt));
  }

};

var renderSatisfaction = function(d) {
  var percent = scoreToPercentage(d.data[d.data.length-1].satisfaction_tax_disc);
  $('.tax-disc .user-satisfaction').text(percent);
  var el = $('.tax-disc .user-satisfaction-pie');
  var measure = el.width() / 2;
  renderPie($('.tax-disc .user-satisfaction-pie').get(0), measure, measure, measure, [percent, 100 - percent], ["#fff", "transparent"], "#739D9A");
}

$(function() {
  if (typeof offline !== 'undefined') {

    d = tax_disc_users_json.data;

    offlineTaxDisc.initDisplay(d);

    // ...and simply increment once every 2 mins to (almost) match JSON data
    var update = window.setInterval(offlineTaxDisc.incrementUsers, 2*60*1000);

  } else {

    taxDisc.loadUsers();
    taxDisc.loadSatisfaction();
    // set up a "wobble"
    var taxDiscWobble = window.setInterval(taxDisc.updateUsersDisplay, 10e3);
    // poll gov.uk once every 5 minutes
    var taxDiscUpdate = window.setInterval(taxDisc.loadUsers, 300e3);

  }
});