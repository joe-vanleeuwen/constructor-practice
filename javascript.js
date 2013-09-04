function PirateShip (name, cannons, crew) {
  this.crew = crew || [];
  this.name = name || "The Horizon Drifter";
  this.cannons = cannons || 6;
  this.treasure = (Math.floor(Math.random() * (50)) + 20);

  this.add = function(newMate) {
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



function Pirate (name, role) {
  this.name = name;
  this.morale = (Math.floor(Math.random() * (10)) + 1);
  this.role = role;
};


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
    var shipMorale;
    var captainIndex;
    var firstMateIndex;
    var chance = 1;
    ship.crew.forEach(function(pirate, index) {
      if (pirate.role.title === "Captain") {
        captainIndex = index
      } 
      else if(pirate.role.title === "First Mate") {
        firstMateIndex = index;
      }
      else {shipMorale += pirate.morale;};
    });
    shipMorale = shipMorale/ship.crew.length;
    if (shipMorale <= 7) {
      chance = 1
    }
    if (shipMorale <= 5) {
      chance = 2
    }
    else if (shipMorale <= 3) {
      chance = 3
    } else {chance = 0}

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













