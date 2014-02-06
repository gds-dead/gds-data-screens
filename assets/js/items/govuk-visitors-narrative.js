var govukVisitorsNarrative = {

  url: '/govuk-visitors-narrative',

  loadData: function() {
    $.ajax({
      dataType: 'html',
      cache: false,
      url: govukVisitorsNarrative.url,
      success: function(d) {
        govukVisitorsNarrative.parseData(d);
      }
    });
  },

  parseData: function(d) {
    // the whole thing
    var $d = $(d);
    var $snippet = $d.find('#narrative');
    // add 'key-colour' to the <span> in here
    $snippet.find('span').addClass('key-colour');

    var str = $snippet.html();

    // split on the bloody comma
    var split = str.split(', ');
    var newStr = '<div>' + split[0] + ', </div><div>' + split[1] + '</div>';

    govukVisitorsNarrative.updateDisplay(newStr);
  },

  updateDisplay: function(newStr) {
    $('.govuk-narrative .narrative-content').html(newStr);
  }

};

$(function() {
  govukVisitorsNarrative.loadData();
});