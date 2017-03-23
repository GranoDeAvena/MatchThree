function GameParticleManager (PM, stage, STAGE_HIEGHT, STAGE_WIDTH) {
	//var PM = new ParticleManager();

	function init () {		
		var IMAGES_PATH = 'assets/images/'; 

		for (var i = 0; i < colors.length; i++) {

			var img = new Image();
			img.src = IMAGES_PATH + 'particle' + (i+1) + '.png';

			AM.addItem( colors[i] + '_PIC' ,   function() { bm = new createjs.Bitmap (img); bm.scaleX = START_SCALE; bm.scaleY = START_SCALE; bm.name=colors[i] + '_PIC' ; return bm; }, 300 ); 	

			//AM.addItem( colors[i], function() { p = new Particle ( ); p.setBitmap( AM.pullItem('img_'+(i+1)) ); p.name = colors[i]; return p; }, 200 ); 
		}

		var img = new Image();
		img.src = IMAGES_PATH + 'particle' + 4 + '.png';


		AM.addItem( 'SNOW_PIC',   function() { bm = new createjs.Bitmap (img); bm.scaleX = START_SCALE; bm.scaleY = START_SCALE; bm.name='SNOW_PIC'; return bm; }, 300 ); 	
		AM.addItem( 'SNOW',  function() { p  = new Particle ( ); p.name = 'SNOW'; return p; }, 250 ); 

		/*var img = new Image();
		img.src = IMAGES_PATH + 'particle' + 1 + '.png';


		AM.addItem( 'CHIP_PIC',   function() { bm = new createjs.Bitmap (img); bm.scaleX = START_SCALE; bm.scaleY = START_SCALE; bm.name='CHIP_PIC'; return bm; }, 300 ); 	
		AM.addItem( 'CHIP',  function() { p  = new Particle ( ); p.name = 'CHIP'; return p; }, 250 ); */

	}
	init();

	// Add layers
	var background_layer = PM.addLayer( "BACKGROUND", new createjs.Container() );
	stage.addChild( background_layer );
	setInterval ( PM.update , 25);




	// Particle by type
	PM.addParticleType( "SNOW", snowInit, snowUpdate, snowDestory ); 
	console.log ('Add type "' + PM.types.SNOW + '"');

	function snowInit( particle, params ){
		//particle.init();
		//particle.type = PM.types.SNOW;
		
		//particle.sprite_type = AM.types.BLUE_BLOCK; //  Math.random()>.5 ? AM.types.RED_BLOCK : AM.types.BLUE_BLOCK;
		//particle = AM.pullItem ('SNOW');
		particle.sprite_type = 'SNOW';
		var sprite = particle.sprite = AM.pullItem( 'SNOW_PIC' );

		var offset = 1, m_offset = .1;

		var t = Math.random()*0.005; // 0 .. 0.005

		sprite.x = params.x + getRandomRange(-offset*100,offset*100);
		sprite.y = params.y + getRandomRange(-offset,offset);
		
		particle.speed_x = getRandomRange(-offset,offset)/2;
		particle.speed_y = Math.random()*2;
		particle.dir = 1;
		particle.weight = 0.01;
		particle.resist = 0.99;	

		sprite.scaleX = t*50;
		sprite.scaleY = t*50;		
		particle.upscale = t/2;
		
		sprite.alpha = Math.random()*.3+.7;
		particle.dalpha = Math.random()*m_offset/100;
		
		particle.life = getRandomRange(1,10);
		particle.layer = params.layer ? params.layer : PM.layers.BACKGROUND;
		particle.layer.addChild( sprite );	

		return particle;	
	}

	var sprite;
	function snowUpdate( particle ) {

		particle.speed_x += particle.dir * 0.01;
		if (particle.speed_x <= 0) {
			particle.dir = 1;
			particle.speed_x = 0;
		}
		if (particle.speed_x >= 1) {
			particle.dir = -1;
			particle.speed_x = 1;
		}

		particle.speed_y += particle.weight;
		
		sprite = particle.sprite;
		sprite.alpha -= particle.dalpha;
		sprite.x += Math.sin (particle.speed_x * Math.PI)  * particle.dir;
		sprite.y += particle.speed_y;

		//if ( particle.x < 0 || particle.x > DATA.STAGE_WIDTH || particle.alpha <= 0 ) return true;
		if (sprite.y > STAGE_HIEGHT || sprite.x < 0 || sprite.x > STAGE_WIDTH || sprite.scaleX <= 0 || sprite.alpha <= 0) return true;
		return false;
	}

	function snowDestory( particle ){
		//console.log ('Destroy ' + particle.type);

		AM.putItem( particle.sprite_type, particle.sprite );
		PM.layers.BACKGROUND.removeChild( particle.sprite );

		AM.putItem( 'SNOW', particle );
	}




	// Particle by type
	PM.addParticleType( "CHIP", chipInit, chipUpdate, chipDestory ); 
	console.log ('Add type "' + PM.types.CHIP + '"');

	function chipInit( particle, params ){

		particle.sprite_type = params.color ? params.color + '_PIC' : getRandomColor() + '_PIC';
		var sprite = particle.sprite = AM.pullItem( particle.sprite_type );

		var offset = 4, m_offset = .1;

		var t = Math.random()*0.004 + 0.001; // 0.001 .. 0.005

		sprite.x = params.x + getRandomRange(-offset,offset);
		sprite.y = params.y + getRandomRange(-offset,offset);
		
		particle.speed_x = params.speed_x ? params.speed_x : getRandomRange(-offset,offset)*2;
		particle.speed_y = params.speed_y ? params.speed_y : getRandomRange(-offset,offset)/2;	
		particle.weight = 1;	
		particle.resist = 1 - t*10;	

		sprite.scaleX = t*50;
		sprite.scaleY = t*50;		
		particle.upscale = t/2;
		
		sprite.alpha = Math.random()*.3+.7;
		particle.dalpha = Math.random()*m_offset/10;
		
		particle.life = getRandomRange(1,10);
		particle.layer = params.layer ? params.layer : PM.layers.BACKGROUND;
		particle.layer.addChild( sprite );	

		return particle;	
	}

	var sprite;
	function chipUpdate( particle ) {
		
		particle.speed_x *= particle.resist;
		particle.speed_y += particle.weight;
		
		sprite = particle.sprite;
		sprite.alpha -= particle.dalpha;
		sprite.x += particle.speed_x;
		sprite.y += particle.speed_y;

		if ( sprite.scaleX < 1 ) {
			sprite.scaleX += particle.upscale;    	
			sprite.scaleY += particle.upscale;
		}

		//if ( particle.x < 0 || particle.x > DATA.STAGE_WIDTH || particle.alpha <= 0 ) return true;
		if (sprite.y > STAGE_HIEGHT || sprite.x < 0 || sprite.x > STAGE_WIDTH || sprite.scaleX <= 0 || sprite.alpha <= 0) return true;
		return false;
	}

	function chipDestory( particle ){
		//console.log ('Destroy ' + particle.type);

		AM.putItem( particle.sprite_type, particle.sprite );
		PM.layers.BACKGROUND.removeChild( particle.sprite );

		AM.putItem( 'CHIP', particle );
	}



	this.chips = function(_x, _y, _amount, _color) {		
		PM.addParticle( PM.types.CHIP, {x:_x, y:_y, amount:_amount, color: _color, speed_x: Math.sin ( inRad (i * 360/amount) ) * 15, speed_y: Math.cos ( inRad (i * 360/amount) ) * 15, layer:PM.layers.BACKGROUND} );
	}

	this.boom = function(_x, _y, amount) {

		for (var i = 0; i < amount; i++) {
			PM.addParticle( PM.types.CHIP, {x:_x, y:_y, speed_x: Math.sin ( inRad (i * 360/amount) ) * 15, speed_y: Math.cos ( inRad (i * 360/amount) ) * 15, layer:PM.layers.BACKGROUND} );
		}
	}

}
