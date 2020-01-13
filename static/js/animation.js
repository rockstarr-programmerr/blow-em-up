
// Buy weapons

// // A function to find left position of each weapon:
let weaponLeftPos;
function findWeaponPosition(weaponObject) {
	let weaponIndex = player.arsenal.indexOf(weaponObject);
	switch (weaponIndex) {
		case 0:
			weaponLeftPos = '300px';
			break;
		case 1:
			weaponLeftPos = '375px';
			break;
		case 2:
			weaponLeftPos = '450px';
			break;
		case 3:
			weaponLeftPos = '525px';
			break;
		case 4:
			weaponLeftPos = '600px';
			break;
		default:
			weaponLeftPos = '300px';
	}
	return weaponLeftPos;
}

// // Animation of the buy weapon process:

$('.store-ak47-img').click(function() {
	if ((adjustedBudget + ak47.price) >= ak47.price) {
		$('.flying-ak47').animate({
			opacity: '1',
			top: '300px',
			left: '0'
		}, 0).animate({
			top: '550px',
			left: findWeaponPosition(ak47),
			width: '75px',
			height: '75px'
		}, 300, 'linear').animate({
			opacity: '0',
			top: '300px',
			left: '-100px',
			width: '100px',
			height: '78px'
		}, 0);
	}
});

$('.store-dragunov-img').click(function() {
	if ((adjustedBudget + dragunov.price) >= dragunov.price) {
		$('.flying-dragunov').animate({
			opacity: '1',
			top: '380px',
			left: '0'
		}, 0).animate({
			top: '550px',
			left: findWeaponPosition(dragunov),
			width: '75px',
			height: '75px'
		}, 300, 'linear').animate({
			opacity: '0',
			top: '300px',
			left: '-100px',
			width: '100px',
			height: '78px'
		}, 0);
	}
});

$('.store-mp5-img').click(function() {
	if ((adjustedBudget + mp5.price) >= mp5.price) {
		$('.flying-mp5').animate({
			opacity: '1',
			top: '460px',
			left: '0'
		}, 0).animate({
			top: '550px',
			left: findWeaponPosition(mp5),
			width: '75px',
			height: '75px'
		}, 300, 'linear').animate({
			opacity: '0',
			top: '300px',
			left: '-100px',
			width: '100px',
			height: '78px'
		}, 0);
	}	
});

$('.store-rpg-img').click(function() {
	if ((adjustedBudget + rpg.price) >= rpg.price) {
		$('.flying-rpg').animate({
			opacity: '1',
			top: '540px',
			left: '0'
		}, 0).animate({
			top: '550px',
			left: findWeaponPosition(rpg),
			width: '75px',
			height: '75px'
		}, 300, 'linear').animate({
			opacity: '0',
			top: '300px',
			left: '-100px',
			width: '100px',
			height: '78px'
		}, 0);
	}	
});

$('.store-tomahawk-img').click(function() {
	if ((adjustedBudget + tomahawk.price) >= tomahawk.price) {
		$('.flying-tomahawk').animate({
			opacity: '1',
			top: '620px',
			left: '0'
		}, 0).animate({
			top: '550px',
			left: findWeaponPosition(tomahawk),
			width: '75px',
			height: '75px'
		}, 300, 'linear').animate({
			opacity: '0',
			top: '300px',
			left: '-100px',
			width: '100px',
			height: '78px'
		}, 0);
	}
});	

/* Animation of the attacking phase */
let targetLeftPos;
function findTargetPosition(target) {
	if (target === workplace) {
		targetLeftPos = '390px';
	} else if (target === school) {
		targetLeftPos = '770px';
	}
	return targetLeftPos;
}

for (let target of [school, workplace]) {
	$('.' + target.name + '-img-container').click(function() {
		if ((attWeap === ak47 || attWeap === mp5) && (attWeap.amo > 0 && target.destroyStatus == false)) {
			switch (attWeap) {
				case ak47:
					soundAk47Shot.pause();
					soundAk47Shot.currentTime = 0;
					soundAk47Shot.play();
					break;
				case mp5:
					soundMp5Shot.pause();
					soundMp5Shot.currentTime = 0;
					soundMp5Shot.play();
					break;
			}
			blockField(attWeap.animationTime*3);
			for (i = 0; i < 3; i++) {
				$('.' + attWeap.objectName + '-bullet').animate({
					opacity: '1',
					top: '510px',
					left: findWeaponPosition(attWeap)
				}, 0).animate({
					top: '140px',
					left: findTargetPosition(target)
				}, attWeap.animationTime, 'linear').animate({
					opacity: 0,
					left: '-50px'
				}, 0);
			}
			// Explosion animations:
			setTimeout(function() {
				$('.fire-ball-' + target.name + '-1').fadeIn(300).delay(500).fadeOut(300);
			}, attWeap.animationTime);
			setTimeout(function() {
				$('.fire-ball-' + target.name + '-2').fadeIn(300).delay(500).fadeOut(300);
			}, attWeap.animationTime*2);
			setTimeout(function() {
				$('.fire-ball-' + target.name + '-3').fadeIn(300).delay(500).fadeOut(300);
			}, attWeap.animationTime*3);
		} else if ((attWeap === dragunov || attWeap === rpg || attWeap === tomahawk) && (attWeap.amo > 0 && target.destroyStatus == false)) {
			switch (attWeap) {
				case dragunov:
					soundDragunovShot.pause();
					soundDragunovShot.currentTime = 0;
					soundDragunovShot.play();
					break;
				case rpg:
					soundRpgShot.pause();
					soundRpgShot.currentTime = 0;
					soundRpgShot.play();
					break;
				case tomahawk:
					soundTomahawkShot.pause();
					soundTomahawkShot.currentTime = 0;
					soundTomahawkShot.play();
					break;	
			}
			blockField(attWeap.animationTime);
			$('.' + attWeap.objectName + '-bullet').animate({
				opacity: '1',
				top: '510px',
				left: findWeaponPosition(attWeap)
			}, 0).animate({
				top: '140px',
				left: findTargetPosition(target)
			}, attWeap.animationTime, 'linear').animate({
				opacity: 0,
				left: '-50px'
			}, 0);
			// Dragunov, RPG, Tomahawk explosion animation is inside of Target.getAttacked() instead
		} else {
			soundEmptyReload.pause();
			soundEmptyReload.currentTime = 0;
			soundEmptyReload.play();
		}
	});	
}

// General animations

window.onload = function() {
	$('#before-window-load-block').hide();
	$('#game-container-block').show();
	$('.mute-sound').animate({
		opacity: 0
	}, 0);
	$('.mute-sound').show();
	$('#before-start-game-screen').animate({
		top: 0,
		opacity: 1
	}, 700);
}

$('#before-start-game-btn').click(function() {
	soundStartGame.pause();
	soundStartGame.currentTime = 0;
	soundStartGame.play();
	$('#before-start-game-screen').animate({
		top: '-2000px',
		opacity: 0
	}, 700);
	$('#start-game-screen').delay(700).animate({
		top: '150px',
		opacity: 1
	}, 700);
	$('.mute-sound').delay(700).animate({
		opacity: 1
	}, 700);
});

$('#start-game-btn').click(function() {
	$('#sound-start-game').animate({volume: 0}, 2000);
	setTimeout(function() {
		soundStartGame.pause();
		soundBackground.pause();
		soundBackground.currentTime = 0;
		soundBackground.play();
	}, 3000);
	$('#game-container-block').hide()
	$('.mute-sound').animate({
		top: '20px',
		left: '10px'
	}, 0);
	$('#start-game-screen').animate({
		top: '-500px',
		opacity: 0
	}, 700);
	document.querySelector('#sound-button').style.color = '#f2f2f2';
});

// Mute sound button:
let soundOn = true;
$('.mute-sound').click(function() {
	if (soundOn === true) {
		document.querySelector('#sound-button').setAttribute('class', 'fas fa-volume-mute');
		soundOn = false;
		for (let sound of arrayOfSounds) {
			if (sound.volume > 0) {
				sound.volume = 0;
			}
		}
	} else if (soundOn === false) {
		document.querySelector('#sound-button').setAttribute('class', 'fas fa-volume-up');
		soundOn = true;
		for (let sound of arrayOfSounds) {
			if (sound.volume === 0) {
				sound.volume = 1;
			}
		}
	}
});
