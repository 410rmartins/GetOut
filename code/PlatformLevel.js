'use strict';

class PlatformLevel extends Level{
    
    constructor(game, num_npcs, npc_spawn){
        super(game);
        this.num_npcs = num_npcs;
        this.npc_spawn = npc_spawn;
        
        this.reached_end = false;
        this.unlock = false;
        this.button = false;
        this.over = false;
        
        this.player;
        this.totalTime;
        this.map;
        this.seen = false;
        this.layer;
        this.temp;
        this.npc = [];
        this.objects = [];
        this.hint_count = 0;
        
    }
    
    create(){
           
            this.map = this.game.add.tilemap('map2');
            const tiles_1 = this.map.addTilesetImage('tiles','tiles2');        
            const tiles_2 = this.map.addTilesetImage('tileset_niv2','tileset_niv2');
            this.map.setCollisionBetween(0,800);
            
            this.layer = this.map.createLayer('foreground');
            this.layer.resizeWorld();
            
            
            this.objects[0] = this.game.add.sprite(9500,500,'button');
            this.game.physics.enable(this.objects[0]);
            this.objects[0].body.allowGravity = false;
            this.objects[0].body.immovable = true;
            this.objects[0].body.moves = false;
        
        
            this.objects[1] = this.game.add.sprite(250,335,'closed_door');
            this.game.physics.enable(this.objects[1]);
            this.objects[1].scale.setTo(0.8, 0.8);

            this.objects[1].body.allowGravity = false;
            this.objects[1].body.immovable = true;
            this.objects[1].body.moves = false;
        
            this.player = new Player(this.game, 0, 400);
       
            this.game.physics.enable(this.player.sprite);
            
            this.player.sprite.body.collideWorldBounds = true;
            
            this.player.sprite.body.linearDamping = 2;
            this.game.camera.follow(this.player.sprite);

            let random_x = Math.floor((Math.random()*this.npc_spawn.length));
            for(let i = 0; i<this.num_npcs; i++){
                //let random_x = Math.floor((Math.random()*5500)+2500);
                //let random_y = Math.floor((Math.random()*600)+30);
                
                
                console.log(this.npc_spawn[random_x])
                let c = new NPC(this.game, this.npc_spawn[random_x], 300,900,1100);
                
                random_x = (random_x + 1) % this.npc_spawn.length;
                if (Math.random<0.5){
                    c.left = true;
                    c.right = false;
                }else{
                    c.left = false;
                    c.right = true;
                }
                c.sprite.body.collideWorldBounds = true;
                
                this.npc[i] = c;
            }
                
    }
    
    handle_hints(){
        
        if(this.hint_count === 0){
            
            this.temp = this.game.add.sprite(32,200,'lvl2_hint');
            //pause game
            this.game.paused = true;
               
        }else{
            this.temp.destroy();
            this.game.paused = false;
        }
    }
        
    
    handle_colision_btn(){
        //console.log(this);
        
        this.reached_end = true;
    }
    
    handle_colision_door(){
        //console.log(this);
        if(this.button){
            this.unlock = true;
            this.reached_end = true;
        } 
    }
    
    update(level, lives, left, right, run, jump){
        
        for(let i = 0; i<this.num_npcs; i++){
            this.game.physics.arcade.collide(this.npc[i].sprite, this.layer,function() {if(this.npc[i].sprite.body.onWall())this.npc[i].collision = true;},null,this);
        }
        
        //this.reached_end = false;
        
        
        this.game.physics.arcade.collide(this.player.sprite, this.layer);
        
        
        this.game.physics.arcade.overlap(this.player.sprite, this.objects[0], this.handle_colision_btn, null, this);
        this.game.physics.arcade.overlap(this.player.sprite, this.objects[1], this.handle_colision_door, null, this);
        
        
        let overlap = function(){
           [lives, level] = this.lose(lives, level);
        }
        for(let i = 0; i<this.num_npcs; i++){        
            this.game.physics.arcade.overlap(this.npc[i].sprite, this.player.sprite, overlap, null, this);
        }
        
        this.player.sprite.body.velocity.x = 0;
        for(let i = 0; i<this.num_npcs; i++) this.npc[i].movement();
        this.player.movement(left, right, run, jump);
        //npc.sprite.body.velocity.x = 0;
        //console.log(this.seen)
        this.handle_hints();
        
        return [lives, level];
        
    }
    change_level(){
        
        this.game.state.restart();
        
    }
    

    
    win(level){
        
         if(this.reached_end && !this.over){
   
            this.button = true; 
            this.objects[0].key = 'button_pressed';
            //this.objects[1].destroy()
            this.objects[1] = this.game.add.sprite(250,335,'closed_door');
            this.game.physics.enable(this.objects[1]);
            this.objects[1].scale.setTo(0.8, 0.8);
            this.objects[1].body.allowGravity = false;
            this.objects[1].body.immovable = true;
            this.objects[1].body.moves = false;
             if(this.unlock){
                //this.player.sprite.destroy()
                this.over = true;
                this.game.time.events.add(Phaser.Timer.SECOND*0.5, this.change_level, this);
                level++;
    
            }
                    
        }
        return level;
        
    }
    
    lose(lives, level){
        console.log('here')
        if(lives === 0){
            level = -1;
            
        }else{
            lives--;
            this.game.state.restart();
           
        }
        
        return [lives, level];
        
    }
    
     render(){
         
        //for(let i = 0; i<this.num_npcs; i++)this.game.debug.body(this.npc[i].sprite)
         //this.game.debug.body(this.objects[0])
         //this.game.debug.body(this.objects[1])
        //this.game.debug.body(this.player.sprite);
        //this.game.debug.bodyInfo(this.player.sprite, 32, 320);
    }
}