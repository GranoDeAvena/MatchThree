function AssetManager () {

	var assets = {};

	var EXTRA_AMOUNT = 50;

	var objects = [];

	var min = [], amount = [];


	this.addItem = function( _type, _obj, _amount ){
		var a = assets[ _type ] = [];
		min [ _type] = _amount;
		amount [ _type] = _amount;
		objects[ _type] = _obj;
		// var $obj = $( _obj );
		for (var i = 0; i < _amount; i++) {
			a.push( _obj() );
		}
	}



	this.pullItem = function( _type ){
		var a = assets[ _type ]; 

		if ( a.length < min[ _type] )
			min[ _type] = a.length;

		if (a.length < 70) {
			
			if (a.length < 40)
				console.info ('!! "' + _type + '" = ' + a.length);
			else
				console.info ('! "' + _type + '" = ' + a.length);		
		}

		if (a.length < 1) return addExtraItems ( _type);
		return a.pop();
	}

	

	this.putItem = function( _type, _obj ){
		assets[ _type ].push( _obj );
	}


	function addExtraItems ( _type) {
		console.info ('!!! Add ' + EXTRA_AMOUNT + ' extra items of "' + _type + '"');
		this.addItem (_type, objects[ _type ], EXTRA_AMOUNT);
		var a = assets[ _type ];
		return a.pop();
	}

}

var AM = new AssetManager();

