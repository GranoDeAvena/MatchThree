function ParticleManager () {
	
	var IMG_SIZE = 50;
	var CANVAS_HIEGHT = 700 + IMG_SIZE, CANVAS_WIDTH = 800 + IMG_SIZE;
	var START_SCALE = 0.2;
	var PARTICLSE_NUM = 120;
    
	var IMAGES_PATH = 'assets/images/'; 

	var active_particles = 0;
	var particles = [];

    
    function init () {
		for (var i = 0; i < colors.length; i++) {

			var img = new Image();
			img.src = IMAGES_PATH + 'particle' + (i+1) + '.png';

			AM.addItem( 'img_' + (i+1),   function() { bm = new createjs.Bitmap (img); bm.scaleX = START_SCALE; bm.scaleY = START_SCALE; bm.name='img_' + (i+1); return bm; }, 300 ); 	

			AM.addItem( colors[i], function() { p = new Particle ( ); p.setBitmap( AM.pullItem('img_'+(i+1)) ); p.name = colors[i]; return p; }, 200 ); 
		}
    	
    	for (c of colors) {
    		particles[c] = [];

	        console.log (c);   
			for (var i = 0; i < PARTICLSE_NUM; i++) {              			
	            p =  AM.pullItem( c );
	            particles[c].push (p);  
	        }
    	}	
    	console.log (particles); 
	}
	init();


	this.spawnChip = function (x, y, num, color) {
		for (var i = - (num-1)/2; i <= (num-1)/2; i++) { // num = 7,   (num-1)/2 = 3

            var type = color ? color : getRandomParticle();

            for (var n = 0; n < PARTICLSE_NUM; n++)
				if (! particles[ type ][n].active) {							

            		stage.addChild ( particles[ type ][n].init(x + i, y, i/5, -10, 'chip') );

            		active_particles++;	
					break;	
				}
        }
  	}



	this.spawnBoom = function (x, y, num, color) {
		for (var i = - (num-1)/2; i <= (num-1)/2; i++) { // num = 7,   (num-1)/2 = 3

            var type = color ? color : getRandomParticle();

            for (var n = 0; n < PARTICLSE_NUM; n++)
				if (! particles[ type ][n].active) {

					p = particles[ type ][n];	

					t = (Math.random() * 20 - 10) / 100;  // от - 0.01 .. 0.01												

            		stage.addChild ( p.init( x + i, y, Math.sin ( inRad (i * 360/num) + t*30 ) * 15, Math.cos ( inRad (i * 360/num) + t*30 ) * 15, 'chip') );
            		
            		
            		p.gravity = 1 + t/2;
            		p.dalpha = 0.01 + t/2;
            		p.upscale = 0.01 + t/5;

            		active_particles++;	
					break;	
				}
        }
  	}


	this.spawnSnow = function (x, y, num, color) {
		for (var i = 0; i <= num; i++) { // num = 7,   (num-1)/2 = 3
			setTimeout(function() { createOne() }, 200 * i);
		}

		var i = 0;
		function createOne () {
            var type = color ? color : getRandomParticle();
            

            for (var n = 0; n < PARTICLSE_NUM; n++)
				if (! particles[ type ][n].active) {	

					p = particles[ type ][n];						

            		var t = (Math.random() * 20 - 10);  // от - 10 .. 10
					stage.addChild ( p.init(x + t * 10, y, t / 2, 0, 'snow') );
            		
            		t = (Math.random() * 20 - 10) / 1000;  // от - 0.001 .. 0.001
					p.gravity = 0.01 + t;
            		p.dalpha = 0.0001 + t/2;
            		p.upscale = 0.0001 + t/10;

            		active_particles++;	
					break;	
				}
        }
  	}



	setInterval (update, 25);

	function update () {
		stage.update();
		if (active_particles == 0)
			return;		

		for (var c = 0; c < colors.length; c++) {
			for (var i = 0; i < PARTICLSE_NUM; i++)
				if (particles[colors[c]][i].active)

					switch( particles[colors[c]][i].type ) {				
						case 'chip':
							updateChip(particles[colors[c]][i]);
							break;
						case 'snow':
							updateSnow(particles[colors[c]][i]);
							break;
					}
		}
	}




	function updateChip (p) {
		p.bm.y += 1;

		p.ax *= p.resist;
		//p.ay *= p.resist;
		p.ay += p.gravity;

		p.x += p.ax;
		p.y += p.ay;

		p.bm.x = p.x;
		p.bm.y = p.y; 

		p.bm.alpha -= p.dalpha;

		if ( p.bm.scaleX < 0.8 ) {
			p.bm.scaleX += p.upscale;    	
			p.bm.scaleY += p.upscale;
		}

		p.rotation *= 0.99; // 0.95    (1 - 0.95) /2 + 0.95
		p.bm.rotation += p.rotation;
		

	    if (p.y > CANVAS_HIEGHT || p.x < 0 || p.x > CANVAS_WIDTH || p.bm.scaleX < 0 || p.bm.alpha <= 0) {
	    	destroy(p);
	    }
	}

	function updateSnow (p) {
		p.bm.y += 1;

		p.ax += p.dir * 0.01;
		if (p.ax <= 0) {
			p.dir = 1;
			p.ax = 0;
		}
		if (p.ax >= 1) {
			p.dir = -1;
			p.ax = 1;
		}

		p.ay += p.gravity;

		p.x += Math.sin (p.ax * Math.PI) /2 * p.dir;
		p.y += p.ay;

		p.bm.x = p.x;
		p.bm.y = p.y; 

		p.bm.alpha -= p.dalpha;

		if ( p.bm.scaleX < 1 ) {
			p.bm.scaleX += p.upscale;    	
			p.bm.scaleY += p.upscale;
		}

	    if (p.y > CANVAS_HIEGHT || p.x < 0 || p.x > CANVAS_WIDTH || p.bm.scaleX < 0 || p.bm.alpha <= 0) {
	    	destroy(p);
	    }
	}



	function destroy (p) {
		p.active = false;
		active_particles--;
		stage.removeChild (p);
		p.bm.visible = false;
		//stage.update();
	}


	this.setStage = function (_stage) {
		stage = _stage;
	}



	function getRandomParticle () { 
		var c = getRandomRange(0, colors.length-1);
		return colors[c];
	}
}
