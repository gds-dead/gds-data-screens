var govukDevices = {

  // see server.rb - performance platform url
  url: '/govuk-devices',

  loadData: function() {
    loadUrl = govukDevices.url;
    if (typeof offline !== 'undefined') {
      govukDevices.updateDisplay(govuk_devices_json);
      return;
    }
    $.ajax({
      dataType: 'json',
      cache: false,
      url: loadUrl,
      success: function(d) {
        govukDevices.updateDisplay(d);
      }
    })
  },

  updateDisplay: function(d) {

    var mobile = 0;
    var desktop = 0;
    var total = 0;

    for (var i=0; i<d.data.length; i++) {
      var item = d.data[i];
      total += item['visitors:sum'];
      if (item['deviceCategory'] === 'desktop') {
        desktop += item['visitors:sum'];
      } else {
        mobile += item['visitors:sum'];
      }
    }

    desktop = Math.round(desktop / total * 100);
    mobile = Math.round(mobile / total * 100);

    $('.proportion-unit.desktop').css({
      width: desktop + '%'
    })
      .find('img').after(desktop + '%');

    $('.proportion-unit.mobile-devices').css({
      left: desktop + '%',
      width: mobile + '%'
    })
      .find('img').after(mobile + '%');
    
  }

};

$(function() {
  govukDevices.loadData();
});