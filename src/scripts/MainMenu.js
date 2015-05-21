BasicGame.MainMenu = function (game){
this.background2 = null;
};

BasicGame.MainMenu.prototype = {

	preload: function (){
	this.background2 = this.add.sprite(0, 0, 'preloaderBackground2');
	this.background2.scale.set(1024/800, 768/600);

		},
	create: function (){
	},

	update: function (){

	}
};
