function Sound () {
	/*var hit = new Audio( 'sounds/hit.mp3'); 
	var lose = new Audio( 'sounds/lose.mp3'); 
	var move = new Audio( 'sounds/move.mp3'); 
	var rotate = new Audio( 'sounds/rotate.mp3'); 
	var row = new Audio( 'sounds/row.mp3'); 
	var step = new Audio( 'sounds/step.mp3'); 
	var done = new Audio( 'sounds/done.mp3');*/ 



	if (!createjs.Sound.initializeDefaultPlugins())
		return;
		


	var audioPath = "assets/sounds/";
	var sounds = [
	    {id:"done", src:"done.ogg"},
	    {id:"hit", src:"hit.ogg"},
	    {id:"lose", src:"lose.ogg"},
	    {id:"move", src:"move.ogg"},
	    {id:"rotate", src:"rotate.ogg"},
	    {id:"row", src:"row.ogg"},
	    {id:"step", src:"step.ogg"}
	];

	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.registerSounds(sounds, audioPath);


	var is_on = false;


	this.setState = function(b) {
	    is_on = b;
	};	

	this.hit = function() {
		if (is_on)
	    	createjs.Sound.play("hit");
	    	//hit.play();
	};

	this.lose = function() {
		if (is_on)
	    	createjs.Sound.play("lose");
	    	//lose.play();
	};

	this.move = function() {
		if (is_on)
	    	createjs.Sound.play("move");
	    	//move.play();
	};

	this.rotate = function() {
		if (is_on)
	    	createjs.Sound.play("rotate");
	    	//rotate.play();
	};

	this.row = function() {
		if (is_on)
	    	createjs.Sound.play("row");
	    	//row.play();
	};

	this.step = function() {
		if (is_on)
	    	createjs.Sound.play("step");
	    	//step.play();	    
	};

	this.done = function() {
		if (is_on)
	    	createjs.Sound.play("done");
	    	//done.play();
	};


}
