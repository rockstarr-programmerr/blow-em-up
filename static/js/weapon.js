// Sound effects:
let soundStartGame = document.querySelector('#sound-start-game');
let soundAk47Shot = document.querySelector('#sound-ak47-shot');
let soundMp5Shot = document.querySelector('#sound-mp5-shot');
let soundDragunovShot = document.querySelector('#sound-dragunov-shot-explosion');
let soundRpgShot = document.querySelector('#sound-rpg-shot');
let soundTomahawkShot = document.querySelector('#sound-tomahawk-shot');
let soundGunReload = document.querySelector('#sound-gun-reload');
let soundEmptyReload = document.querySelector('#sound-empty-reload');
let soundRpgExplosion = document.querySelector('#sound-rpg-explosion');
let soundTomahawkExplosion = document.querySelector('#sound-tomahawk-explosion');
let soundBuying = document.querySelector('#sound-buying');
let soundNoMoney = document.querySelector('#sound-no-money');
let soundSchoolFall = document.querySelector('#sound-school-fall');
let soundWorkplaceFall = document.querySelector('#sound-workplace-fall');
let soundFireOne = document.querySelector('#sound-fire-1');
let soundFireTwo = document.querySelector('#sound-fire-2');
let soundClockTicking = document.querySelector('#sound-clock-ticking');
let soundBackground = document.querySelector('#sound-background');
let soundRealWin = document.querySelector('#sound-real-win');
let soundLose = document.querySelector('#sound-lose');

soundFireOne.loop = true;
soundFireTwo.loop = true;
soundStartGame.loop = true;
soundBackground.loop = true;

let arrayOfSounds = [soundStartGame, soundAk47Shot, soundMp5Shot, soundDragunovShot, soundRpgShot, soundTomahawkShot, soundGunReload, soundEmptyReload, soundRpgExplosion, soundTomahawkExplosion, soundBuying, soundNoMoney, soundSchoolFall, soundWorkplaceFall, soundFireOne, soundFireTwo, soundClockTicking, soundBackground, soundRealWin, soundLose]

let attWeap; // The attack's weapon object

function Weapon(name, objectName, damage, originalAmo, amo, accuracy, price, imgUrl, animationTime) {
	this.name = name;
	this.objectName = objectName;
	this.damage = damage;
	this.originalAmo = originalAmo;
	this.amo = amo;
	this.accuracy = accuracy;
	this.price = price;
	this.imgUrl = imgUrl;
	this.animationTime = animationTime;

	this.attack = function() {
		if (this.amo <= 0) {
			soundEmptyReload.pause();
			soundEmptyReload.currentTime = 0;
			soundEmptyReload.play();
			blockField(1800);
			$('.out-of-amo').animate({
				right: 0,
				opacity: 1
			}, 500).delay(800).animate({
				right: '-278px',
				opacity: 0
			});
		} else if (this.amo > 0) {
			attWeap = this;
			// Play sound:
			soundGunReload.pause();
			soundGunReload.currentTime = 0;
			soundGunReload.play();
		}
	}

	this.withdrawAttack = function(school, workplace) {
		if (school.health > 4500 || workplace.health > 4500) {
			return;
		}
		else if ((school.health <= 4500 && workplace.health <= 4500) && (this === tomahawk) && (this.amo > 0)) {
			$('#mercy-1-box').fadeIn(500).delay(5500).fadeOut(1);
		}
	}
}

let ak47 = new Weapon('AK47', 'ak47', 400, 7, 7, 80, 5000, 'static/img/weapons/ak47.png', 300);
let dragunov = new Weapon('Dragunov', 'dragunov', 600, 5, 5, 75, 7500, 'static/img/weapons/dragunov.png', 600);
let mp5 = new Weapon("American spy's gun", 'mp5', 200, 2, 2, 95, 3000, 'static/img/weapons/mp5.png', 300);
let rpg = new Weapon('Russian RPG', 'rpg', 1000, 4, 4, 80, 9000, 'static/img/weapons/rpg.png', 2000);
let tomahawk = new Weapon('Tomahawk missile', 'tomahawk', 2000, 2, 2, 70, 10000, 'static/img/weapons/tomahawk.png', 7000);

let weaponArray = [ak47, dragunov, mp5, rpg, tomahawk];