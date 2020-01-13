
// Function to check if we have enough budget to buy weapon:
function checkBudget(weaponObject) {
	let haveBudget = true;
	if (weaponObject.price > player.budget) {
		haveBudget = false;
	}
	return haveBudget;
}

// Player object constructor, with method for buying weapons:
let clickedWeapon;
let adjustedBudget;

function Player(name, budget, arsenal) {
	this.name = name;
	this.budget = budget;
	this.arsenal = arsenal;

	this.buyWeapon = function(chosenWeapon) {

		// Check to see which weapon did the play click
		switch (chosenWeapon) {
			case 'ak47':
				clickedWeapon = ak47;
				break;
			case 'dragunov':
				clickedWeapon = dragunov;
				break;
			case 'mp5':
				clickedWeapon = mp5;
				break;
			case 'rpg':
				clickedWeapon = rpg;
				break;
			case 'tomahawk':
				clickedWeapon = tomahawk;
				break;		
		};

		// Check if player have enough money, then check if the chosen weapon is already in the arsenal
		// If player choose same weapon twice, they have more amo
		// Then show the chosen weapon in the arsenal list
		if (checkBudget(clickedWeapon) === false) {
			// Part bellow is only for animation purpose
			// ===========
			soundNoMoney.pause();
			soundNoMoney.currentTime = 0;
			soundNoMoney.play();
			// ===========
			this.budget -= clickedWeapon.price;
			if (this.budget < 0) {
				adjustedBudget = -1;
			} else if (this.budget >= 0) {
				adjustedBudget = this.budget;
			};
			this.budget += clickedWeapon.price;
			// ===========
			blockField(1300);
			$('.no-budget-hint').animate({
				width: '200px'
			}, 300).delay(700).animate({
				width: 0
			}, 300);
		} else if (checkBudget(clickedWeapon)) {
			soundBuying.pause();
			soundBuying.currentTime = 0;
			soundBuying.play();
			if (this.arsenal.includes(clickedWeapon)) {
				clickedWeapon.amo += clickedWeapon.originalAmo;
				this.budget -= clickedWeapon.price;
				$('#id-' + chosenWeapon).text('x' + clickedWeapon.amo);
			} else if (this.arsenal.includes(clickedWeapon) === false) {
				this.arsenal.push(clickedWeapon);
				this.budget -= clickedWeapon.price;
				adjustedBudget = this.budget;
				$('.arsenal-container').append('<div style="opacity: 0;" class="arsenal-weapon focus-on-hover"><div class="arsenal-weapon-img"><img onclick="' + clickedWeapon.objectName + '.attack()" src="' + clickedWeapon.imgUrl + '"></div><div class="arsenal-weapon-amo"><p>Amo</p><p id="id-' + chosenWeapon + '">x' + clickedWeapon.amo + '</p></div></div>');
				$('.arsenal-weapon').delay(300).animate({
					opacity: 1
				}, 1);
			}
		}

		// Show the remaining money
		$('.player-available-budget').text('Your budget: $' + addThousandSeparator(this.budget)); // Change later at animation stage
	};
}

let player = new Player('You', 70000, []);