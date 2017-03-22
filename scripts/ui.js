
var ui = new UI();
function UI () {
	var t = new MatchThree();
	t.initGame();

	var start_btn = document.getElementById('start-button');
	var restart_inplay_btn = document.getElementById('restart-inplay-button');
	var restart_btn = document.getElementById('restart-button');

	var score_label = document.getElementById('score-label');
	var pause_label = document.getElementById('pause-label');



	start_btn.addEventListener ("click",  function() {
		//console.log ('Start!');
		
		$ ( '#start-screen' ).hide(0);
		$ ( '#play-screen' ).show(0);

		score_label = document.getElementById('score-label');
		t.startGame();
	} );




	window.addEventListener ("score", function(evt) {
		//console.log (t);
		//console.log (t);
		score_label.innerHTML = 'Score : ' + t.getScore(); 
	} );




	window.addEventListener ("gameover", function(evt) {
		console.log ('Game over!!!');

		$ ( '#play-screen' ).hide(0);
		$ ( '#gameover-screen' ).show(0);

		score_label = document.getElementById('scored-label');
		score_label.innerHTML = 'Your score: ' + t.getScore();
	} );


	restart_inplay_btn.addEventListener ("click",  function() {
		//console.log ('Start!');
		
		t.state.statePlaying();	
		t.restartGame();
		$ ( '#play-screen' ).show();

		score_label.innerHTML = 'Score : ' + t.getScore();

		//pause_btn.innerHTML = 'Pause'; 
		pause_label.innerHTML = '';

	} );



	restart_btn.addEventListener ("click",  function() {
		console.log ('Start!');
		
		$ ( '#gameover-screen' ).hide(0);	
		$ ( '#play-screen' ).show(0);

		score_label = document.getElementById('score-label');

		t.state.statePlaying();		
		t.restartGame();

		score_label.innerHTML = 'Score : ' + t.getScore();
		//pause_btn.innerHTML = 'Pause'; 
		pause_label.innerHTML = '';

	} );



}
