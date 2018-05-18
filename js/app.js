// function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
// function setRandomColor() {
//   $(".column").css("background-color", getRandomColor());
// }

//  API
// server address
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
// authentication
var myHeaders = {
  'X-Client-Id': '3168',
  'X-Auth-Token': '70ea8c795a1376fe55bb64b8867009fa'
};
// the function of adding these headers without having to put them in each query separately
$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.addCard(cardObj);
  	})
}
