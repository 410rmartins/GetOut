'use strict';

class NPC{
    
    constructor(game,x,y, bound_left, bound_right){
        this.game = game;
        this.x = x;
        this.y = y;
        this.bound_left = bound_left;
        this.bound_right = bound_right;
        this.spritesheet = game.load.atlasJSONHash('NPC_sprite','../assets/Personagens/Sprites/Guarda/Sprite_guarda.png','../assets/Personagens/Sprites/Guarda/Sprite_guarda.json');
       
        this.sprite = this.game.add.sprite(this.x,this.y,'NPC_sprite');
        
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.setSize(100, 300, 80, 0);
        this.sprite.animations.add('walk_Right', Phaser.Animation.generateFrameNames('R_walk',1,11,'.png'));
        this.sprite.animations.add('walk_left', Phaser.Animation.generateFrameNames('L_walk',1,11,'.png'));
        
        this.left = true;
        this.right = false;
        this.collision = false;
        
        
    }
    
    
    switch_side(){

        
        if(this.left){
            
            this.left = false;
            this.right = true;
        }else{
           
            this.right = false;
            this.left = true;
            
        }
        
    }
    
    movement(){
        if(this.collision) {
            
            
            this.switch_side();
            this.collision = false;
            //this.movement();
        } 
        if(this.left){
            this.sprite.animations.play('walk_left',10,true);
            this.sprite.body.velocity.x = -150;
            
        }else{
            this.sprite.animations.play('walk_Right',10,true);
            this.sprite.body.velocity.x = +150;
        }
    }
}