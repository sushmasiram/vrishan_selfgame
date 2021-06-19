
var database;
var gameState = 0, playerCount =0 ;
var player1, player2
var players = []
var form, player, game
var allPlayers;
var counter = 0;
var bGroup1, bGroup2;

function preload(){
    playerImg = loadImage('player.png')
}

function setup (){
    database = firebase.database();
    createCanvas(800,800)
    game = new Game()
    game.getState()
    game.start()
}

function draw (){
    if(playerCount === 2){
        game.update(1)
   }
   if (gameState === 1){
        clear()
        game.play()
   }

}  