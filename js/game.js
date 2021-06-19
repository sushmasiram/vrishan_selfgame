class Game{
    constructor(){}

    getState(){
        var gameStateref = database.ref('gameState')
        gameStateref.on("value", function(data){
            console.log(data.val())
         gameState = data.val()
        })
        //console.log(gameState) 
    }

    update(state){
        var gameStateref = database.ref('/')
        gameStateref.update({
            gameState:state
        })
    }
    //async function
    async start(){
        if(gameState === 0){            
            player = new Player()
            //player.getCount()
            var countRef = await database.ref('playerCount').once("value")
            if(countRef.exists()){
                playerCount = countRef.val()
                player.getCount();
            }
            form = new Form()
            form.display()
            player1 = createSprite(200,displayHeight-150, 30,70);
            //player1.addImage(playerImg)
            
            player2 = createSprite(700,displayHeight-150,30,70);
            //player2.addImage(basketImg)
            players = [player1, player2]
            //console.log(cars)
            bGroup1 = createGroup()
            bGroup2 = createGroup()
            
        }
    }

    play(){
        background("black")
        form.hideElements();
        Player.getPlayerInfo()
        var index = 0; 
        var x=200,y;
        drawSprites()
        for(var plr in allPlayers ){
            
            index = index + 1
            y = displayHeight-150           
            
            players[index-1].x = x 
            players[index-1].y = y

            push()
            fill('white')
            text(allPlayers[plr].name, players[index-1].x-15, players[index-1].y - 50)
            pop()
            
            x = x + 500

            if(allPlayers[plr].state === "standing"){             
                players[index-1].height = 70         
            }
            else{
                players[index-1].height = 30
            }
            
            if(allPlayers[plr].attack){
                
                var bullet = createSprite(players[index-1].x, players[index-1].y, 5,5)
                
                bullet.shapeColor = "blue"
                if(players[index-1].x === 200){
                    bullet.velocityX = 3
                    bGroup1.add(bullet)
                }
                else{
                    bullet.velocityX = -3
                    bGroup2.add(bullet)
                }
            }
            if(player.index === index){
                players[index-1].shapeColor = 'red'
            }

            if(player.index === index){ 
                console.log(players[index-1].x)
                if(players[index-1].x === 200){
                    console.log("first player") 
                    if(players[index-1].isTouching(bGroup2)){ // player1 is creating the bullet, and that 
                        console.log(allPlayers[plr].name + ' is attacked')
                    //player.lives = player.lives - 1
                    //bGroup.destroyEach()
                 }
            
            }else{
                if(players[index-1].isTouching(bGroup1)){ // player1 is creating the bullet, and that 
                    console.log(allPlayers[plr].name + ' is attacked')
                }
            }

            /*                
                if(player.index === index){ 
                    if(players[index-1].x === 200){  
                        if(players[index-1].isTouching(bGroup2)){ // player1 is creating the bullet, and that 
                            console.log(allPlayers[plr].name + ' is attacked')
                        //player.lives = player.lives - 1
                        //bGroup.destroyEach()
                     }
                
                }else{
                    if(players[index-1].isTouching(bGroup1)){ // player1 is creating the bullet, and that 
                        console.log(allPlayers[plr].name + ' is attacked')

                 }
                }
            }*/

        }
        
        if(keyWentDown(DOWN_ARROW)){
            player.state = "ducking"     
        }else{
            player.state = "standing"
        }
        

        if(keyWentDown("space")){
            player.attack = true
        }else{
            player.attack = false
        }

        player.update();  
    
    }   
}
}
