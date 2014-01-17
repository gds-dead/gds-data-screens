var deptsPolicyVisitors = {

  // see server.rb - performance platform url
  url: '/depts-policy-visitors',

  latestData: {},
  historicData: {},

  day: 0,
  month: '',
  year: '',

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
    
    // get the year + month + day (day as Number)
    var split = this.latestData.end_at.split('-');
    this.year = split[0];
    this.month = split[1];
    this.day = parseInt(split[2]);

    // get the FIRST (most oldest) item:
    this.historicData = d[0];

    this.updateDisplay();

  },

  updateDisplay: function() {

    var latestFigure = $('.depts-policy-visitors .latest-figure');
    var historicFigure = $('.depts-policy-visitors .historic-figure');
    var latestDates = $('.depts-policy-visitors .latest-dates');
    var historicDates = $('.depts-policy-visitors .historic-dates');
    
    // update the display (pretty):
    latestFigure.text(addCommas(this.latestData.value));
    historicFigure.text(addCommas(this.historicData.value));
    
    // DD MMM - DD MMM
    var startSplit = this.latestData.start_at.split('-');
    var latestStr = '';
    latestStr += parseInt(startSplit[2]) + ' ';
    latestStr += monthsMap[startSplit[1]] + ' - ';
    latestStr += this.day + ' ';
    latestStr += monthsMap[this.month] + ' ';
    latestStr += this.year;
    
    latestDates.text(latestStr);
    
    // now do historic dates
    var hStartSplit = this.historicData.start_at.split('-');
    var hEndSplit = this.historicData.end_at.split('-');
    
    var hLatestStr = '';
    hLatestStr += parseInt(hStartSplit[2]) + ' ';
    hLatestStr += monthsMap[hStartSplit[1]] + ' - ';
    hLatestStr += parseInt(hEndSplit[2]) + ' ';
    hLatestStr += monthsMap[hEndSplit[1]] + ' ';
    hLatestStr += hEndSplit[0];
    
    historicDates.text(hLatestStr);
  }

};

$(function() {
  deptsPolicyVisitors.loadData();
});