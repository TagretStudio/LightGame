
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.spritesheet('button', 'assets/stupidbutton.png', 30, 30); //TODO button
}

var cursors;
var button; //TODO button
var menu; //TODO menu (ensemble de boutons)
var menuPosition; //TODO menu

function create() {
	//  background
	game.add.sprite(0, 0, 'sky');

	button = game.add.button(game.world.width-30, 0, 'button', toggleMenu, this, 2, 1, 0); //TODO button pas compris 2,1,0
	button.onInputOver.add(over, this);
	button.onInputOut.add(out, this);
	button.onInputUp.add(up, this);

	menu = game.add.group(); //TODO menu
	menuPosition = game.world.width;
	menu.add(game.make.button(menuPosition, 100, 'button', togglePlayerGravity, this, 2,1,0));
	menu.add(game.make.button(menuPosition, 140, 'button', toggleCrateGravity, this, 2,1,0));
}

// { TODO button
function up() {
	console.log('button up', arguments);
}

function over() {
	console.log('button over');
}

function out() {
	console.log('button out');
}

function toggleMenu() {
	menuStep = 0;
	if (menuPosition == game.world.width) {
		menuPosition -= 60;
		menu.forEach(
				function(butt) {
					butt.x += Math.round(Math.random()*4)*15;
				}
			    );
	} else {
		menuPosition += 60;
	}
}

function togglePlayerGravity() {
	player.body.gravity.y *=-1;
}

function toggleCrateGravity() {
	crate.body.gravity.y *=-1;
}
// } TODO button

function update() {
	//TODO button
	menu.forEach(
			function(butt) {
				butt.x += (menuPosition-butt.x)/4;
			}
		    );
}

