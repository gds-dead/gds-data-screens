var prisonVisits = {

  url: '/prison-visits',

  total: 0,
  digitalTotal: 0,
  nonDigitalTotal: 0,
  dateFrom: [],

  loadData: function() {
    loadUrl = prisonVisits.url;
    if (typeof offline !== 'undefined') {
      prisonVisits.parseData(prison_visits_json);
      return;
    }
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        prisonVisits.parseData(d);
      }
    });
  },

  parseData: function(d) {
    // get the oldest date WITH data (it didn't launch that long ago)
    var lump = d.data[0].values;

    for (var i = 0; i < lump.length; i++) {
      if (lump[i]['count:sum'] !== null) {
        this.dateFrom = lump[i]._start_at.split('-');
        break;
      }
    }
    
    this.digitalTotal = d.data[0]['count:sum'];
    this.nonDigitalTotal = d.data[1]['count:sum'];

    this.total = this.digitalTotal + this.nonDigitalTotal;

    prisonVisits.updateDisplay();
  },

  updateDisplay: function() {
    var $el = $('.prison-visits');
    $el.find('.total-figure').text(addCommas(this.total));
    $el.find('.total-digital').text(addCommas(this.digitalTotal));
    $el.find('.total-non-digital').text(addCommas(this.nonDigitalTotal));
    $el.find('.latest-date').text(monthsMap[this.dateFrom[1]] + ' ' + this.dateFrom[0]);
  }

};

$(function() {
  prisonVisits.loadData();
});
