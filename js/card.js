function Card(id, name) {
   var self = this;

   this.id = id;
   this.name = name || 'No name given';
   this.$element = createCard();

   function createCard() {
       //Card elements
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.name);
      var $cardDelete = $('<button>').addClass('btn-delete btn').text('x');

       //Card Events - delete card
      $cardDelete.click(function () {
          self.removeCard();
      });
       //Add card with delete button
      $card.append($cardDelete)
        .append($cardDescription);

      return $card;
   }
}
//Delete method
Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      seccess: function() {
          self.$element.remove();
      }
    });
  }
};
