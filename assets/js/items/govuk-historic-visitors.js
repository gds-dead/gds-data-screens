var govukHistoricVisitors = {

  // see server.rb - performance platform url
  url: '/govuk-historic-visitors',
  offlineUrl: 'data/govuk-historic-visitors.json',

  latestData: {},

  loadData: function() {
    loadUrl = govukHistoricVisitors.url;
    if (offline === true) {
      loadUrl = govukHistoricVisitors.offlineUrl;
    }
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        govukHistoricVisitors.parseData(d);
      }
    })
  },

  parseData: function(d) {
    this.latestData = d.data[0]['visitors:sum'];
    this.updateDisplay();
  },

  updateDisplay: function() {

    var latestFigure = $('.govuk-visitors .latest-figure');
    
    // update the display (pretty):
    latestFigure.text(addCommas(this.latestData));
  }

};

$(function() {
  govukHistoricVisitors.loadData();
});