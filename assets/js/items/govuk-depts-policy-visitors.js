var deptsPolicyVisitors = {

  // see server.rb - performance platform url
  url: '/depts-policy-visitors',

  latestData: {},

  loadData: function() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: deptsPolicyVisitors.url,
      success: function(d) {
        deptsPolicyVisitors.parseData(d);
      }
    })
  },

  parseData: function(d) {
    // get the right subset from the json
    d = d.details.data;

    // get the LAST (most recent) item:
    this.latestData = d[d.length-1];

    this.updateDisplay();

  },

  updateDisplay: function() {

    var latestFigure = $('.depts-policy-visitors .latest-figure');
    
    // update the display (pretty):
    latestFigure.text(addCommas(this.latestData.value));
  }

};

$(function() {
  deptsPolicyVisitors.loadData();
});