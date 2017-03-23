function ParticleManager () {
		
	// General
	this.init = function(){
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

	//AM.addItem( Particle );// !!

	/*for (var i = 0; i < amount || 5; i++) {
		AM.putItem( new Particle() );
	}*/


	var _types = {};
	this.types = {};


	this.addParticleType = function( type, p_init, p_behaviour, p_destroy, amount ){
		
		this.types[ type ] = type.toUpperCase();

		_types[ type ] = {
			init: p_init,
			behaviour: p_behaviour,
			destroy: p_destroy
		}
	}
	
	var particles = [];

	this.addParticle = function( type, params ){
		
		for (var i = 0; i < (params.amount || 1); i++) {
			//var particle = AM.pullItem( AM.items.PARTICLE );
			var particle = AM.pullItem( type );
			var particle_type = particle.type = _types[ type ];

			particle = particle_type.init( particle, params );

			// particle.behaviour = particle_type.behaviour;
			particles.push( particle );	
		}
	}

	this.update = function(){

		for (var i = 0; i < particles.length; i++) {
			
			var particle = particles[ i ];

			var particle_type = particle.type;
			
			if( particle_type.behaviour( particle ) ) {// true - the particle must be destroyed
				particle_type.destroy( particle );
				particles.splice (i, 1);
				if( i!=0 )i--;
			}
		}
	}
}
