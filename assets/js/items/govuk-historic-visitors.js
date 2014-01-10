var govukHistoricVisitors = {

  // see server.rb - performance platform url
  url: '/govuk-historic-visitors',

  latestData: {},
  historicData: {},

  day: 0,
  month: '',
  year: '',

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
    
    // get the year + month + day (day as Number)
    var split = this.latestData.end_at.split('-');
    this.year = split[0];
    this.month = split[1];
    this.day = parseInt(split[2]);
    
    // now get comparable data from 1 YEAR AGO (the same month) in a smaller array
    var historicMonthData = [];
    for (i=0, _i=govuk.length; i<_i; i++) {
      var s = govuk[i].end_at.split('-');
      if (s[0] !== this.year && s[1] === this.month) {
        historicMonthData.push(govuk[i]);
      }
    }
    
    // chug through dates (backwards) to get the "nearest-ish" from a year ago
    // what do we want?
    // 1. An EQUAL end date for the previous year
    // 2. Failing that, the NEAREST end date
    var compare = [];
    var compareCount = 0;
    for (i=historicMonthData.length-1, _i=0; i>=_i; i--) {

      var s = historicMonthData[i].end_at.split('-');
      s = parseInt(s[2]);
      if (s === this.day) {
        //console.log(s + ': same day!');
        historicValue = historicMonthData[i].value['govuk'];
        compare.length = 0; // flush the compare array, we have a match!
        compare[compareCount] = [s ,historicMonthData[i]];
        compareCount++;
        break;
      } else if (s > this.day) {
        //console.log(s + ": currently later than the day");
        compare[compareCount] = [s ,historicMonthData[i]];
        compareCount++;
      } else {
        //console.log(s + ": now earlier than the day");
        compare[compareCount] = [s ,historicMonthData[i]];
        compareCount++;
        break;
      }
    }

    if (compare.length > 1) {
      // Do a comparison of s - find the smallest remainder
      var r1 = Math.abs(this.day - compare[0][0]);
      var r2 = Math.abs(this.day - compare[1][0]);
      if (r1 < r2) {
        this.historicData = compare[0][1];
      } else {
        this.historicData = compare[1][1];
      }
    } else {
      this.historicData = compare[0][1];
    }

    this.updateDisplay();

  },

  updateDisplay: function() {

    var latestFigure = $('.govuk-visitors .latest-figure');
    var historicFigure = $('.govuk-visitors .historic-figure');
    var latestDates = $('.govuk-visitors .latest-dates');
    var historicDates = $('.govuk-visitors .historic-dates');
    
    // update the display (pretty):
    latestFigure.text(addCommas(this.latestData.value['govuk']));
    historicFigure.text(addCommas(this.historicData.value['govuk']));
    
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
  govukHistoricVisitors.loadData();
});