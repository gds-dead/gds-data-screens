var govukHistoricVisitors = {

  // see server.rb - performance platform url
  url: '/govuk-historic-visitors',
  
  latestData: {},

  loadData: function() {
    loadUrl = govukHistoricVisitors.url;
    if (typeof offline !== 'undefined') {
      govukHistoricVisitors.parseData(govuk_historic_visitors_json);
      return;
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