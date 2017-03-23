var MIN_LINE = 3;
	var checked = false;
	var glob_blocks = [];
	function checkLines (onlyCheck) {

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
		    	if ( num == 4 && !bonus && ! onlyCheck)  // если есть 4 блока в ряд и бонуса еще не было       
		    		if ( s_block_1 && (s_block_1.x == bx && s_block_1.y == y  ||  // если этот блок был свайпнут или он последний
		    						   s_block_2.x == bx && s_block_2.y == y) ||(bx == x + offset - num + 1) ) {

						bonus_blocks.push ( glass[y][bx]);					
						bonus_blocks[ length - 1].bonus = 'lightning_vertical';

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
		
						bonus_blocks.push (glass[by][x]);
						bonus_blocks[ length - 1].bonus = 'bomb';
						bonus = true;					
					}
				}
				else {
					blocks.push ( glass[by][x] );

			    	if ( num == 4 && !bonus && ! onlyCheck)  // если есть 4 блока в ряд и бонуса еще не было       
			    		if ( s_block_1 && (s_block_1.x == x && s_block_1.y == by  ||  // если этот блок был свайпнут или он последний
			    						   s_block_2.x == x && s_block_2.y == by) || (by == y + offset - num + 1) ) {

							bonus_blocks.push (glass[by][x]);
							bonus_blocks[ length - 1].bonus = 'lightning_horizontal';
							bonus = true;					
						}
				}
			}
			function findElement (b) {
        		return b == glass[by][x];
        	}
        }	


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

		
		for (var i = 0; i < bonus_blocks.length; i++) {
			glass[ bonus_blocks[i].y ][ bonus_blocks[i].x ].bonus = bonus_blocks[i].bonus;
			for (var i = 0; i < blocks.length; i++) {
				if (bonus_blocks[i].x == blocks[i].x && bonus_blocks[i].y == blocks[i].y) {
					delete block[i];
					break;
				}

			}
		}


		if (onlyCheck) {	
			checked = false;
			label.innerHTML = 'false';
		}
		else{
			timers.push (setTimeout (function() { checked = false; label.innerHTML = 'false'; }, 600));			

		}
		return blocks;
	}
	// Check Lines

