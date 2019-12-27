var request = require('request');

module.exports = {
  label : 'Connect to Basic',
  mock_input: { },
  validate : function (input, output){
    // auth data will be availablein input.auth
    var username = input.auth.username
    var password = input.auth.password
    request({
      url: 'http://httpbin.org/basic-auth/user/passwd',
      auth: {
        user: username,
        pass: password,
        sendImmediately: false
      }
    },
    function(err, res, body){
      if(err){
        output(err, null)
      }
      if(res.statusCode == 401){
        output('Unauthorized')
      } else {
        output(null, 'Logged in successfull');
      }
    })
  }
}