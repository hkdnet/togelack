var Client = function() {
  var base = function(url, method, data) {
    data = data || {};
    method = method || '';
    method.toUpperCase();
    var dfd;
    switch (method) {
      case 'GET':
        dfd = $.get(url, data, 'JSON');
        break;
      case 'POST':
        dfd = $.post(url, data, 'JSON');
        break;
      default:
        throw new Error('unknown method');
    }
    return dfd.then(function(d) {
      if(d.ok) {
        return d;
      }
      toastr.error(d.message);
      // stopしたい……
    }, function() {
      toastr.error('Sorry, something went wrong...')
      return false;
    })
  }
  this.login = function(api_token) {
    return base('/api/login', 'POST', {api_token: api_token})
  };
  this.channels = function() {
    return base('/api/channels', 'GET');
  };
};

var client = new Client();
