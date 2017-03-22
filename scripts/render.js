function Render (GLASS_WIDTH, GLASS_HEIGHT, RECT_WIDTH, main_glass) {

    var MARGIN_PIC = 6, IMG_WIDTH = 68;

    var EPS = 3;

    var canvas = document.getElementById('glass-canvas')
    var stage = new createjs.Stage(canvas);
    
    var particle_canvas = document.getElementById('particle-canvas')
    var particle_stage = new createjs.Stage(particle_canvas);
    var label = document.getElementById('pause-label');


    var PM = new ParticleManager();
    PM.setStage (particle_stage);

    canvas.height =  GLASS_HEIGHT * RECT_WIDTH;


    var border = new createjs.Shape();
    border.graphics.beginStroke('red').drawRect(0, 0, GLASS_WIDTH * RECT_WIDTH, GLASS_HEIGHT * RECT_WIDTH);
    stage.addChild(border);

    
    //var AM = new AssetManager();

    var IMAGES_PATH = 'assets/images/'; 

    var bomb_img = new Image();
    bomb_img.src = IMAGES_PATH + 'bomb.png';

    var lightning_vertical_img = new Image();
    lightning_vertical_img.src = IMAGES_PATH + 'lightning_vertical.png';

    var lightning_horizontal_img = new Image();
    lightning_horizontal_img.src = IMAGES_PATH + 'lightning_horizontal.png';

    var img = new Image();
    img.src = "assets/images/spritesheet.png";   



    img.onload = function(event) {

        var data = {
            framerate: 1,
            images: [img],
            frames: {width: IMG_WIDTH, height: IMG_WIDTH, spacing:1, margin:1},
            animations: {
                'blue': 0,
                'green': 1,
                'yellow': 2,
                'red': 3,
                'purple' : 4
            }
        }
        var spritesheet = new createjs.SpriteSheet(data);
        
        //AM.addItem( 'blue',   function() { s = new createjs.Sprite (spritesheet, 'blue');   s.name='blue';   s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'green',  function() { s = new createjs.Sprite (spritesheet, 'green');  s.name='green';  s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'yellow', function() { s = new createjs.Sprite (spritesheet, 'yellow'); s.name='yellow'; s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'red',    function() { s = new createjs.Sprite (spritesheet, 'red');    s.name='red';    s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'purple', function() { s = new createjs.Sprite (spritesheet, 'purple'); s.name='purple'; s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        AM.addItem( 'blue',   function() { s = new createjs.Sprite (spritesheet, 'blue');   s.name='blue';   s.regX = RECT_WIDTH/2-MARGIN_PIC; s.regY = RECT_WIDTH/2-MARGIN_PIC; return s; }, 100 ); 
        AM.addItem( 'green',  function() { s = new createjs.Sprite (spritesheet, 'green');  s.name='green';  s.regX = RECT_WIDTH/2-MARGIN_PIC; s.regY = RECT_WIDTH/2-MARGIN_PIC; return s; }, 100 ); 
        AM.addItem( 'yellow', function() { s = new createjs.Sprite (spritesheet, 'yellow'); s.name='yellow'; s.regX = RECT_WIDTH/2-MARGIN_PIC; s.regY = RECT_WIDTH/2-MARGIN_PIC; return s; }, 100 ); 
        AM.addItem( 'red',    function() { s = new createjs.Sprite (spritesheet, 'red');    s.name='red';    s.regX = RECT_WIDTH/2-MARGIN_PIC; s.regY = RECT_WIDTH/2-MARGIN_PIC; return s; }, 100 ); 
        AM.addItem( 'purple', function() { s = new createjs.Sprite (spritesheet, 'purple'); s.name='purple'; s.regX = RECT_WIDTH/2-MARGIN_PIC; s.regY = RECT_WIDTH/2-MARGIN_PIC; return s; }, 100 ); 

        AM.addItem( 'bomb',   function() { bm = new createjs.Bitmap (bomb_img); bm.scaleX = 0.2; bm.scaleY = 0.2;  bm.x = - RECT_WIDTH/2;  bm.y = - RECT_WIDTH/2; bm.name='bomb'; bm.regX = 0; return bm; }, 100 ); 

        AM.addItem( 'lightning_vertical',   function() { bm = new createjs.Bitmap (lightning_vertical_img);   bm.scaleX = 0.15; bm.scaleY = 0.18; bm.x = - RECT_WIDTH/2;  bm.y = - RECT_WIDTH/2; bm.name='lightning_vertical'; return bm; }, 100 ); 
        AM.addItem( 'lightning_horizontal', function() { bm = new createjs.Bitmap (lightning_horizontal_img); bm.scaleX = 0.18; bm.scaleY = 0.15; bm.x = - RECT_WIDTH/2;  bm.y = - RECT_WIDTH/2; bm.name='lightning_horizontal'; return bm; }, 100 ); 

    }


    function initComplete () {

        if (!main_glass[0] || !main_glass[0][0].sprite) {
            //console.log ('Not yet');
            setTimeout(function() { initComplete() }, 50);
        }
        else
            update();
    }
    initComplete();



    this.fillGlass = function  () { 
        endGame = false;
        label.innerHTML = 'false';
        for (var x = 0; x < GLASS_WIDTH; x++)          
            createColumn(x, GLASS_HEIGHT, main_glass);        
    }


    function createColumn (x, y_pos) {
        var column_container = new createjs.Container();
        for (var y = 0; y < y_pos; y++) {  

            sprite = main_glass[y][x].sprite;
            sprite.x = x * RECT_WIDTH + RECT_WIDTH/2;
            sprite.y = y * RECT_WIDTH - y_pos * RECT_WIDTH + RECT_WIDTH/2;
            //sprite.y = y * RECT_WIDTH;

            column_container.addChild(sprite);
            stage.addChild(column_container);
        }
    }



    this.clearGlass = function  () {
        if (tweenRemove) {
            //tweenRemove.seek (2);
            //tweenRemove.progress(1);
            //TweenMax.killAll();
        }
        for (var y = 0; y < GLASS_HEIGHT; y++) {
            for (var x = 0; x < GLASS_WIDTH; x++) {  

                main_glass[y][x].x = 0; 
                main_glass[y][x].y = 0;

                stage.removeChild (main_glass[y][x].sprite);                

                main_glass[y][x].destroy();

            }
        }
    }



    this.changeColor = function (block, color, num) {

    	//block.sprite.visible = false;
        stage.removeChild (block.sprite);

        block.setColor(color);

        //block.changeColor(color, block.bonus);

    	block.sprite.visible = true;
    	block.sprite.x = block.x * RECT_WIDTH + RECT_WIDTH/2;
    	block.sprite.y = block.y * RECT_WIDTH + RECT_WIDTH/2 - num * RECT_WIDTH;

        /*block.sprite.regX = -MARGIN_PIC;
        block.sprite.regY = -MARGIN_PIC;*/
        //block.sprite.y = - RECT_WIDTH;
    	block.sprite.scaleX = 1;
    	block.sprite.scaleY = 1;

    	stage.addChild(block.sprite);
        endGame = false;
        label.innerHTML = 'false';
    	//console.log ('new ' + color +  ' block in ' + block.x + ', ' + block.y);    	
    }



    var tweenSwap, tweenRemove, tweenNum = 0;
    this.swap = function (x1, y1, x2, y2) {
		//tweenSwap = TweenMax.to( main_glass[y1][x1].sprite, 1, {x: x1 * RECT_WIDTH , y: y1 * RECT_WIDTH, ease: Power2.easeOut} );
        //tweenSwap = TweenMax.to( main_glass[y2][x2].sprite, 1, {x: x2 * RECT_WIDTH , y: y2 * RECT_WIDTH, ease: Power2.easeOut, onComplete: complete} );

        function complete() {
        }
    }




    var anim_blocks = [];
    this.removeBlocks =  function (blocks) {
    	//console.log (blocks);        
        
        for (let i = 0; i < blocks.length; i++) {

            sprite = AM.pullItem(blocks[i].color);
            stage.addChild(sprite);

            blocks[i].sprite.visible = false;

            sprite.visible = true;
            stage.addChild(sprite);
			
			sprite.x = blocks[i].sprite.x;
            sprite.y = blocks[i].sprite.y;

            var bx = blocks[i].x * RECT_WIDTH + RECT_WIDTH/2;
            var by = blocks[i].y * RECT_WIDTH + RECT_WIDTH/2;


            if (blocks[i].bonus == 'bomb')        
                PM.spawnBoom(bx,  by, 60);
            else                
                PM.spawnChip(bx, by, 15, blocks[i].color);


            tweenRemove = TweenMax.to( sprite, 0.3, { scaleY: 0.2, x: bx - 5, y: by} ); // , x: blocks[i].x * RECT_WIDTH - 5, y: blocks[i].y * RECT_WIDTH
            tweenRemove = TweenMax.to( sprite, 0.3, { scaleX: 0, onComplete: complete} );


            function complete() {

                stage.removeChild (this.target);

                this.target.scaleX = 1;
                this.target.scaleY = 1;

                this.target.x = 0;
                this.target.y = 0;

                AM.putItem(this.target.name, this.target);
            }
        }
    }


    

    var endGame = false;
    this.drawGameOver = function () {
        var dy = 0, tdy = 0;
        endGame = true;
        label.innerHTML = 'true';
        drawFinish();       
    }




    function drawFinish () {

        if (main_glass[0][0].sprite.y > GLASS_HEIGHT * RECT_WIDTH + 300 || !endGame) {
            return;
        }

        for (var y = 0; y < GLASS_HEIGHT; y++) {
            for (var x = 0; x < GLASS_WIDTH; x++) {
                if (main_glass[y][x].y == GLASS_HEIGHT -1) {
                    //spawn (x * RECT_WIDTH + RECT_WIDTH/2, GLASS_HEIGHT * RECT_WIDTH, main_glass[y][x].color, 10);
                    PM.spawnChip(x * RECT_WIDTH, y * RECT_WIDTH + RECT_WIDTH/2, 15, main_glass[y][x].color);
                    //main_glass[y][x].sprite.visible = false;
                    //main_glass[y][x].destroy();
                }                
                //var sprite = main_glass[y][x].sprite;
                main_glass[y][x].y++;
            }
        }  
        
        stage.update();
        setTimeout(function() { drawFinish() }, 400);
    }




    function spawn(x, y, color, n) { 
        p = new Particle ();
        p.init(x, y, Math.random() * 6 - 3, -10 - Math.random() * 8, stage, color);

        if (n > 0)
            setTimeout(function() { spawn(x, y, color, n-1) }, 5);
    }




    function update() {

        /*if (endGame)
            return;*/

        /*if (tweenSwap && tweenSwap.isActive()) {
            setTimeout(function() { update() }, 200);
            stage.update();
            return;
        }*/

        for (var y = 0; y < GLASS_HEIGHT; y++) {
            for (var x = 0; x < GLASS_WIDTH; x++) {
                
                var block = main_glass[y][x];
                var sprite = main_glass[y][x].sprite;
                var delta, max_delta = 20;


                if (Math.abs (sprite.x - block.x * (RECT_WIDTH + RECT_WIDTH/2)) < EPS)
                    sprite.x = block.x * RECT_WIDTH + RECT_WIDTH/2;
                else {
                    delta = (block.x * RECT_WIDTH + RECT_WIDTH/2 - sprite.x);
                    sprite.x += delta < max_delta ? delta*0.3 : max_delta + delta/15;
                }


                if (Math.abs (sprite.y - (block.y * RECT_WIDTH + RECT_WIDTH/2)) < EPS)
                    sprite.y = block.y * RECT_WIDTH + RECT_WIDTH/2;
                else {
                    delta = (block.y * RECT_WIDTH + RECT_WIDTH/2 - sprite.y);  // 100
                    sprite.y += delta < max_delta ? delta*0.3 : max_delta + delta/15;
                }
            }
        }
		
        stage.update();
        setTimeout(function() { update() }, 25);
    }
}