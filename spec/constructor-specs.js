describe("the constructor, ", function() {

	theHorizonDrifter = new PirateShip();

	describe("PirateShip", function() {

		beforeEach(function() {
			theHorizonDrifter.crew = [];
		});

		it("should return an object who's constructor is PirateShip", function() {

			theHorizonDrifter = new PirateShip();
			expect(theHorizonDrifter.constructor).toBe(PirateShip);
		});

		it(".cannons should create a PirateShip object with x amount of cannons", function() {

			theHorizonDrifter = new PirateShip({cannons: 6});
			expect(theHorizonDrifter.cannons).toBe(6);
		});

		it(".shipwreck() should delete crew array", function() {

			theHorizonDrifter.shipwreck()
			expect(theHorizonDrifter.crew.length).toBe(0);
		});

		it(".add() should add one to crew array", function() {

			var length = theHorizonDrifter.crew.length
			theHorizonDrifter.add($.extend(new Pirate("Bob"), mateAttrs));
			expect(theHorizonDrifter.crew.length).toBe(length + 1);
		});

		it(".add() should add one to crew array who has the property .swabTheDeck", function() {

			theHorizonDrifter.add($.extend(new Pirate("Bob"), mateAttrs));
			expect("swabTheDeck" in theHorizonDrifter.crew[0]).toBe(true);
		});

		it(".chooseCaptain() should not make a Mate captain with less than 3 mates onboard", function() {

			theHorizonDrifter.add($.extend(new Pirate("Bob"), mateAttrs));			
			theHorizonDrifter.add($.extend(new Pirate("Bob"), mateAttrs));			
			theHorizonDrifter.chooseCaptain()

			var captainExists = false;
			theHorizonDrifter.crew.forEach(function(pirate) {
				if(pirate.title === "Captain") {
					captainExists = true;
				}
			});

			expect(captainExists).toBe(false);
		});

		it(".chooseCaptain() not remove the pirate's name property when using $.extend()", function() {

			theHorizonDrifter.add($.extend(new Pirate("Bob"), mateAttrs));	
			theHorizonDrifter.captain = changeAttrs(theHorizonDrifter.crew[0], captainAttrs);
			expect(theHorizonDrifter.captain.name).toBe("Bob");
		});

	});

	describe("Pirate", function() {

		it("should return an object who's constructor is Pirate", function() {

			cutlassJack = new Pirate();
			expect(cutlassJack.constructor).toBe(Pirate);
		});


		describe("with captainAttrs", function() {

			beforeEach(function() {
				theHorizonDrifter.crew = [];
				theHorizonDrifter.add($.extend(new Pirate("Dude"), captainAttrs));	
				theHorizonDrifter.add($.extend(new Pirate("Guy"), mateAttrs));	
				theHorizonDrifter.add($.extend(new Pirate("Steve"), mateAttrs));	
				theHorizonDrifter.add($.extend(new Pirate("Genius"), mateAttrs));	
				theHorizonDrifter.add($.extend(new Pirate("Adam"), mateAttrs));
				theHorizonDrifter.crew[0].morale = 11;
				theHorizonDrifter.crew[1].morale = 8;
				theHorizonDrifter.crew[2].morale = 10;
				theHorizonDrifter.crew[3].morale = 3;
				theHorizonDrifter.crew[4].morale = 7;

				theHorizonDrifter.captain = theHorizonDrifter.crew[0];
			});

			it(".walkPlankCommand() should remove 1 Mate from crew", function() {

				theHorizonDrifter.crew = [];
				
				theHorizonDrifter.add($.extend(new Pirate("Dude"), captainAttrs));	
				theHorizonDrifter.add($.extend(new Pirate("Guy"), mateAttrs));	
				var length = theHorizonDrifter.crew.length;

				theHorizonDrifter.captain.walkPlankCommand("Guy");
				expect(theHorizonDrifter.crew.length).toBe(length - 1);
			});

			it(".chooseFirstMate() should promote the pirate with the highest morale to FirstMate", function() {

				theHorizonDrifter.captain.chooseFirstMate();
				expect(theHorizonDrifter.firstMate.name).toBe("Steve");
			});

			it(".chooseFirstMate() should not promote additional pirates to First Mate when one already exists", function() {

				theHorizonDrifter.captain.chooseFirstMate();
				theHorizonDrifter.captain.chooseFirstMate();
				theHorizonDrifter.captain.chooseFirstMate();
				theHorizonDrifter.captain.chooseFirstMate();

				expect(theHorizonDrifter.crew[1].title).not.toBe("First Mate");
				expect(theHorizonDrifter.crew[3].title).not.toBe("First Mate");
				expect(theHorizonDrifter.crew[4].title).not.toBe("First Mate");
			});

			it(".chooseFirstMate() should not promote the Captain to First Mate regardless if he has highest morale points", function() {

				theHorizonDrifter.captain.chooseFirstMate();

				expect(theHorizonDrifter.crew[0].title).not.toBe("First Mate");
			});
			

			it("swabDeckCommand() should reduce all mates' morale points by 1", function() {

				theHorizonDrifter.add($.extend(new Pirate("Guy"), firstMateAttrs));	
				theHorizonDrifter.crew[5].morale = 5;
				theHorizonDrifter.captain.swabDeckCommand();

				expect(theHorizonDrifter.crew[1].morale).toBe(7);
				expect(theHorizonDrifter.crew[2].morale).toBe(9);
				expect(theHorizonDrifter.crew[3].morale).toBe(2);
				expect(theHorizonDrifter.crew[4].morale).toBe(6);
				expect(theHorizonDrifter.crew[5].morale).toBe(5);

			});

		});

		describe("with firstMateAttrs", function() {

			beforeEach(function() {
				theHorizonDrifter.crew = [];
			});

		});

		describe("with mateAttrs", function() {

			beforeEach(function() {
				theHorizonDrifter.crew = [];
			});

			it("should return an object who's constructor is Priate", function() {

				cutlassJack = ($.extend(new Pirate("Guy"), mateAttrs));	
				expect(cutlassJack.constructor).toBe(Pirate);
			});

			it(".title should return correct title", function() {

				theHorizonDrifter.add($.extend(new Pirate("Guy"), mateAttrs));
				expect(theHorizonDrifter.crew[0].title).toBe("Mate");
			});

			it("voteOnCaptain() should return a random number between 0 and theHorizonDrifter.crew.length", function() {

				theHorizonDrifter.add($.extend(new Pirate("Guy"), mateAttrs));
				var x = theHorizonDrifter.crew[0].voteOnCaptain(theHorizonDrifter.crew.length);

				expect(x).toBe(0);
			});
		});
	});
});
