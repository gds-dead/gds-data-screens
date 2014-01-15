var topPolicies = {

  url: '/policies',

  policies: [],

  loadData: function() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: topPolicies.url,
      success: function(d) {
        topPolicies.parseData(d);
      }
    });
  },

  parseData: function(d) {

    // pull out all objects with format of 'policy' and with value in 'entries'
    for (var i=0; i<d.details.data.length; i++) {
      var item = d.details.data[i];
      if (item.entries !== null && item.format === 'policy') {
        this.policies.push(d.details.data[i]);
      }
    }
    // sort array by entries descending
    this.policies.sort(function(a,b) { return parseFloat(b.entries) - parseFloat(a.entries) } );
    // shorten array to 5 items
    this.policies = this.policies.slice(0,5);

    topPolicies.updateDisplay();
  },

  updateDisplay: function() {
    var htmlStr = '';
    for (var i=0; i<this.policies.length; i++) {
      htmlStr += '<div><span class="leaderboard-item">';
      htmlStr += this.policies[i].title;
      htmlStr += '</span><span class="leaderboard-number">';
      htmlStr += addCommas(this.policies[i].entries);
      htmlStr += '</span></div>';
    }
    $('.top-policies .leaderboard-content').html(htmlStr);
  }

};

$(function() {
  topPolicies.loadData();
});