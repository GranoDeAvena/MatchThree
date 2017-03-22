function Block(){
	this.color = null;
	this.x;
	this.y;
	this.prevX;
	this.prevY;
	this.sprite = null;
	this.bonus = null;

	var bonus_sprite, crystal;



	this.init = function( x, y, color, bonus = null){
		this.x = x;
		this.y = y;
		this.prevX = x;
		this.prevY = y;
		this.color = color;
		//container.addChild (AM.pullItem( color ));

		
		/*if (bonus === null)
			this.bonus = null;
		else	
			this.bonus = getRandomBonus(container);*/
		
		crystal = AM.pullItem( color );
			
		this.bonus = bonus;	
		if (bonus) 
			bonus_sprite = AM.pullItem (bonus);

		
		this.sprite = new createjs.Container();

		this.sprite.addChild (crystal, bonus_sprite);		
	}



	this.setColor = function (color) {

		AM.putItem (this.color, crystal);


		crystal = AM.pullItem (color);	

		this.color = color;
		this.bonus = null;

		this.sprite.removeAllChildren();
		this.sprite.addChild (crystal);
	}	



	this.addBonus = function (bonus) {	

		if (this.bonus) {
			AM.putItem (this.bonus, bonus_sprite);
			this.sprite.removeChild (bonus_sprite);
		}

		this.bonus = bonus;

		if (bonus)
			bonus_sprite = AM.pullItem (bonus);
		else
			bonus_sprite = null;

		this.sprite.addChild (bonus_sprite);
	}



	this.destroy = function(){
		AM.putItem (this.color, crystal);
		if (this.bonus)
			bonus_sprite = AM.putItem (this.bonus, bonus_sprite);
	}
	return this;
}

var FREQ_OF_BONUS = 50;

function getRandomBonus (container) { 
    switch( getRandomRange(0, FREQ_OF_BONUS)) {
                
        case 0:
        	//container.addChild (AM.pullItem( 'bomb' ));
            return 'bomb';
        case 1:
            return 'lightning_horizontal';
        case 2:
        	return 'lightning_vertical';
    }
    return null;

}