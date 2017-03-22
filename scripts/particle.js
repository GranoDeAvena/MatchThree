var IMG_SIZE = 50;
var START_SCALE = 0.3;


function Particle(){
	var x, y, ax, ay, resist = 0.97, gravity = 1.5, upscale = 0.002, rotation = 0, variability = 40;

	var stage, bm;

	this.bm = bm;
	this.type;
	this.active = false;
	this.x;
	this.y;
	this.ax;
	this.ay;
	this.dalpha;
	this.resist;
	this.gravity;
	this.upscale;

	this.type;

	this.setBitmap = function (bm) {
		this.bm = bm;		
	} 


	this.init = function( _x, _y, _ax, _ay, _type){	

		this.active = true;
		this.bm.visible = true;
		this.type = _type;

		this.bm.scaleX = START_SCALE;    	
		this.bm.scaleY = START_SCALE;
		this.bm.alpha = 1;
		

		var t = (Math.random() * variability - variability/2) / 100;  // от - 0.2 .. 0.2
		
		//this.bm = bm;

		this.x = _x + t * 10;
		this.y = _y + t * 5;
		this.ax = _ax + t;
		this.ay = _ay;
		this.dir = -1;

		t = (Math.random() * variability - variability/2) / 100;  // от - 0.2 .. 0.2
		
		this.dalpha = 0.05 + t/4;
		this.resist = resist;
		this.gravity = gravity + t;
		this.upscale = upscale + t/20;

		this.bm.scaleX += (upscale)*10;    	
		this.bm.scaleY += (upscale)*10;

		this.bm.regX = IMG_SIZE/2;
		this.bm.regY = IMG_SIZE/2;
		
		this.bm.x = _x;
		this.bm.y = _y;	

		return this.bm;	
	}


	this.destroy = function () {
		this.bm.scaleX = START_SCALE;    	
		this.bm.scaleY = START_SCALE;
		this.bm.alpha = 1;
		AM.putItem (this.bm.name, this.bm);		
	}	
	return bm;
}