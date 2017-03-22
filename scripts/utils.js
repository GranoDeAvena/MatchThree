

	function getRandomRange (min, max) {
	  	return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function checkExist (obj, arr) {
		for(var i = 0; i < arr.length; i++)
			if (arr[i] ==  obj)
				return true;
		return false;
	}

	
	function inRad(num) {
		return num * Math.PI / 180;
	}