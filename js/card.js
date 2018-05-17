function Card(description) {
   var self = this;

   this.id = randomString();
   this.description = description;
   this.$element = createCard();

   function createCard() {
       //Card elements
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
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
    this.$element.remove();
  }
};
