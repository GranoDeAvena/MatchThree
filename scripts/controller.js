
var pause_label = document.getElementById('pause-label');


function Controller (){

	var dx, dy;
	var DELTA_SWIP_X = 30;
	var DELTA_SWIP_Y = 30;

	var mouse_pressed = false;
	var mouse_pos = {
		x: 0,
		y: 0
	};

	var swip_event = new Event("swipe");
	var click_event = new Event("click");


	var swipe = {
		x1: 0,
		y1: 0,
		x2: 10, 
		y2: 10
	};


	function startup() {
		//window.ontouchmove = undefined;
	    var el = document.getElementById('ui-canvas');
	    el.addEventListener ("touchstart", mousedown, false);
	    el.addEventListener ("touchend", mouseup, false);
	    //el.addEventListener ("touchcancel", handleCancel, false);
	    el.addEventListener ("touchmove", mousemove, false);

	    el.ontouchstartn = mousedown;
	    el.ontouchend = mouseup;
	    //el.addEventListener ("touchcancel", handleCancel, false);
	    el.ontouchmove = mousemove;

	    el.addEventListener ("mousedown", mousedown , false);
	    el.addEventListener ("mouseup",  mouseup , false);
	    el.addEventListener ("mousemove", mousemove , false);
	    el.addEventListener ("mouseout", mouseout , false);
	} 
	startup();

	var touch_timer;

			
	function mousedown(event) {
		mouse_pressed = true;

		if (event.changedTouches) {
			var touches = event.changedTouches;
			swip_event.x1 = touches[touches.length - 1].pageX;
			swip_event.y1 = touches[touches.length - 1].pageY;
		} else {
			swip_event.x1 = event.x;
			swip_event.y1 = event.y;
		}	

		//dispatchEvent (event);

		//pause_label.innerHTML = 'x ' + swip_event.x1 + ' ' + swip_event.y1;		
	}


	function mouseup(event) {
	    mouse_pressed = false;
	    pause_label.innerHTML = '';
	}


	function mouseout(event) {
	    mouse_pressed = false;
	}


	function mousemove(event) {
		
	    if (mouse_pressed) {	

		    if (event.changedTouches) {
				var touches = event.changedTouches;
				dx = swip_event.x1 - touches[0].pageX;
				dy = swip_event.y1 - touches[0].pageY;

			} else {
				dx = swip_event.x1 - event.x;
				dy = swip_event.y1 - event.y;
			}

				
	    	if (Math.abs (dx) > DELTA_SWIP_X) {
	   		
		   		if (dx > DELTA_SWIP_X) {	
		   			swip_event.dir = 'left';
		   		}

				if (dx < -DELTA_SWIP_X) {
		   			swip_event.dir = 'right';
	   			}

	    		mouse_pressed = false;  
	    		dispatchEvent(swip_event);
	    		return;
	   		}

				
	    	if (Math.abs (dy) > DELTA_SWIP_Y) {

	   			if (dy > DELTA_SWIP_Y) {
		   			swip_event.dir = 'up';    			
		   		}

				if (dy < -DELTA_SWIP_Y) {
		   			swip_event.dir = 'down';	
	  			}

	    		mouse_pressed = false;  
	    		dispatchEvent(swip_event);
	    		return;
	   		}
	    }		
	}	
}