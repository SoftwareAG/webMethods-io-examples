module.exports = {
  label: "Connect to NetatmoSecurity",
  mock_input: {
    access_token: ""
  },
  oauth: "netatmo_camera_4a4b969c20",
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success)
    output(null, true)
  }
}