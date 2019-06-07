'use strict';

class Player {
    //POSSO METER O NOME AQUI SE DER JEITO
    constructor (game, x, y){
        this.game = game;

        
        this.spritesheet = this.game.load.atlas('frames', '../assets/Personagem/Sprites/Prisioneiro/Sprite_prisioneiro.png','../assets/Personagem/Sprites/Prisioneiro/Sprite_prisioneiro.json')
        
        this.sprite = this.game.add.sprite(x, y, 'frames');
        this.sprite.scale.setTo(0.8,0.8)
        this.game.physics.arcade.enable(this.sprite)
        this.sprite.body.setSize(100, 300, 80, 0);
        this.goingLeft = false;
        this.goingRight = true;

       
        this.sprite.frameName = "R_defaultpos.png";

        this.jump_left = this.sprite.animations.add('jump_left',Phaser.Animation.generateFrameNames('L_jump',1,3,'.png'));
        this.jump_left.onComplete.add(function(){ this.sprite.frameName = "L_defaultpos.png"},this);
        
        this.jump_right = this.sprite.animations.add('jump_right',Phaser.Animation.generateFrameNames('R_jump',1,3,'.png'));
        this.jump_right.onComplete.add(function(){ this.sprite.frameName = "R_defaultpos.png"},this);
        
        this.sprite.animations.add('run_right', Phaser.Animation.generateFrameNames('R_run',1,7,'.png'));

        this.sprite.animations.add('run_left', Phaser.Animation.generateFrameNames('L_run',1,7,'.png'));
        
        this.sprite.animations.add('walk_Right', Phaser.Animation.generateFrameNames('R_walk',1,11,'.png'));   
        
        this.sprite.animations.add('walk_left',  Phaser.Animation.generateFrameNames('L_walk',1,11,'.png'));
        
        /*this.keys.left.onUP.add(function(){
            this.sprite.body.velocity.x =0;
            this.sprite.body.animations.stop();
            this.sprite.frame = "L_defaultpos.png";

        });
        
        this.keys.right.onUP.add(function(){
            this.sprite.body.velocity.x =0;
            this.sprite.body.animations.stop();
            this.sprite.frame = "R_defaultpos.png";

        })*/
        
    }
    
     
   
    movement(left, right, run, jump){
    
  
        
        if(left){
            
            this.goingLeft = true;
            this.goingRight = false;
            
            if(!run){
                if(this.sprite.body.onFloor()) this.sprite.animations.play('walk_left',15,true);
                this.sprite.body.velocity.x = -150;
                
            }else{
                if(this.sprite.body.onFloor()) this.sprite.animations.play('run_left',15,true);
                this.sprite.body.velocity.x = -300;
            }
               
        }
        else if (right){
            
            this.goingRight = true;
            this.goingLeft = false;
            
            if(!run){
                
                if(this.sprite.body.onFloor()) this.sprite.animations.play('walk_Right',15,true);
                this.sprite.body.velocity.x = +150;
                
            }else{
                if(this.sprite.body.onFloor())this.sprite.animations.play('run_right',15,true);
                this.sprite.body.velocity.x = +300;
            }
            
        }
       
        if(jump  && this.sprite.body.onFloor()){
            
            if(right){
                
                this.sprite.play('jump_right',5,false)
                this.sprite.body.velocity.y = -400;
            //    player.x+=2;
                jump = false;
            }else if(left ){

                this.sprite.body.velocity.y = -400;
                //player.x-=4;
                this.sprite.play('jump_left',1,false)
                jump = false;
            }else{
                
                if(this.goingLeft){
                    this.sprite.body.velocity.y = -400;
                    this.sprite.play('jump_left',5,false)
                    jump = false;
                }else{
                    this.sprite.body.velocity.y = -400;
                    this.sprite.play('jump_right',5,false);
                    jump = false;
                }
                
            }
        }
            
         if(!right && !left && !jump){
            
            
            this.sprite.body.velocity.x=0;
            
            if(this.goingRight){
                this.sprite.frameName = "R_defaultpos.png";   
            }
            if(this.goingLeft){
                this.sprite.frameName = "L_defaultpos.png";
            }
            //
            
            
        }
   
    }

}

