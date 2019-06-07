'use strict';

class RunLevel extends Level{
    constructor(game, num_cars, num_traps, current_time){
        super(game);
        this.map;
        this.layer;
        this.player;
        this.num_cars = num_cars;
        this.num_traps = num_traps;
        
        this.possible_CarPositions = [224,384,544,704];
        this.switch_controls = false;
        
        this.hint_count = 0;
        this.temp;
        
        this.civil_group;
        this.police_group;
        this.trap_group;
        this.car_speed = -300;
        this.endZone;
    }
    
    create(){
        this.map = this.game.add.tilemap('map3');
        const tiles = this.map.addTilesetImage('Tileset','tiles3');
        this.layer = this.map.createLayer('foreground');
        this.layer.resizeWorld();
        this.map.setCollision([0,1,2,8,9,10],true, this.layer);
        
        //create colision groups for cars and traps
        this.civil_group = this.game.add.physicsGroup();
        this.police_group = this.game.add.physicsGroup();
        this.oil_group = this.game.add.physicsGroup();
        this.spike_group = this.game.add.physicsGroup();
    
        this.player = this.game.add.sprite(192,10000,'carro_main');
        this.game.physics.arcade.enable(this.player)
        this.player.body.collideWorldBounds = true;
        this.player.body.allowGravity = false;
        
        this.game.camera.y = 10000;
        this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_TOPDOWN);
        
        this.endZone = this.game.add.sprite(192,50,'end_zone')
        this.game.physics.arcade.enable(this.endZone)
        this.endZone.body.allowGravity = false;
        this.endZone.immovable = true;
        //generate traps
        let rand_increment;
        let row_trap;
        let trap;
        let temp_y_traps = 9000;
        
        while ( temp_y_traps>=1000){
            //mostrar carros de 300 em 300 +/- 50 c
            let x = Math.floor((Math.random() * 2))
            let pos = Math.floor((Math.random() * 4));
            
            row_trap = Math.floor((Math.random() * 3)); //cada fila tem entre 0 e 2 traps
            for(let i = 0; i<row_trap; i++){
                let x =Math.random();
                
                if(x < 0.5){
                    rand_increment = 70;
                    var c = this.oil_group.create(this.possible_CarPositions[pos], temp_y_traps + rand_increment, 'oil_trap');
                    
                    
                } else {
                    rand_increment = -70; 
                    var c = this.spike_group.create(this.possible_CarPositions[pos], temp_y_traps + rand_increment, 'spike_trap');
                     
                
                } 

                c.body.immovable = true;
                c.body.moves = false;
                pos+=2;
                if(pos >= 3)
                    pos = 1;
                   
            }
            temp_y_traps -= 700;
        }
        
        //generate all civil cars
        let row_cars;
        let temp_y_car = 9000;
        
        while ( temp_y_car>=300){
            //mostrar carros de 300 em 300 +/- 50 c
            let x = Math.floor((Math.random() * 2))
            let pos = Math.floor((Math.random() * 3));
            
            row_cars = Math.floor((Math.random() * 2))+1;
            for(let i = 0; i<row_cars; i++){
                let x =Math.random();
                if(x < 0.5) rand_increment = 70;
                else rand_increment = -70;

                var c = this.civil_group.create(this.possible_CarPositions[pos], temp_y_car, 'carro_civil');
                c.body.immovable = true;
                c.body.moves = false;
                c.body.setSize(90, 185, 0, 0);

                if (Math.random() < 0.5) pos++;
                else pos+=2;
                if(pos > 3) pos = 1;
        
            }
            temp_y_car -= 600;
        }
        
        //create police cars (only colide with with player car)
        for (let i=0 ; i<this.possible_CarPositions.length; i++){
            var c = this.police_group.create(this.possible_CarPositions[i], 10050, 'carro_policia');
            c.body.velocity.y = this.car_speed + 10;
            c.body.allowGravity = false;
            
        }
        
    }
    
    handle_hints(){
        
        if(this.hint_count === 0){
            
            this.temp = this.game.add.sprite(32,9400,'lvl3_hint');
            //pause game
            this.game.paused = true;
               
        }else{
            this.temp.destroy();
            this.game.paused = false;
        }
    }
    
    update(level, lives, left, right, run, jump){
        
        let busted = function() {
            
            [lives, level] = this.lose(level, lives);
            
        }
        
        let escape = function() {
            level = this.win(level);
        }
        
        let oil = function(){
            this.switch_controls = true;
            this.game.time.events.add(Phaser.Timer.SECOND*5, function() { this.switch_controls = false}, this);
        }
        let spike = function(){
            this.car_speed += 6;
            console.log(this.car_speed)
        }
        
        let reached_end = function() {
            level = this.win(level);
        }
        
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.civil_group,  busted, null, this);
        this.game.physics.arcade.overlap(this.player, this.oil_group, oil, null,this);
        this.game.physics.arcade.overlap(this.player, this.spike_group, spike, null,this);
      
        this.game.physics.arcade.collide(this.player, this.police_group, busted, null, this);
        this.game.physics.arcade.overlap(this.civil_group, this.oil_group_group, this.arrange_map);
        this.game.physics.arcade.overlap(this.civil_group, this.spike_group, this.arrange_map);
        this.game.physics.arcade.overlap(this.player, this.endZone, reached_end, null, this);
        
        
        
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
        if(!this.switch_controls){
            
            if(left){
                this.player.body.velocity.x = -350;
            }
            if(right){
                this.player.body.velocity.x = 350;
            }

            
            
        }else{
            if(right){
                this.player.body.velocity.x = -300;
            }
            if(left){
                this.player.body.velocity.x = 300;
            }
        }
        
        if (this.car_speed > -300){
            this.car_speed -= 4;
        }
        this.player.body.velocity.y = this.car_speed;
        
        this.handle_hints();
        
        return [lives, level];
        

    }
    
    arrange_map(car, trap){
        if(Math.random() < 0.5){
            trap.y -= 100;
            trap.x += 100; 
        }else{
            trap.y += 50;
            trap.x -= 20;
        }

    }
    
    
    switch_controls(left, right){
        let temp = left;
        
        left = right;
        right = temp;
        return [left, right];
        
    }
    
    change_level(){
    
        
        
    }
    
    win(level){
        
        level++;
        //this.game.time.events.add(Phaser.Timer.SECOND, this.change_level, this);
        this.game.state.restart();
        return level;
    }
    
    lose(level,lives){
        
        if(lives!=0){
            
            lives--;
            //this.game.time.events.add(Phaser.Timer.SECOND/2, this.change_level, this);
            //stop movement
            this.game.state.restart();
            
        }else{
            level = -1;
            this.game.state.restart();
        }
        
        
        return [lives, level];
    }
    
    render(){
        
    }
}