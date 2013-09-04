function Collection (items) {
  this.items = items || [];
  this.add = function(item) {
    this.items.push(item)      
  };
  this.remove = function(id) {
    this.items.forEach(function(currentItem, index) {
      if (currentItem.id == id) {
        this.items.splice(index, 1)
      }
    }, this);
  };
  this.use = function(items, itemsIndex) {
    this.items[itemsIndex].charge --;
  };
}

// function Person(id, name) {
//   this.id = id
// }


// people = new Collection()
// people.add(new Person(1, "bob", ))



function PirateShip () {

};

function Pirate (role) {
  this.role = role;
};


// roles of the pirates
function Captain (options) {
  this.title = "Captain"
  this.walkPlankCommand = function(key, value) {
    this.crew.forEach(function(currentItem, index) {
      if (currentItem.key == value) {
        this.crew.splice(index, 1)
      }
    }, this);
  };
  };
};

function FirstMate (options) {
  this.title = "First Mate"
  this.something = function() {
  };
};

console.log(Math.floor(Math.random() * (11 - 1)) + 1);
function Mate (options) {
  this.title = "Mate"
  this.moral = Math.floor(Math.random() * (10)) + 1);
  this.voteOnCaptain = function(numberOfMates) {
    return (Math.floor(Math.random() * (numberOfMates)) + 1);
  };
  this.swabTheDeck = function() {
    this.moral--;
  };
};

// creates dude the Pirate with the role of Captain

// dude = new Pirate((new Captain());

// dude = new Pirate(Captain)

// so make all the Pirates mates. Give them the method 'vote'
// so they can vote on who should be captain. 
// 
// Assign each mate'svote to a random number.
// 
// Give role of captain to winner.
// 













