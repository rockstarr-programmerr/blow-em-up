let timedAnimation;

function blockField(milisecond) {
	$('.blocker').show();
	timedAnimation = setTimeout(function() {
		$('.blocker').hide();
	}, milisecond);
}

// Buy weapons:
for (let weapon of weaponArray) {
	$('.store-' + weapon.objectName + '-img').click(function() {
		player.buyWeapon(weapon.objectName);
	});
}

// Attack targets:
let attTar;
$('.workplace-img-container').click(function() {
	attTar = workplace;
	if (attTar.health > 0) {
		attWeap.withdrawAttack(school, workplace);
	}
	workplaceAttacked(attWeap);
});

$('.school-img-container').click(function() {
	attTar = school;
	if (attTar.health > 0) {
		attWeap.withdrawAttack(school, workplace);
	}
	schoolAttacked(attWeap);
});


// Real win:
function stopExecution() {
	clearTimeout(timedAttack);
	clearTimeout(timedAnimation);
}

$('#mercy-1-option-1').click(function() {
	soundTomahawkShot.pause();
	$('#mercy-1-box').hide();
	stopExecution();
	$('.tomahawk-bullet').finish();
	if (attTar === workplace) {
		workplaceAttackFunction(attWeap);
	} else if (attTar === school) {
		schoolAttackFunction(attWeap);
	};
	$('.blocker').hide();
});

$('#mercy-1-option-2').click(function() {
	soundTomahawkShot.pause();
	stopExecution();
	$('.tomahawk-bullet').stop(true);
	$('#mercy-1-box').hide();
	$('#mercy-2-box').delay(1500).fadeIn(500);
});

$('#mercy-2-option-1').click(function() {
	$('.tomahawk-bullet').animate({
		opacity: 0,
		left: '-50px'
	}, 0);
	$('.blocker').hide();
	if (attTar === workplace) {
		workplaceAttackFunction(attWeap);
	} else if (attTar === school) {
		schoolAttackFunction(attWeap);
	}
	$('#mercy-2-box').hide();
});

$('#mercy-2-option-2').click(function() {
	soundClockTicking.pause();
	soundClockTicking.currentTime = 0;
	soundClockTicking.play();
	setTimeout(function() {
		soundFireOne.pause();
		soundFireTwo.pause();
	}, 14000);
	setTimeout(function() {
		soundClockTicking.pause();
		$(soundBackground).animate({volume: 0}, 4000);
	}, 10000);
	$('.tomahawk-bullet').animate({
		top: '550px',
		left: findWeaponPosition(tomahawk),
		width: '75px',
		height: '75px'
	}, 10000, 'linear').animate({
		opacity: '0',
		top: '300px',
		left: '-100px',
		width: '100px',
		height: '78px'
	}, 0);
	$('#mercy-2-box').hide();
	// Finally, animate the REAL win!!
	setTimeout(function() {
		soundBackground.pause();
		soundRealWin.pause();
		soundRealWin.currentTime = 0;
		soundRealWin.play();
	}, 14000);
	$('#game-container-block').delay(14000).fadeIn(300);
	$('#real-win-congratulation').text("Congratulation! You've beaten the game because you are a warm-hearted person. You have mercy even on those that hurted you. More hearts like yours are what the world needs. Fill it with love and kindness, it's the only way to beat the game of life :)")
	$('#result-real-win').delay(14000).animate({
		top: '150px',
		opacity: 1
	}, 700);
});


