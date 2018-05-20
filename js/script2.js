$(function(){

  // function helping
  function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
    var str = '', i;
    for (i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
// --------------------------------BOARD----------------------------------------
  // Kanban
  var board = {
    name: 'Tablica Kanban',
    createColumn: function(column) {
      this.element.append(column.element);
      initSortable();
    },
    element: $('#board .column-container')
  };

  $('.create-column')
  .click(function(){
    board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
  });
// -------------------------------COLUMN----------------------------------------
  // object Column
  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.element = createColumn();

    function createColumn() {
      // create new nodes
      var column = $('<div class="column"></div>');
      var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
      var columnCardList = $('<ul class="card-list"></ul>');
      var columnDelete = $('<button class="btn-delete">x</button>');
      var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');

      // add events to the nodes
      columnDelete.click(function() {
        self.deleteColumn();
      });
      columnAddCard.click(function(event) {
        event.preventDefault();
        self.createCard(new Card(prompt("Wpisz nazwę karty")));
      });

      // construction of the column
      column.append(columnTitle)
      .append(columnDelete)
      .append(columnAddCard)
      .append(columnCardList);
      return column;
    }
  }
  Column.prototype = {
    createCard: function(card) {
      this.element.children('ul').append(card.element);
    },
    deleteColumn: function() {
      this.element.remove();
    }
  };
// ------------------------------CARD-------------------------------------------
  // object Card
  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.element = createCard();

    function createCard() {
      var card = $('<li class="card"></li>');
      var cardDeleteBtn = $('<button class="btn-delete">x</button>');
      var cardDescription = $('<p class="card-description"></p>');
      cardDeleteBtn.click(function(){
        self.removeCard();
      });
      card.append(cardDeleteBtn);
      cardDescription.text(self.description);
      card.append(cardDescription)
      return card;
    }
  }
  Card.prototype = {
    removeCard: function() {
      this.element.remove();
    }
  }
// -----------------publishing created (in memory) elements on the page---------
  // create a new columns
  var todoColumn = new Column('Do zrobienia');
  var doingColumn = new Column('W trakcie');
  var doneColumn = new Column('Skończone');

  // add columns to the board
  board.createColumn(todoColumn);
  board.createColumn(doingColumn);
  board.createColumn(doneColumn);

  // create a new cards
  var card1 = new Card('Nowe zadanie');
  var card2 = new Card('stworzyc tablice kanban');

  // add cards to the columns
  todoColumn.createCard(card1);
  doingColumn.createCard(card2);
})
