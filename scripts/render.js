function Render (GLASS_WIDTH, GLASS_HEIGHT, RECT_WIDTH, main_glass) {

    var MARGIN_PIC = 6, IMG_WIDTH = 68;

    var EPS = 3;

    var canvas = document.getElementById('glass-canvas')
    var stage = new createjs.Stage(canvas);
    canvas.height =  GLASS_HEIGHT * RECT_WIDTH;

    var particle_canvas = document.getElementById('particle-canvas')
    var particle_stage = new createjs.Stage(particle_canvas);
    var label = document.getElementById('pause-label');

    var PM = new ParticleManager();
    var GPM = new GameParticleManager(PM, particle_stage, 700, canvas.height);

 
    
    var border = new createjs.Shape();
    border.graphics.beginStroke('red').drawRect(0, 0, GLASS_WIDTH * RECT_WIDTH, GLASS_HEIGHT * RECT_WIDTH);
    stage.addChild(border);


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
                'BLUE': 0,
                'GREEN': 1,
                'YELLOW': 2,
                'RED': 3,
                'PURPLE' : 4
            }
        }
        var spritesheet = new createjs.SpriteSheet(data);
        
        //AM.addItem( 'blue',   function() { s = new createjs.Sprite (spritesheet, 'blue');   s.name='blue';   s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'green',  function() { s = new createjs.Sprite (spritesheet, 'green');  s.name='green';  s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'yellow', function() { s = new createjs.Sprite (spritesheet, 'yellow'); s.name='yellow'; s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'red',    function() { s = new createjs.Sprite (spritesheet, 'red');    s.name='red';    s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 
        //AM.addItem( 'purple', function() { s = new createjs.Sprite (spritesheet, 'purple'); s.name='purple'; s.regX = -MARGIN_PIC; s.regY = -MARGIN_PIC; return s; }, 100 ); 

        for (var i = 0; i < colors.length; i++)
            AM.addItem( colors[i],   function() { s = new createjs.Sprite (spritesheet, colors[i]);   s.name=colors[i];   s.regX = RECT_WIDTH/2-MARGIN_PIC; s.regY = RECT_WIDTH/2-MARGIN_PIC; return s; }, 100 ); 

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

        var sprite = block.sprite;
        stage.removeChild (sprite);

        block.setColor(color);

    	sprite.visible = true;
    	sprite.x = block.x * RECT_WIDTH + RECT_WIDTH/2;
    	sprite.y = block.y * RECT_WIDTH + RECT_WIDTH/2 - num * RECT_WIDTH;

    	sprite.scaleX = 1;
    	sprite.scaleY = 1;

    	stage.addChild(sprite);
        endGame = false; 	
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
                GPM.boom(bx, by, 60);
            else                
                GPM.chips(bx, by, 10, blocks[i].color);

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
                
                main_glass[y][x].y++;
                if (main_glass[y][x].y == GLASS_HEIGHT -1) {

                    GPM.boom(x * RECT_WIDTH + RECT_WIDTH/2, GLASS_HEIGHT * RECT_WIDTH - 20, 15, main_glass[y][x].color);
                }
            }
        }  
        
        stage.update();
        setTimeout(function() { drawFinish() }, 300);
    }




    function spawn(x, y, color, n) { 
        p = new Particle ();
        p.init(x, y, Math.random() * 6 - 3, -10 - Math.random() * 8, stage, color);

        if (n > 0)
            setTimeout(function() { spawn(x, y, color, n-1) }, 5);
    }




    function update() {

        for (var y = 0; y < GLASS_HEIGHT; y++) {
            for (var x = 0; x < GLASS_WIDTH; x++) {
                
                var block = main_glass[y][x];
                var sprite = main_glass[y][x].sprite;
                var delta, max_delta = 20;
                var pos_x = block.x * RECT_WIDTH + RECT_WIDTH/2;
                var pos_y = block.y * RECT_WIDTH + RECT_WIDTH/2;


                if (Math.abs (sprite.x - pos_x) < EPS)
                    sprite.x = pos_x;
                else {
                    delta = pos_x - sprite.x;
                    sprite.x += delta < max_delta ? delta*0.3 : max_delta + delta/15;
                }

                if (Math.abs (sprite.y - pos_y) < EPS)
                    sprite.y = pos_y;
                else {
                    delta = pos_y - sprite.y;
                    sprite.y += delta < max_delta ? delta*0.3 : max_delta + delta/15;
                }
            }
        }
		
        stage.update();
        particle_stage.update();
        setTimeout(function() { update() }, 25);
    }
}