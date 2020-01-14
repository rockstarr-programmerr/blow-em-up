let attDam; // The attack's damage
let attAcc; // The attack's accuracy
let targetDestroyed; // Check if both targets are destroyed
let amoOut; // Check if all weapons' amo are out
let targetAttacked; // Send to animation file for animations

// Build a function to return a random number 
function randomNumber(from, to) {
	let randNum = Math.round((Math.random() * (to - from)) + from);
	return randNum;
}

function addThousandSeparator(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Create Target class (with method of getAttacked) then initiate school and workplace object
function Target(name, health, destroyStatus) {
	this.name = name;
	this.health = health;
	this.destroyStatus = destroyStatus;

	this.getAttacked = function(attWeap) {
		// Function for checking if we won or lost:
		let checkWinLose = function() {
			if (school.destroyStatus === true && workplace.destroyStatus === true) {
				targetDestroyed = true;
			} else {
				targetDestroyed = false;
			}
			if (targetDestroyed === true) {
				soundFireOne.pause();
				soundFireTwo.pause();
				$('#game-container-block').fadeIn(300);
				soundBackground.pause();
				soundLose.pause();
				soundLose.currentTime = 0;
				soundLose.play();
				$('#result-fake-win').animate({
					top: '150px',
					opacity: 1
				}, 700);
			} else if (targetDestroyed !== true) {
				amoOut = true;
				for (let weapon of player.arsenal) {
					if (weapon.amo > 0) {
						amoOut = false;
						break;
					}
				}
				if (amoOut === true) {
					soundFireOne.pause();
					soundFireTwo.pause();
					$('#game-container-block').fadeIn(300);
					soundBackground.pause();
					soundLose.pause();
					soundLose.currentTime = 0;
					soundLose.play();
					$('#result-lose').animate({
						top: '150px',
						opacity: 1
					}, 700);
				}
			}
		}

		// Generate attack damage (with some random fluctuation) and attack accuracy:
		let damageVariation = attWeap.damage/10;
		attDam = attWeap.damage + randomNumber(-damageVariation, damageVariation);
		if (attWeap.accuracy >= randomNumber(0, 100)) {
			attAcc = true;
		} else if (attWeap.accuracy < randomNumber(0, 100)) {
			attAcc = false;
		} else {
			attAcc = true; // Just to avoid unexpected behaviors
		}

		// If the target is already destroyed, no attack. 
		// Otherwise, you attack!!
		if (this.destroyStatus == true) {
			blockField(2000);
			$('.target-destroyed').animate({
					right: 0,
					opacity: 1
				}, 500).delay(1000).animate({
					right: '-278px',
					opacity: 0
				}, 500);
			return;
		} 
		// If attack accuracy is false, you missed! 
		// Otherwise, you hit! Your target will lose health:
		else if (this.destroyStatus == false) {
			if (attWeap.amo <= 0) {
				blockField(1800);
				$('.out-of-amo').animate({
					right: 0,
					opacity: 1
				}, 500).delay(800).animate({
					right: '-278px',
					opacity: 0
				}, 500);
				return;
			} 
			else if (attWeap.amo > 0) {
				switch (attWeap) {
					case rpg:
						soundRpgExplosion.pause();
						soundRpgExplosion.currentTime = 0;
						soundRpgExplosion.play();
						break;
					case tomahawk:
						soundTomahawkExplosion.pause();
						soundTomahawkExplosion.currentTime = 0;
						soundTomahawkExplosion.play();
				}
				attWeap.amo -= 1
				
				if (attAcc == false) {
					setTimeout(function() {
						blockField(1000);
					}, 50);
					$('.you-missed').animate({
						right: 0,
						opacity: 1
					}, 500).delay(800).animate({
						right: '-278px',
						opacity: 0
					}, 500);
					// Show 1 less amunition, otherwise when the function break out right here, it's too early for running this code
					$('#id-' + attWeap.objectName).text('x' + attWeap.amo);
					checkWinLose();
					return; // Break out of the getAttacked function right away
				} 
				else if (attAcc == true) {
					this.health -= attDam;
					// If target's health level drop bellow 0, its destroyed status become true, you cannot hit it next turn. 
					// Otherwise, you can continue attack it
					if (this.health <= 0) {
						this.destroyStatus = true;
					} else if (this.health > 0) {
						this.destroyStatus = false;
					}
				} 
				else {
					alert('Choose your weapon first!');
				}
			}
		}

		// Show 1 less amunition:
		$('#id-' + attWeap.objectName).text('x' + attWeap.amo);

		// Show how much was the damage:
		$('.' + this.name + '-health-minus').text('-' + addThousandSeparator(attDam) + ' HP').animate({
			opacity: 1,
			height: '50px'
		}, 200).delay(400).animate({
			opacity: 0,
			height: 0
		}, 200);

		// Show less health for target:
		if (this.health >= 0) {
			$('#' + this.name + '-health').text(addThousandSeparator(this.health));
		} else if (this.health < 0) {
			$('#' + this.name + '-health').text('0');
		}
		
		blockField(1100);
		// Show explosion:
		if (attWeap === rpg) {
			$('.big-explosion-' + this.name).fadeIn(500).delay(800).fadeOut(500);
		} else if (attWeap === tomahawk) {
			$('.nuclear-explosion-' + this.name).fadeIn(1000).delay(1000).fadeOut(1000);
		} else if (attWeap === dragunov) {
			$('.fire-ball-' + this.name + '-1').fadeIn(300).delay(500).fadeOut(300);
		}

		// Show targets burning:
		if (this.health <= 0) {
			switch (this) {
				case school:
					soundSchoolFall.pause();
					soundSchoolFall.currentTime = 0;
					soundSchoolFall.play();
					if (workplace.health > 8000) {
						soundFireOne.pause();
						soundFireTwo.pause();
					} else if (workplace.health > 2000) {
						soundFireTwo.pause();
					} 
					break;
				case workplace:
					soundWorkplaceFall.pause();
					soundWorkplaceFall.currentTime = 0;
					soundWorkplaceFall.play();
					if (school.health > 8000) {
						soundFireOne.pause();
						soundFireTwo.pause();
					} else if (school.health > 2000) {
						soundFireTwo.pause();
					} 
					break;
			}
			$('.burning-1-' + this.name).fadeOut(300);
			$('.burning-2-' + this.name).fadeOut(300);
			$('.burning-3-' + this.name).fadeOut(300);
			$('.base-fire-' + this.name).fadeOut(300);
			$('.dust-cloud-' + this.name).fadeIn(1000).delay(500).fadeOut(1000);
			if (this === workplace) {
				setTimeout(function() {
					$('#workplace-img').hide();
					$('.ruin-workplace img').fadeIn(1000);
				}, 1400);	
			} else if (this === school) {
				setTimeout(function() {
					$('#school-img').hide();
					$('.ruin-school img').fadeIn(1000);
				}, 1400);	
			}
		} else if (this.health < 2000) {
			soundFireTwo.pause();
			soundFireTwo.currentTime = 0;
			soundFireTwo.play();
			$('.burning-1-' + this.name).fadeIn(200);
			$('.burning-2-' + this.name).fadeIn(200);
			$('.burning-3-' + this.name).fadeIn(200);
			$('.base-fire-' + this.name).fadeIn(200);
		} else if (this.health < 4000) {
			soundFireOne.pause();
			soundFireOne.currentTime = 0;
			soundFireOne.play();
			$('.burning-1-' + this.name).fadeIn(200);
			$('.burning-2-' + this.name).fadeIn(200);
			$('.burning-3-' + this.name).fadeIn(200);
		} else if (this.health < 6000) {
			soundFireOne.pause();
			soundFireOne.currentTime = 0;
			soundFireOne.play();
			$('.burning-1-' + this.name).fadeIn(200);
			$('.burning-2-' + this.name).fadeIn(200);
		} else if (this.health < 8000) {
			soundFireOne.pause();
			soundFireOne.currentTime = 0;
			soundFireOne.play();
			$('.burning-1-' + this.name).fadeIn(200);
		}

		checkWinLose();
	}
}

let school = new Target('school', 12000, false);
let workplace = new Target('workplace', 10000, false);

// Delay executing the functions so that the animation can be completed before the function's result show up
let timedAttack;

let schoolAttackFunction = function(attWeap) {
	return school.getAttacked(attWeap);
}

let schoolAttacked = function(attWeap) {
	if (attWeap.amo <= 0 || school.destroyStatus === true) {
		return schoolAttackFunction(attWeap);
	} else if (attWeap.amo > 0)	{
		if (attWeap === ak47 || attWeap === mp5) {
			timedAttack = setTimeout(schoolAttackFunction, 900, attWeap);
		} else if (attWeap === dragunov) {
			timedAttack = setTimeout(schoolAttackFunction, 600, attWeap);
		} else if (attWeap === rpg) {
			timedAttack = setTimeout(schoolAttackFunction, 2000, attWeap);
		} else if (attWeap === tomahawk) {
			timedAttack = setTimeout(schoolAttackFunction, 7000, attWeap);
		}
	}
}

let workplaceAttackFunction = function(attWeap) {
	return workplace.getAttacked(attWeap);
}

let workplaceAttacked = function(attWeap) {
	if (attWeap.amo <= 0 || workplace.destroyStatus === true) {
		return workplaceAttackFunction(attWeap);
	} else if (attWeap.amo > 0)	{
		if (attWeap === ak47 || attWeap === mp5) {
			timedAttack = setTimeout(workplaceAttackFunction, 900, attWeap);
		} else if (attWeap === dragunov) {
			timedAttack = setTimeout(workplaceAttackFunction, 600, attWeap);
		} else if (attWeap === rpg) {
			timedAttack = setTimeout(workplaceAttackFunction, 2000, attWeap);
		} else if (attWeap === tomahawk) {
			timedAttack = setTimeout(workplaceAttackFunction, 7000, attWeap);
		}
	}
}
