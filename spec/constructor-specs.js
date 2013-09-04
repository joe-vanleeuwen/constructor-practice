describe("the constructor, ", function() {

	describe("PirateShip", function() {

		theHorizonDrifter = new PirateShip();

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

		it(".push() should add one to crew array", function() {

			var length = theHorizonDrifter.crew.length
			theHorizonDrifter.add(new Pirate("Bob", new Mate))
			expect(theHorizonDrifter.crew.length).toBe(length + 1);
		});

		it(".chooseCaptain() should not make a Mate captain with less than 3 mates onboard", function() {

			theHorizonDrifter.add(new Pirate("Bob", new Mate))
			theHorizonDrifter.add(new Pirate("Bob", new Mate))
			theHorizonDrifter.chooseCaptain()

			var captainExists = false;
			theHorizonDrifter.crew.forEach(function(pirate) {
				if(pirate.role.title === "Captain") {
					captainExists = true;
				}
			});

			expect(captainExists).toBe(false);
		});

	});

	describe("Pirate", function() {

		it("should return an object who's constructor is Pirate", function() {

			cutlassJack = new Pirate();
			expect(cutlassJack.constructor).toBe(Pirate);
		});


		describe("Captain", function() {

			beforeEach(function() {
				theHorizonDrifter.crew = [];
			});

			it(".role.walkPlankCommand() should remove 1 Mate from crew", function() {
				
				theHorizonDrifter.add(new Pirate("Dude", new Captain()));
				theHorizonDrifter.add(new Pirate("Guy", new Mate()));
				var length = theHorizonDrifter.crew.length;

				theHorizonDrifter.crew[0].role.walkPlankCommand(theHorizonDrifter, "Guy");
				expect(theHorizonDrifter.crew.length).toBe(length - 1);
			});

			it(".role.chooseFirstMate() should return a (randomly) promoted Mate who now is FirstMate", function() {
				
				theHorizonDrifter.add(new Pirate("Dude", new Captain()));
				theHorizonDrifter.add(new Pirate("Guy", new Mate()));

				theHorizonDrifter.crew[0].role.chooseFirstMate(theHorizonDrifter);
				expect(theHorizonDrifter.crew[1].role.title).toBe("First Mate");
			});
		});

		describe("FirstMate", function() {

			beforeEach(function() {
				theHorizonDrifter.crew = [];
			});

			it("should return an object who's constructor is Priate", function() {

				firstMateBob = new Pirate(new FirstMate());
				expect(cutlassJack.constructor).toBe(Pirate);
			});
		});

		describe("Mate", function() {

			beforeEach(function() {
				theHorizonDrifter.crew = [];
			});

			it(".role.title should return correct title", function() {

				theHorizonDrifter.add(new Pirate("Guy", new Mate()));
				expect(theHorizonDrifter.crew[0].role.title).toBe("Mate");
			});

			it("voteOnCaptain() should return a random number between 0 and theHorizonDrifter.crew.length", function() {

				theHorizonDrifter.add(new Pirate("Dude", new Mate()));
				var x = theHorizonDrifter.crew[0].role.voteOnCaptain(theHorizonDrifter.crew.length);

				expect(x).toBe(0);
			});
		});
	});
});
