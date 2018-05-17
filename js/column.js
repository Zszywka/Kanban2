function Column(name) {
  var self = this;

  this.id = randomString();
  this.name = name || 'new column';
  this.$element = createColumn();  // this.$element ==> div.column

  function createColumn() {
    // create components of columne
    var $column = $('<div>').addClass('column');
    var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
    var $columnCardList = $('<ul>').addClass('column-card-list');
    var $columnDelete = $('<button>').addClass('btn-delete').text('x');
    var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

    // add events (click)
    $columnDelete.click(function() {
      self.removeColumn();
    });

    $columnAddCard.click(function() {
      self.addCard(new Card(prompt("Enter the name of the card")));
    });

    // construction column of element
    $column.append($columnTitle)
      .append($columnDelete)
      .append($columnAddCard)
      .append($columnCardList);

    // retur of created column
    return $column;
  }
}

// column methods - add card, remove column
Column.prototype = {
  addCard: function(card) {
    this.$element.children('ul').append(card.$element);
  },
  removeColumn: function() {
    this.$element.remove();
  }
};
