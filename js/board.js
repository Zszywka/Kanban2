var board = {
  name: 'Kaban',
  addColumn: function(column) {
    this.$element.append(column.$element); //this.$element -->board.$element
    initSortable();
  },
  $element: $('#board .column-container')
};

var body = {
  addBoard: function(board) {
    this.$element.append(board.$element);
  },
  $element: $('body #board')
};
// drag and drop cards (function for the board) --> function drag'n'drop and method sortable() in jQueryUI
function initSortable() {
 $('.column-card-list').sortable({   //<ul>
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}

// create column event (on button in HTML)
$('.create-column').click(function() {
    var columnName = prompt('Enter a column name');
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function(response) {
        var column = new Column(response.id , columnName);
        board.addColumn(column);
      }
    });
});

// create board event(on button in HTML)
$('.create-board').click(function() {
    var boardName = prompt('Enter a board name');
    $.ajax({
      url: baseUrl + '/board',
      method: 'POST',
      data: {
        name: boardName
      },
      success: function(response) {
        var board = new Board(response.id, boardName);
        body.addBoard(board);
      }
    });

});

function Board(id, name) {
  var self = this;

  this.id = id,
  this.name = name || 'new board';
  this.$element = createBoard();

  function createBoard(name) {
    var $board = $('<div>').addClass('board');
    var $boardTitle = $('<h2>').addClass('board-title').text(this.name);
    var $boardColumnList = $('<div>').addClass('column-container');
    var $boardAddColumn = $('<button>').addClass('add-column').text('Add a column');
    var $boardDelete = $('<button>').addClass('btn-delete-board').text('x');

    $boardAddColumn.click(function(event) {
      var columnName = prompt('Enter the name of the column');
      self.addColumn(new Column(columnName));
      event.preventDefault();
      self.addColumn(new Column(columName));

      $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
          name: columnName
    		},
        success: function(response) {
          var column = new Column(response.id, columName);
          self.addColumn(column);
        }
      })
    });

    $boardDelete.click(function(){
      self.removeBoard();
    });

    $board.append($boardTitle)
    .append($boardColumnList)
    .append($boardAddColumn)
    .append($boardDelete);

    return $board;
  }
}

Board.prototype = function(column) {
  this.$element.append(column.$elemnet);
  initSortable();
};

Board.prototype = {
  removeBoard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/board/' + self.id,
      method: 'DELETE',
      success: function(response) {
        self.$element.remove();
      }
    })
  },
  addColumn: function(column) {
    this.$element.children('div').append(column.$element);
  }
};
