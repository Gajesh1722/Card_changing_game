

(function() {

  var Memory = {

    init: function(cards) {
      this.$game = $(".game");
      this.$modal = $(".modal");
      this.$overlay = $(".modal-overlay");
      this.$restartButton = $("button.restart");
      this.cardsArray = $.merge(cards, cards);
      this.shuffleCards(this.cardsArray);
      this.setup();
    },

    shuffleCards: function(cardsArray) {
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function() {
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $(".card");
      this.binding();
      this.paused = false;
      this.guess = null;
    },

    binding: function() {
      this.$memoryCards.on("click", this.cardClicked);
      this.$restartButton.on("click", $.proxy(this.reset, this));
    },
    cardClicked: function() {
      var _ = Memory;
      var $card = $(this);
      if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
        $card.find(".inside").addClass("picked");
        if (!_.guess) {
          _.guess = $(this).attr("data-id");
        } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
          $(".picked").addClass("matched");
          _.guess = null;
        } else {
          _.guess = null;
          _.paused = true;
          setTimeout(function() {
            $(".picked").removeClass("picked");
            Memory.paused = false;
          }, 600);
        }
        if ($(".matched").length == $(".card").length) {
          _.win();
        }
      }
    },

    win: function() {
      this.paused = true;
      setTimeout(function() {
        Memory.showModal();
        Memory.$game.fadeOut();
      }, 1000);
    },

    showModal: function() {
      this.$overlay.show();
      this.$modal.fadeIn("slow");
    },

    hideModal: function() {
      this.$overlay.hide();
      this.$modal.hide();
    },

    reset: function() {
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
    },

  
    shuffle: function(array) {
      var counter = array.length,
        temp, index;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function() {
      var frag = '';
      this.$cards.each(function(k, v) {
        frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><img src="images/logo1.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
      });
      return frag;
    }
  };

  var cards = [{
    name: "sap",
    img: "images/sap.jpg",
    id: 1,
  }, {
    name: "oracle",
    img: "images/oracle.jpg",
    id: 2
  }, {
    name: "apple",
    img: "images/apple.jpg",
    id: 3
  }, {
    name: "tata",
    img: "images/tata.jpg",
    id: 4
  }, {
    name: "dell",
    img: "images/dell.jpg",
    id: 5
  }, {
    name: "linkedin",
    img: "images/in.jpg",
    id: 6
  }, {
    name: "att",
    img: "images/att.jpg",
    id: 7
  }, {
    name: "android",
    img: "images/android.jpg",
    id: 8
  }, {
    name: "redhat",
    img: "images/red.jpg",
    id: 9
  }, {
    name: "microsoft",
    img: "images/micro.jpg",
    id: 10
  }, {
    name: "ibm",
    img: "images/ibm.jpg",
    id: 11
  }, {
    name: "adobe",
    img: "images/adobe.jpg",
    id: 12
  }, ];

  Memory.init(cards);

})();