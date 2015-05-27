
function levelPreload() {
	// code valable pour tous les niveaux
}
function levelCreate() {
	// code valable pour tous les niveaux
}
function levelUpdate() {
	// code valable pour tous les niveaux
}

BasicGame Level1 = function(game) {
	this.tilemapMap = [map du niveau];
	this.lummings = [position des lummings a creer];
	this.doors = [idem pour les portes];
	// etc, mais toujours des trucs spécifiques au niveau, rien de général
}
BasicGame.Level1.prototype = {preload: levelPreload, create: levelCreate, update: levelUpdate};

BasicGame Level2 = function(game) {
	this.tilemapMap = [map du niveau];
	this.lummings = [position des lummings a creer];
	this.doors = [idem pour les portes];
	// etc, mais toujours des trucs spécifiques au niveau, rien de général
}
BasicGame.Level2.prototype = {preload: levelPreload, create: levelCreate, update: levelUpdate};

BasicGame Level3 = function(game) {
	this.tilemapMap = [map du niveau];
	this.lummings = [position des lummings a creer];
	this.doors = [idem pour les portes];
	// etc, mais toujours des trucs spécifiques au niveau, rien de général
}
BasicGame.Level2.prototype = {preload: levelPreload, create: levelCreate, update: levelUpdate};


