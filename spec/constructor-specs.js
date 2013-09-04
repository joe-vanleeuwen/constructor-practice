describe("the constructor, ", function() {

	describe("PirateShip", function() {

		beforeEach(function() {
			theHorizonDrifter = new PirateShip({cannons: 6});
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
			theHorizonDrifter.push(new Mate())
			expect(theHorizonDrifter.crew.length).toBe(length + 1);
		});

	});

	describe("Pirate", function() {

		it("should return an object who's constructor is Pirate", function() {

			cutlassJack = new Pirate();
			expect(cutlassJack.constructor).toBe(Pirate);
		});


		describe("Captain", function() {

			it(".role.walkPlankCommand() should remove 1 Mate from crew", function() {
				var length = theHorizonDrifter.crew.length;
				captainBob = new Pirate(new Captain());
				captainBob.role.walkPlankCommand
				expect(theHorizonDrifter.crew.length).toBe(length - 1);
			});

			it(".role.chooseFirstMate() should return a randomly promoted Mate who now is FirstMate", function() {
				
				var firstMateBill = captain.role.chooseFirstMate()
				expect(Ship.crew.length).toBe("First Mate");
			});
		});

		describe("FirstMate", function() {

			it("should return an object who's constructor is Priate", function() {

				firstMateBob = new Pirate(new FirstMate());
				expect(cutlassJack.constructor).toBe(Pirate);
			});
		});

		describe("Mate", function() {

			it(".role.title should return correct title", function() {

				mateBob = new Pirate(new Mate());
				expect(mateBob.role.title).toBe("Mate");
			});

			it("voteOnCaptain() should decide which mate is captain by random choice", function() {

				var newCaptain = theHorizonDrifter.vote()

				expect(newCaptain.title).toBe("Captain");
			});
		});
	});
});
