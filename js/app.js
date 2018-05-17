function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function setRandomColor() {
  $(".column").css("background-color", getRandomColor());
}
// random number id function
function randomString() {
  var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
  var str = '';
  for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
//  API
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3168',
  'X-Auth-Token': '70ea8c795a1376fe55bb64b8867009fa'
};
