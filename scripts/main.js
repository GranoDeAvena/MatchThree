function MatchThree (){
	
	var GLASS_WIDTH = 5, GLASS_HEIGHT = 8;
	var RECT_WIDTH = 80;
	var GLASS_HEIGHT_PIX = RECT_WIDTH * GLASS_HEIGHT;
	
	var glass = [];
	
	var controller = new Controller();	
	var render = new Render(GLASS_WIDTH, GLASS_HEIGHT, RECT_WIDTH, glass );	
	var block = new Block();

	var label = document.getElementById('label');


		
	label.innerHTML = 'false';	

	var score = 0;	


/*
███████╗████████╗ █████╗ ████████╗███████╗███████╗
██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
███████╗   ██║   ███████║   ██║   █████╗  ███████╗
╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
███████║   ██║   ██║  ██║   ██║   ███████╗███████║
╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
*/
	// STATES
	var states = this.states = {
		inactive: 'inactive',
		playing: 'playing',
		gameover: 'gameover'
	}

	var state = this.state = new State();
	function State () {	
		var current_state = states.inactive;

		this.getState = function () { return current_state}

		function setState(s) {
			current_state = s;
		}

		this.isState = function(s) {
			return s == current_state;
		}
		
		this.stateInactive = function () {
			is_paused = true;
			setState (states.inactive);
		};

		this.statePlaying = function () {
			is_paused = false;
			setState (states.playing);
		};

		this.stateGameover = function () {
			is_paused = false;
			setState (states.gameover);
		};
		/*
		this.setState = figure_current( new_state ){

			switch( new_state ){
				
				case scope.GAME_OVER:
				case scope.PAUSE:
					if( state == scope.PLAY ){
						setState( new_state );
						setPaused( true );
					}
					break;

				case ...:
			}
		}*/		
	}
	// STATES


	var is_paused = false;
	var figure_current = {
		forms: [],
		x: 0,
		y: 0,
		dy: 0,
		phase: 0
	};

	var sound = new Sound();

	var sound_toggle = false;
	$( "#toggle" ).click(function() {
		sound_toggle = ! sound_toggle;
		sound.setState(sound_toggle);
	});


	// figures[f][y][x] - символ 
	// figures[f][y] - строка
	// figures[f] - фигура / поворот фигуры
	this.setPaused  = function(bool) { is_paused = bool; 
		state.curstate = state.inactive};
	this.isPaused  = function() { return is_paused; };
	this.getScore  = function() { return score; };
	//this.getState  = function() { return state.getState(); };
	//this.setState  = function(s) { return state.state[s]() };
	addEventListener ("swipe",  function(evt) {onSwipe (evt)} );
	addEventListener ("click",  function(evt) {onClick (evt)} );


	var scoreEvent = this.scoreEvent = new Event("score");	
	var timers = [], timer;		

	this.initGame = function() {	

	}


	this.restartGame = function() {

		score = 0;		
		dispatchEvent (scoreEvent);

		for (var y = 0; y < GLASS_HEIGHT; y++) {
            for (var x = 0; x < GLASS_WIDTH; x++) { 

            	var color = getRandomColor();

                glass[y][x].x = x;
                glass[y][x].y = y;

            	render.changeColor(glass[y][x], color, GLASS_HEIGHT);              	
            	
                //glass[y][x].color = color;
            }
        }
        if (checkLines(true).length > 0 || checkEndGame()) {
			this.restartGame();
			return;
		}  

		//for (t of timers)
		//	clearTimeout (t);

		/*console.log ('timers = ' + timers.length);

		for (var i = 0; i < timers.length; i++)
			clearTimeout (timers[i]);
		timers = [];*/
		clearTimeout (timer);
		timer = setTimeout(function() { removeLines(); }, 700);			
	}




	this.startGame = function() {
		state.statePlaying	();
		score = 0;
		if (glass[0]) {
			render.clearGlass();
		}

		fillGlass (); 
	
	
		if (checkLines(true).length > 0 || checkEndGame()) {
			this.restartGame();
		}

        render.fillGlass (glass); 

        var timer1, timer2;
        var n = 0;

        setTimeout(function() { removeLines(); }, 500);	
        //setTimeout(function() { gameOver(); }, 1000);	
        //gameOver();

        
        /*var arr = [1, 2, 3];
        console.log ('a ' + arr.length);
        arrChange(arr);
        console.log ('b ' + arr.length);*/
        
        /*checkDefoultValue(1);
        checkDefoultValue();
        checkDefoultValue('defdef');
        checkDefoultValue(undefined);
        checkDefoultValue(null);*/
	}	

	/*function arrChange (arr) {
		arr.push (4, 5);
	}

	function checkDefoultValue (v = 5) {
		console.log ('def value = ' + v);
	}*/




	function fillGlass () {
		for (var y = 0; y < GLASS_HEIGHT; y++) {
            glass[y] = [];
            for (var x = 0; x < GLASS_WIDTH; x++) {   

            	var block = new Block();
            	block.init (x, y, getRandomColor(), getRandomBonus());
                glass[y][x] = block;
            }
        }        
	}



	function updatePos () {
		//console.log ('updatePos');
		for (var y = 0; y < GLASS_HEIGHT; y++) {
            for (var x = 0; x < GLASS_WIDTH; x++) {   
            	glass[y][x].x = x;
            	glass[y][x].y = y;
            	glass[y][x].prevX = x;
            	glass[y][x].prevY = y;
            }
        }
	}




	function createBlocks (blocks) {
		var color = getRandomColor(), prev_color;
		updatePos ();

		var num = [];
		for (var i = 0; i < GLASS_WIDTH; i++) {
			num[ i ] = 0;
		}

		for (var i = 0; i < blocks.length; i++) {
			num[ blocks[i].x ] ++;
		}
		//console.log ('createBlocks')
		for (var i = 0; i < blocks.length; i++) {
			//console.log ('set unvisible ' + blocks[i].x + ', ' + blocks[i].y);
			while (prev_color == color)
				color = getRandomColor();
			prev_color = color;
			
			render.changeColor(blocks[i], color, num[ blocks[i].x ]);			
			blocks[i].color = color;
    	}
/*    	if (checkLines()) {
    		createBlocks (blocks);
    		return;
    	}*/
    	
	}



	function onClick (evt) {
		var x1, y1;
		x1 = Math.floor (evt.x / RECT_WIDTH);
		y1 = Math.floor (evt.y / RECT_WIDTH);
		if (x1 < 0 || x1 >= GLASS_WIDTH)
			return;
		if (y1 < 0 || y1 >= GLASS_HEIGHT)
			return;
		//console.log (evt.which);
		//if (evt.shiftKey)
			//glass[y1][x1] change color
		console.log (glass[y1][x1]);
	}



	var s_block_1, s_block_2;
	function onSwipe (evt, onlyCheck = false) {

		if (checked) {		
			console.log ('Swipe not counted');
			return;
		}

		//console.log ('x1 = ' + evt.x1 + ', y1 = ' + evt.y1 + ', dir = ' + evt.dir);
		var x1, y1;
		x1 = Math.floor (evt.x1 / RECT_WIDTH);
		y1 = Math.floor (evt.y1 / RECT_WIDTH);
		if (x1 < 0 || x1 >= GLASS_WIDTH || y1 < 0 || y1 >= GLASS_HEIGHT)
			return;
		
		s_block_1 = glass[y1][x1];
		//var temp = glass[y1][x1].color;
		switch( evt.dir) {					
			case 'left':
				if (x1 == 0) return;
				swap (x1, y1, x1-1, y1);
				//render.swap (x1, y1, x1 - 1, y1);
				s_block_2 = glass[y1][x1-1];
				s_block_2.swipe = 'horiz';
				break;

			case 'right':
				if (x1 == GLASS_WIDTH - 1) return;
				swap (x1, y1, x1+1, y1);
				//render.swap (x1, y1, x1 + 1, y1);
				s_block_2 = glass[y1][x1+1];
				s_block_2.swipe = 'horiz';
				break;

			case 'up':
				if (y1 == 0) return;
				swap (x1, y1, x1, y1-1);
				//render.swap (x1, y1, x1, y1 - 1);
				s_block_2 = glass[y1-1][x1];
				s_block_2.swipe = 'vert';
				break;

			case 'down':
				if (y1 == GLASS_HEIGHT - 1) return;
				swap (x1, y1, x1, y1+1);
				//render.swap (x1, y1, x1, y1 + 1);
				s_block_2 = glass[y1+1][x1];
				s_block_2.swipe = 'vert';
				break;	
		}	
		s_block_1.swipe = s_block_2.swipe;

		updatePos ();
		//setTimeout(function() { checkLines(); }, 50);
		//var blocks = checkLines(true);  // проверить линии
		//if (!checkLines()) 

		//if (blocks.length > 0) {   // если блоки есть - удалить их
		//if (checkLines(true).length > 0){
		if (!removeLines()){
			//removeBlocks(blocks);
			//setTimeout(function() { removeLines(); }, 10);
			//removeLines();

		//} else {			// иначе вернуть сдвинутый блок обратно

			//console.log ('No lines');
			switch( evt.dir) {					
				case 'left':
					swap (x1, y1, x1-1, y1);
					//render.swap (x1, y1, x1 - 1, y1);
					break;

				case 'right':
					swap (x1, y1, x1+1, y1);
					//render.swap (x1, y1, x1 + 1, y1);
					break;

				case 'up':
					swap (x1, y1, x1, y1-1);
					//render.swap (x1, y1, x1, y1 - 1);
					break;

				case 'down':
					swap (x1, y1, x1, y1+1);
					//render.swap (x1, y1, x1, y1 + 1);
					break;	
			}
			setTimeout(function() { updatePos (); }, 30);	
		}
	}


	function removeLines () {
		if (checked) {
			setTimeout (function() { removeLines (); }, 100);
			return;
		}

		//var blocks = checkLines();  // проверить линии, и сохранить блоки

		/*if (!blocks) {
			console.log ('remove Lines hold');
			setTimeout (function() { removeLines (); }, 300);
			return;
		}*/

		//if (blocks.length > 0) {   // если блоки есть - удалить их
		if (checkLines(true).length > 0) {   // если блоки есть - удалить их
			removeBlocks(checkLines());
		
			setTimeout (function() { removeLines (); }, 700);
			return true;
		}

		if (checkEndGame()) // Если блоков нет, проверить на окончание игры !!!!!!!!!!!!!!!!!
			gameOver();
	}



	function removeBlocks (blocks) {
		//console.log (blocks);
		score += blocks.length;
		dispatchEvent (scoreEvent);

		render.removeBlocks (blocks);		
		timers.push (setTimeout (function() { fallBlocks (blocks); }, 250));
		timers.push (setTimeout (function() { createBlocks (blocks); }, 300));
	}
	

/*
хранить удаляемые блоки
хранить блоки, удаляемые бонусами отдельно
хранить блоки с новыми бонусами


удалить блоки по цветам
	найти и сохранить новые бонусы

для всех бонусов из сокр блоков удалить соотв блоки

для всех блоков из новых бонусов - 
	удалить блок из удаляемых блоков
	добавить новый бонус в клетку стакана

*/

/* 
  ______   __                            __              __        __                               
 /      \ |  \                          |  \            |  \      |  \                              
|  $$$$$$\| $$____    ______    _______ | $$   __       | $$       \$$ _______    ______    _______ 
| $$   \$$| $$    \  /      \  /       \| $$  /  \      | $$      |  \|       \  /      \  /       \
| $$      | $$$$$$$\|  $$$$$$\|  $$$$$$$| $$_/  $$      | $$      | $$| $$$$$$$\|  $$$$$$\|  $$$$$$$
| $$   __ | $$  | $$| $$    $$| $$      | $$   $$       | $$      | $$| $$  | $$| $$    $$ \$$    \ 
| $$__/  \| $$  | $$| $$$$$$$$| $$_____ | $$$$$$\       | $$_____ | $$| $$  | $$| $$$$$$$$ _\$$$$$$\
 \$$    $$| $$  | $$ \$$     \ \$$     \| $$  \$$\      | $$     \| $$| $$  | $$ \$$     \|       $$
  \$$$$$$  \$$   \$$  \$$$$$$$  \$$$$$$$ \$$   \$$       \$$$$$$$$ \$$ \$$   \$$  \$$$$$$$ \$$$$$$$                                                        
*/

	var MIN_LINE = 3;
	var checked = false;
	var glob_blocks = [];
	function checkLines (onlyCheck) {

		var b = {
			x: 0,
			y: 0,
			bonus : 'bomb'
		}

		checked = true;
		label.innerHTML = 'true';

		var dx = x, dy = y, num = 1, blocks = [], b_blocks = [], bonus_blocks = [], prev_color = '';


		for (var y = 0; y < GLASS_HEIGHT; y++) { // поиск линий по горизонтали
			
			prev_color = '';
			num = 1;

            for (var x = 0; x < GLASS_WIDTH; x++) { 

            	var block = glass[y][x];

            	if (block.color == prev_color){
            		
            		num++;

            		if ( x == GLASS_WIDTH - 1 ) // right border
   						checkLineX( 0 );		

            	}else{

            		prev_color = block.color;
            		checkLineX( -1 );
            		num = 1;
            	}   
            }
        }

        function checkLineX( offset ){
        	
        	if ( num < MIN_LINE ) return;

			var bonus = false;

        	for (var bx = x + offset; bx > x + offset - num; bx--) {  // Для всех блоков одного цвета в линии
				//console.log ('add block ' + bx + ', ' + y);
				blocks.push ( glass[y][bx] );
		    	if ( num >= 4 && !bonus && ! onlyCheck)  // если есть 4 блока в ряд и бонуса еще не было       
		    		if ( s_block_1 && (s_block_1.x == bx && s_block_1.y == y  ||  // если этот блок был свайпнут или он последний
		    						   s_block_2.x == bx && s_block_2.y == y) ||(bx == x + offset - num + 1) ) {

						bonus_blocks.push ( Object.assign ({}, glass[y][bx]) );					
						bonus_blocks[ bonus_blocks.length - 1].bonus = 'lightning_vertical';

						bonus = true;						
					}
			}
        }
		
		for (var x = 0; x < GLASS_WIDTH; x++) {   // поиск линий по вертикали
            
        	num = 1;
        	prev_color = '';
			for (var y = 0; y < GLASS_HEIGHT; y++) { 

            	var block = glass[y][x];

            	if (block.color == prev_color && block.color!='-'){
            		
            		num++;

            		if ( y == GLASS_HEIGHT - 1 ) // right border
   						checkLineY( 0 );		

            	}else{

            		checkLineY( -1 );
            		num = 1;
            		prev_color = block.color;
            	} 
            }            
        }



        function checkLineY( offset ){
        	
        	if ( num < MIN_LINE ) return;

			var bonus = false;

        	for (var by = y + offset; by > y + offset - num; by--) {  // Для всех блоков одного цвета в линии
				if (checkExist(glass[by][x], blocks)) {
					if (! onlyCheck) {
		
						bonus_blocks.push (Object.assign ({},  (glass[by][x])));
						bonus_blocks[ bonus_blocks.length - 1].bonus = 'bomb';
						bonus = true;					
					}
				}
				else {
					blocks.push ( glass[by][x] );

			    	if ( num >= 4 && !bonus && ! onlyCheck)  // если есть 4 блока в ряд и бонуса еще не было       
			    		if ( s_block_1 && (s_block_1.x == x && s_block_1.y == by  ||  // если этот блок был свайпнут или он последний
			    						   s_block_2.x == x && s_block_2.y == by) || (by == y + offset - num + 1) ) {

							bonus_blocks.push (Object.assign ({},  (glass[by][x])));
							bonus_blocks[ bonus_blocks.length - 1].bonus = 'lightning_horizontal';
							bonus = true;					
						}
				}
			}
			function findElement (b) {
        		return b == glass[by][x];
        	}
        }	

        if (!onlyCheck)
	        for (var i = 0; i < blocks.length; i++) {

	        	if (blocks[i].bonus == 'bomb') {  // если удаляемый блок бонусный
	        		calcBomb(blocks[i].x, blocks[i].y, blocks);  
	        	}
	        	if (blocks[i].bonus == 'lightning_horizontal') {
	    			calcLightH (blocks[i].y, blocks);
	        	}
	        	if (blocks[i].bonus == 'lightning_vertical') {
	        		calcLightV (blocks[i].x, blocks);
	        	}
	        }


		function calcBomb (bx, by, blocks) {
		    for (var y = -1; y <= 1; y++)
				for (var x = -1; x <= 1; x++) 

					if (glass[ by + y] && glass[ by + y][ bx + x] && 
						 !checkExist( glass[ by + y][ bx + x], blocks))
						blocks.push ( glass[ by + y][ bx + x]);
		}

        function calcLightV (bx, blocks) {
        	for (var y = 0; y < GLASS_HEIGHT; y++)

				if ( !checkExist( glass[y][bx], blocks))
					blocks.push ( glass[y][bx]);
        }

		function calcLightH (by, blocks) {
        	for (var x = 0; x < GLASS_WIDTH; x++) 

				if ( !checkExist( glass[by][x], blocks))
					blocks.push ( glass[by][x]);
        }


		if (!onlyCheck)
			for (var i = 0; i < bonus_blocks.length; i++) {
				glass[ bonus_blocks[i].y ][ bonus_blocks[i].x ].addBonus (bonus_blocks[i].bonus);	
				console.log ('add bonus ' + bonus_blocks[i].bonus);
				for (var j = 0; j < blocks.length; j++) {
					if (bonus_blocks[i].x == blocks[j].x && bonus_blocks[i].y == blocks[j].y) {
						//delete blocks[j];
						blocks.splice (j, 1);
						break;
					}
				}
			}


		if (onlyCheck) {	
			checked = false;
			label.innerHTML = 'false';
		}
		else{    // время задержки перед возмодностью сделать следующий ход
			timers.push (setTimeout (function() { checked = false; label.innerHTML = 'false'; }, 400));	
		}
		return blocks;
	}
	// Check Lines





	function fallBlocks (blocks) {
		//console.log ('fallBlocks');

		var column = [], n = 0, falling_blocks = [];
		var temp_glass = [];

		for (var y = 0; y < GLASS_HEIGHT; y++) {
			temp_glass[y] = [];
			for (var x = 0; x < GLASS_WIDTH; x++)
				temp_glass[y][x] = 0;
		}

		var y_pos = [];

		for ( var i = 0; i < blocks.length; i++) {

			for (var y = blocks[i].y - 1; y >= 0; y--) // прибавить счетчик всем элементам выше
				temp_glass[y ][ blocks[i].x]++;		
		}

		for (var y = GLASS_HEIGHT - 1; y >= 0; y--) {
			for (var x = 0; x < GLASS_WIDTH; x++)
				swap(x, y, x, y + temp_glass[y][x]);
		}
	}



	function swap (x1, y1, x2, y2) {
		if (x1 < 0 || x2 < 0 || x1 > GLASS_WIDTH-1  || x2 > GLASS_WIDTH-1 ||
			y1 < 0 || y2 < 0 || y1 > GLASS_HEIGHT-1 || y2 > GLASS_HEIGHT-1) {
			console.info ('Out of Glass!');
			return;
		}
		//console.log ('swap ' + x1 + ', ' + y1 + ' and ' + x2 + ', ' + y2);
		var temp = glass[y1][x1];				
		glass[y1][x1] = glass[y2][x2];
		glass[y2][x2] = temp;
	}


	function checkEndGame () {
		var sw = {}, i = 0;

		sw.dir = 'right';
		for (var y = 0; y < GLASS_HEIGHT; y++) {
			for (var x = 0; x < GLASS_WIDTH - 1; x++) {
				
				if (checkMove (x, y, x+1, y) ) {
					i++;
					return false;
					//console.log ('You can swipe ' + x + ', ' + y);
				}
			}
		}
		for (var y = 0; y < GLASS_HEIGHT - 1; y++) {
			for (var x = 0; x < GLASS_WIDTH; x++) {
				
				if (checkMove (x, y, x, y+1) ) {
					i++;
					return false;
					//console.log ('You can swipe ' + x + ', ' + y);
				}
			}
		}
		console.log ('i = ' + i);
		if (i == 0)
			return true;
		return false;
	}

	function checkMove (x1, y1, x2, y2) {
		var rez = false, onlyCheck = true;

		swap (x1, y1, x2, y2);
		if (checkLines (onlyCheck).length > 0) 
			rez = true;
		swap (x1, y1, x2, y2);

		return rez;		
	}



	var gameOverEvent = this.gameOverEvent = new Event("gameover");
	function gameOver () {
		state.stateGameover (states.gameover);	

		render.drawGameOver();
		console.log ('game over');

		/*removeEventListener ("keydownleft",  function(evt) {onKeyDownLeft (evt)} );
		removeEventListener ("keydownup",  function(evt) {onKeyDownUp (evt)} );
		removeEventListener ("keydownright",  function(evt) {onKeyDownRight (evt)} );
		removeEventListener ("keydowndown",  function(evt) {onKeyDownDown (evt)} );
		removeEventListener ("keydownspace",  function(evt) {onKeyDownSpace (evt)} );*/	
		
  		dispatchEvent(gameOverEvent);
	}
}