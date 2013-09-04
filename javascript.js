function PirateShip (name, cannons, crew) {
  this.crew = crew || [];
  this.name = name || "The Horizon Drifter";
  this.cannons = cannons || 6;
  this.treasure = (Math.floor(Math.random() * (50)) + 20);

  this.add = function(newMate) {
    newMate.ship = this;
    this.crew.push(newMate);      
  };

  // i'm sure this is an extremely verbose way of choosing a captain =/
  this.chooseCaptain = function() {
    if(this.crew.length > 2) {
      var votes = [];
      // letting each mate vote. Using randomly generated number
      this.crew.forEach(function(mate, index) {
        if(mate.role.title !== "Captain") {
          votes.push(mate.role.voteOnCaptain(this.crew.length));
        } else {votes.unshift(true)};
      }, this);

      // making sure there is no captain and making array of how many times each index was chosen
      if(votes[0] !== true) {
        var voteCount = [];
        votes.forEach(function(vote, index) {
          if(voteCount[vote] === undefined) 
              {voteCount[vote] = 1;
            } 
            else {
              voteCount[vote] += 1;
            };
        });
        // setting the index value of the pirate with the highest votes to indexVal
        var x = 0;
        var indexVal = 0;
        voteCount.forEach(function(voteNum, index) {
          if (voteNum > x) {
            x = voteNum;
            indexVal = index;
          };
        });
        // making that pirate Captain and removing 
        this.crew[indexVal].role = new Captain();

        this.captain = this.crew[indexVal]
        // this.add(new Pirate(this.crew[indexVal].name, new Captain()));
        // this.crew.splice(indexVal, 1);
      };
    };
  };

  // this.moraleStatus = 



  // this.attack = function(shipName) {
  //   var probability = 
  // }

  this.shipwreck = function() {
    this.crew = this.crew.splice();
  };


};

// this would extend the object pirate to the additional captain properties
// while preserving the original pirate object. this new object would be returned
// as bob.
bob = $.extend({}, pirate, captain);

// removing the empty object argument, this would mutate pirate object.
bob = $.extend(pirate, captain);

// to delete properties from an  object
for (prop in bob) { 
  if (bob.hasOwnProperty(prop)) {
   // add any extra exceptions with & prop !== "__"
    if(prop !== "name") {
      delete bob[prop]; 
    }
  }; 
};


function Pirate (name, role) {
  this.name = name;
  this.morale = (Math.floor(Math.random() * (10)) + 1);
  this.role = role;
};

// delete myJSONObject.regex;

// mason

captainAttrs = {
  balbhalbhab: 'asgasgas',
  killCrewMember: function(target){
    // kill someone here
  }
}

// $.extend(this.captain, captainAttrs)

// end mason




// roles of the pirates
function Captain () {
  this.title = "Captain"
  this.walkPlankCommand = function(ship, name) {
    ship.crew.forEach(function(pirate, index) {
      if (pirate.name === name) {
        console.log(index)
        ship.crew.splice(index, 1);
      };
    });
  };

  var firstMateExists = false
  this.chooseFirstMate = function(ship) {
      var x = 0;
      var indexVal = 0;
      if(!firstMateExists) {
        ship.crew.forEach(function(pirate, index) {
          if (pirate.morale > x) {
            if(pirate.role.title !== "Captain") {
              x = pirate.morale;
              indexVal = index;
            };
          };
        });
        ship.crew[indexVal].role = new FirstMate();
        firstMateExists = true;
      };
  };
  this.swabDeckCommand = function() {

  };
};

function FirstMate () {
  this.title = "First Mate"
  this.attemptMutiny = function(ship) {
    var shipMorale = 0;
    var captainIndex;
    var firstMateIndex;
    // chance of zero will never achieve successful mutiny
    var chance = 1;
    ship.crew.forEach(function(pirate, index) {
      if (pirate.role.title === "Captain") {
        captainIndex = index
      } 
      else if(pirate.role.title === "First Mate") {
        firstMateIndex = index;
        shipMorale += pirate.morale;
      }
      else {shipMorale += pirate.morale};
    });
    shipMorale = Math.floor(shipMorale/(ship.crew.length - 1));

    if (shipMorale <= 5) {
      chance = 2
    }
    if (shipMorale <= 3) {
      chance = 3
    }

    if((Math.floor(Math.random() * (chance)) + 1) > 1) {
      ship.crew[firstMateIndex].role = new Captain();
      ship.crew.splice(captainIndex, 1);
    }
  };
};

function Mate () {
  this.title = "Mate"
  this.voteOnCaptain = function(numberOfMates) {
    return (Math.floor(Math.random() * (numberOfMates)) + 0);
  };
  this.swabTheDeck = function() {
    this.morale--;
  };
};

hunter = new PirateShip()
// hunter.add(new Pirate("Steve", new Captain()))
// hunter.add(new Pirate("Genius", new FirstMate()))
hunter.add(new Pirate("Steve", new Mate()))
hunter.add(new Pirate("Genius", new Mate()))
hunter.add(new Pirate("Guy", new Mate()))
hunter.add(new Pirate("Dude", new Mate()))

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













