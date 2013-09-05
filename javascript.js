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
      this.crew.forEach(function(pirate, index) {
        if(pirate.title !== "Captain") {
          votes.push(pirate.voteOnCaptain(this.crew.length));
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

        // for (prop in this.crew[indexVal]) { 
        //   if (this.crew[indexVal].hasOwnProperty(prop)) {
        //     if(prop !== "title" & prop !== "morale", prop !== "ship") {
        //       delete this.crew[indexVal][prop]; 
        //     }
        //   }; 
        // };

        this.captain = changeAttrs(this.crew[indexVal], captainAttrs);
        // this.crew[indexVal] = $.extend(this.crew[indexVal], captainAttrs);
        // this.captain = this.crew[indexVal]
      };
    };
  };

  // this.attack = function(shipName) {
  //   var probability = 
  // }

  this.shipwreck = function() {
    this.crew = this.crew.splice();
  };


};

function changeAttrs(pirate, newAttrs) {
  for (prop in pirate) { 
    if (pirate.hasOwnProperty(prop)) {
      if(prop !== "name" & prop !== "morale" & prop !== "ship") {
        delete pirate[prop]; 
      }
    }; 
  };
  pirate = $.extend(pirate, newAttrs);
  return pirate;
}

// this would extend the object pirate to the additional captain properties
// while preserving the original pirate object. this new object would be returned
// as bob.
// bob = $.extend({}, pirate, captain);

// removing the empty object argument, this would mutate pirate object.
// bob = $.extend(pirate, captain);

// to delete properties from an  object
// for (prop in bob) { 
//   if (bob.hasOwnProperty(prop)) {
//    add any extra exceptions with & prop !== "__"
//     if(prop !== "title" & prop !== "morale") {
//       delete bob[prop]; 
//     }
//   }; 
// };


function Pirate (name) {
  this.name = name;
  this.morale = (Math.floor(Math.random() * (10)) + 1);
};

// function Pirate (name) {
//   this.name = name;
//   this.morale = (Math.floor(Math.random() * (10)) + 1);
//   this.title = "Mate",
//   this.voteOnCaptain = function(numberOfMates) {
//     return (Math.floor(Math.random() * (numberOfMates)) + 0);
//   };
//   this.swabTheDeck = function() {
//     this.morale--;
//   };
// };

// delete myJSONObject.regex;

// mason

// captainAttrs = {
//   balbhalbhab: 'asgasgas',
//   killCrewMember: function(target){
    // kill someone here
//   }
// }

// $.extend(this.captain, captainAttrs)

// end mason


var captainAttrs = {
  title: "Captain",
  walkPlankCommand: function(name) {
    this.ship.crew.forEach(function(pirate, index) {
      if (pirate.name === name) {
        pirate.ship.crew.splice(index, 1);
      };
    });
  },

  chooseFirstMate: function() {
    var x = 0;
    var indexVal = 0;
    var firstMateExists = false;
    // test to see if a First Mate already exists
    this.ship.crew.forEach(function(pirate) {
      if (pirate.title === "First Mate") {
        firstMateExists = true;
      }
    });
    // if First Mate does not exist, assign Mate with highest morale to be First Mate
    if(!firstMateExists) {
      this.ship.crew.forEach(function(pirate, index) {
        if (pirate.morale > x) {
          if(pirate.title !== "Captain") {
            x = pirate.morale;
            indexVal = index;
          };
        };
      });

      this.ship.firstMate = changeAttrs(this.ship.crew[indexVal], firstMateAttrs)
    };
  },
  swabDeckCommand: function() {
    this.ship.crew.forEach(function(pirate) {
      if (pirate.title === "Mate") {
        console.log("Before: " + pirate.title + ": " + pirate.morale)
        pirate.swabTheDeck();
        console.log("After: " + pirate.title + ": " + pirate.morale)
      }
    });
  }
};


var firstMateAttrs = {
  title: "First Mate",
  attemptMutiny: function() {
    var shipMorale = 0;
    var captainIndex;
    var firstMateIndex;
    // chance of zero will never achieve successful mutiny
    var chance = 1;
    this.ship.crew.forEach(function(pirate, index) {
      if (pirate.title === "Captain") {
        captainIndex = index
      } 
      else if(pirate.title === "First Mate") {
        firstMateIndex = index;
        shipMorale += pirate.morale;
      }
      else {shipMorale += pirate.morale};
    });
    shipMorale = Math.floor(shipMorale/(this.ship.crew.length - 1));

    if (shipMorale <= 5) {
      chance = 2
    }
    if (shipMorale <= 3) {
      chance = 3
    }

    if((Math.floor(Math.random() * (chance)) + 1) > 1) {
      this.ship.crew.captain = changeAttrs(this.ship.crew[firstMateIndex], captainAttrs)
      this.ship.crew.splice(captainIndex, 1);
    }
  }
};

var mateAttrs = {
  title: "Mate",
  voteOnCaptain: function(numberOfMates) {
    return (Math.floor(Math.random() * (numberOfMates)) + 0);
  },
  swabTheDeck: function() {
    this.morale--;
  }
};

hunter = new PirateShip()
hunter.add($.extend(new Pirate("Bob"), mateAttrs));
hunter.add($.extend(new Pirate("Dude"), mateAttrs));
hunter.add($.extend(new Pirate("Steve"), mateAttrs));
hunter.add($.extend(new Pirate("Bill"), mateAttrs));


// helping Keeron

// function formPack(type) {
//   var count = 0;
//     animalCollection.animals.forEach(function(animal) {
//         if (anmial.type === type) {
//           count++;
//         }
//     });
//     if (count > 5) {
//       var (type + "Pack") = [];
//           animalCollection.animals.forEach(function(animal) {
//         if (anmial.type === type) {
//           ourPackArray.push(animal);
//         }
//     });
//     }
// }


// function AnimalCollection() {
//     this.animals = [];
//     this.allPacks = [];

//     this.add = function(newAnimal) {
//         this.animals.push(newAnimal)
//     };

//     this.formPack = function(type) {
//         var count = 0;
//         this.animals.forEach(function(animal) {
//             console.log(animal)
//             if (animal.type === type) {
//               count++;
//               console.log(count)
//             }
//         });
//         if (count > 5) {
//           var pack = {type: []};
//               this.animals.forEach(function(animal) {
//                 console.log(animal)
//                 if (animal.type === type) {
//                    pack.type.push(animal);
//                 }
//             });
//         };
//         this.allPacks.push(pack);
//     };    
// };


// function AnimalCollection() {
//     this.animals = [];
//     this.allPacks = [];

//     this.add = function(newAnimal) {
//         this.animals.push(newAnimal)
//     };

//     this.formPack = function() {
//         var packType = "";
//         this.animals.forEach(function(animal) {
//             this.allPacks.forEach(function(pack) {
//                 if (pack.type !== animal.type) {
//                     packType = animal.type;
//                     console.log(packType)
//                 }
//             });
//             var count = 0;
//             this.animals.forEach(function(animal) {
//                 console.log(animal)
//                 if (animal.type === packType) {
//                     count++;
//                     console.log(count)
//                 };
//             });
//             if (count > 5) {
//               var pack = {packType: []};
//                   this.animals.forEach(function(animal) {
//                     console.log(animal)
//                     if (animal.type === packType) {
//                        pack.type.push(animal);
//                     }
//                 });
//             };
//             this.allPacks.push(pack);
//         }, this);
//     };    
// };
//     this.formPack = function() {
//         var packType = "";
//         this.animals.forEach(funciton(animal) {
//             this.allPacks.forEach(function(pack) {
//                 if (pack.type !== animal.type) {
//                     packType = animal.type;
//                 }
//             }, this);
//           var count = 0;
//             this.animals.forEach(function(animal) {
//                 if (anmial.type === packType) {
//                   count++;
//                 }
//             });
//             if (count > 5) {
//               var pack = {packType: []};
//                   this.animals.forEach(function(animal) {
//                 if (anmial.type === packType) {
//                   pack.push(animal);
//                 }
//                 });
//             }
//             allPacks.push(pack);
//         }, this);
//     };
// }


// function Animal(type) {
//     this.type = type;
// }

// var SafariAnimals = new AnimalCollection()
// SafariAnimals.add(new Animal('Lion'));
// SafariAnimals.add(new Animal('Lion'));
// SafariAnimals.add(new Animal('Lion'));
// SafariAnimals.add(new Animal('Lion'));
// SafariAnimals.add(new Animal('Lion'));
// SafariAnimals.add(new Animal('Lion'));




