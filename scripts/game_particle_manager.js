
// External Code
// --

// Main nitialization
var PM = new ParticleManager();

// Add layers
var background_layer = PM.addLayer( "BACKGROUND", new cjs.Container() );
stage.addChild( background_layer );



// Particle by type
PM.addParticleType( "SNOW", snowInit, snowUpdate, snowDestory ); 

function snowInit( particle, params ){

	particle.type = PM.types.SNOW;
	
	particle.sprite_type = Math.random()>.5 ? AM.types.RED_BLOCK : AM.types.BLUE_BLOCK;
	var sprite = particle.sprite = AM.pullItem( particle.sprite_type );
	sprite.x = params.x + getRandomRange(-10,10);
	sprite.y = params.y + getRandomRange(-10,10);
	sprite.alpha = Math.random()*.5+.5;

	particle.speed_x = getRandomRange(-10,10);
	particle.speed_y = getRandomRange(-10,10);
	particle.life = getRandomRange(1,10);

	PM.layers[ params.layer ].addChild( sprite );

}

function snowUpdate( particle ){
	
	particle.speed_x *= .95;
	particle.speed_y += 1;
	particle.x += particle.speed_x;
	particle.y += particle.speed_y;
	particle.alpha -= .1;

	var sprite = particle.sprite;
	sprite.x = particle.x;
	sprite.y = particle.y;

	if( particle.x < 0 || particle.x > DATA.STAGE_WIDTH || particle.alpha <= 0 ) return true;
	return false;

}

function snowDestory( particle ){

	AM.putItem( particle.sprite, particle.sprite_type );
	PM.layers.BACKGROUND.removeChild( particle.sprite );

	AM.putItem( particle );

}





/// ingame functionality
PM.addParticle( PM.types.SNOW, {x:10, y:10, layer:PM.layers.BACKGROUND} );









// PM
// --
	
	// General
	this.init(){

	}

	this.destroy = function(){

	}

	this.removeAllParticles = function(){

	}

	// Layers
	this.layers = {};

	this.addLayer = function( id, layer ){
		this.layers[ id ] = layer;
		return layer;
	}

	// Particles

	AM.addItemType( Particle );// !!

	for (var i = 0; i < amount || 5; i++) {
		AM.putItem( new Particle() );
	}


	var _types = {};
	this.types = {};


	this.addParticleType = function( type, p_init, p_behaviour, p_destroy, amount ){
		
		types[ type ] = type.toUpperCase();

		_types[ type ] = {
			init: p_init,
			behaviour: p_behaviour
			destroy: p_destroy
		}

	}
	
	var particles = [];

	this.addParticle = function( type, params ){
		
		for (var i = 0; i < params.amount || 1; i++) {
			var particle = AM.pullItem( AM.items.PARTICLE );
			var particle_type = _types[ type ];
			particle_type.init( particle );
			// particle.behaviour = particle_type.behaviour;
			particles.push( particle );	
		}
		
	}

	this.update = function(){

		for (var i = 0; i < particles.length; i++) {
			
			var particle = particle[ i ];
			var particle_type = _types[ particle.type ];
			
			if( particle_type.behaviour( particle ) ){// true - the particle must be destroyed
				particle_type.destroy( particle );
				if( i!=0 )i--;
			}
			//particle.behaviour( particle );
		}
	}

// =====================================================