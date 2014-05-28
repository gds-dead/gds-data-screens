var carersAllowance = {

  url: '/carers',

  total: 0,
  digitalTotal: 0,
  nonDigitalTotal: 0,
  dateFrom: [],

  loadData: function() {
    loadUrl = carersAllowance.url;
    if (typeof offline !== 'undefined') {
      carersAllowance.parseData(carers_json);
      return;
    }
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        carersAllowance.parseData(d);
      }
    });
  },

  parseData: function(d) {
    // get the first (oldest) date:
    this.dateFrom = d.data[0].values[0]._start_at.split('-');
    
    this.digitalTotal = d.data[1]['value:sum'];
    this.nonDigitalTotal = d.data[0]['value:sum'];

    this.total = this.digitalTotal + this.nonDigitalTotal;

    carersAllowance.updateDisplay();
  },

  updateDisplay: function() {
    var $el = $('.carers-claims');
    $el.find('.total-figure').text(addCommas(this.total));
    $el.find('.total-digital').text(addCommas(this.digitalTotal));
    $el.find('.total-non-digital').text(addCommas(this.nonDigitalTotal));
    $el.find('.latest-date').text(monthsMap[this.dateFrom[1]] + ' ' + this.dateFrom[0]);
  }

};

$(function() {
  carersAllowance.loadData();
});