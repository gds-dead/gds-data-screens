var lpa = {

  url: '/lpa',

  total: 0,
  digitalTotal: 0,
  nonDigitalTotal: 0,
  dateFrom: [],

  loadData: function() {
    loadUrl = lpa.url;
    if (typeof offline !== 'undefined') {
      lpa.parseData(lpa_json);
      return;
    }
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        lpa.parseData(d);
      }
    });
  },

  parseData: function(d) {
    // roll through the data and add up all the numbers to get the totals (digital and paper)
    var i, _i;
    var digital = [];
    var nDigital = [];
    for (i=0, _i=d.data.length; i<_i; i++) {
      switch (d.data[i].key) {
        case "property_and_financial_digital_applications":
        case "health_and_welfare_digital_applications":
          this.digitalTotal = this.digitalTotal + d.data[i].value;
          digital.push(d.data[i]);
          break;
        case "property_and_financial_paper_applications":
        case "health_and_welfare_paper_applications":
          this.nonDigitalTotal = this.nonDigitalTotal + d.data[i].value;
          break;
      }
    }
    this.total = this.digitalTotal + this.nonDigitalTotal;
    this.dateFrom = digital[0]._week_start_at.split('-');

    lpa.updateDisplay();
  },

  updateDisplay: function() {
    var $el = $('.lpa-applications');
    $el.find('.total-figure').text(addCommas(this.total));
    $el.find('.total-digital').text(addCommas(this.digitalTotal));
    $el.find('.total-non-digital').text(addCommas(this.nonDigitalTotal));
    $el.find('.latest-date').text(monthsMap[this.dateFrom[1]] + ' ' + this.dateFrom[0]);
  }

};

$(function() {
  lpa.loadData();
});