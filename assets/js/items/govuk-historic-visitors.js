var govukHistoricVisitors = {

  // see server.rb - performance platform url
  url: '/govuk-historic-visitors',

  latestData: {},

  loadData: function() {
    $.ajax({
      dataType: 'json',
      cache: false,
      url: govukHistoricVisitors.url,
      success: function(d) {
        govukHistoricVisitors.parseData(d);
      }
    })
  },

  parseData: function(d) {
    // get the right subset from the json
    d = d.details.data;

    // We're only dealing with GOV.UK results!
    var i, _i;
    var govuk = [];
    for (i=0, _i=d.length; i<_i; i++) {
      if (typeof d[i].value['govuk'] !== 'undefined') {
        govuk.push(d[i]);
      }
    }

    // get the LAST (most recent) item:
    this.latestData = govuk[govuk.length-1];

    this.updateDisplay();

  },

  updateDisplay: function() {

    var latestFigure = $('.govuk-visitors .latest-figure');
    
    // update the display (pretty):
    latestFigure.text(addCommas(this.latestData.value['govuk']));
  }

};

$(function() {
  govukHistoricVisitors.loadData();
});