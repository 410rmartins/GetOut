'use strict';

class StaticLevel extends Level{
    
    constructor(game, max_time){
        super(game);
        this.max_time = max_time; //max time in seconds
        
        this.reached_end = false;
        this.start_time = new Date();
        this.player;
        this.map;
        this.obj;
        this.temp;
        this.over = false;
        this.hint_count= 0;
        
    }
    
    create(){
        
        this.game.add.image(0,0,'bgd');
        this.game.add.image(110,550,'bed');
        this.obj = this.game.add.sprite(900,700,'sanita');
        this.obj.scale.setTo(0.8, 0.8);
        
        this.game.physics.enable(this.obj);
        this.obj.body.immovable = true;
        this.obj.body.collideWorldBounds = true;
        this.player = new Player(this.game, 200, 600);

        this.game.physics.enable(this.player.sprite);

        this.player.sprite.body.collideWorldBounds = true;

        this.game.camera.follow(this.player.sprite);
        this.player.sprite.body.onCollide = new Phaser.Signal();
        this.player.sprite.body.onCollide.add(function() { this.reached_end = true;}, this);
        
       
        
        
    }
 
    handle_hints(){
        
        
        //SHOW TUTORIAL HINT
        
        
        //SHOW LEVEL HINT
        switch(this.hint_count){
            case 0:
                //show hint screen
                this.temp = this.game.add.sprite(32,200,'tutorial_screen');
                //pause game
                this.game.paused = true;
                break;
            case 1:
                //show hint screen
                this.temp.destroy();
                this.temp = this.game.add.sprite(32,200,'lvl1_hint');
                //pause game
                this.game.paused = true;
                break;
            case 2:
                //unpause game
                this.temp.destroy();
                this.game.paused = false;
                this.hint_count++;
                break;
            default:
                //do nothing
        }
        
            

    }
    
    update(level, lives, left, right, run, jump){
        
        this.game.physics.arcade.collide(this.player.sprite, this.obj);
        this.player.movement(left, right, run, jump);
        this.check_State(level,lives);
        this.handle_hints();
        
        return [lives, level];
    }
    
    check_State(level, lives){
        //console.log(this);
        if(this.totalTime >= this.max_time) this.lose(lives);
        
        //se tiver interagido com a sanita antes do tempo ganha
    }
    change_level(level){
        
        this.game.state.restart();
    }

    win(level){
        console.log(this)
        if(this.reached_end && !this.over){
            //calculate total time to complete level
            
            //change image of toilet
            let next_level = function(){
                level = this.change_level(level);
            }
            //stop player movement
            
            this.obj.destroy();
            
            let img1 = this.game.add.image(800,620,'broken');
            let img2 = this.game.add.image(820,690,'key');
            img1.scale.setTo(0.8, 0.8);
            img2.scale.setTo(0.8, 0.8);

            this.over = true;
            this.game.time.events.add(Phaser.Timer.SECOND*3, next_level, this);
            level++;
        
        }
        return level;
        
    }
    
    
    
    lose(lives,level){
        //if loses lose life
        
        if(lives === 0){
            level = -1;
        }else{
            lives--;
        }
    }
    
    
    
    render(){
        
        //this.game.debug.body(this.player.sprite);
        //this.game.debug.body(this.obj);
        //this.game.debug.bodyInfo(this.player.sprite, 32, 320);
    }
}