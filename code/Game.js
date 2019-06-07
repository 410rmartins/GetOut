'use strict';

function main() {
    var config = {
        width: 1024,
        height: 800,
        renderer: Phaser.AUTO,
        state: {
            preload: preload,
            create: create,
            update: update,
            render: render
        }

    };
    
    //game variables
    
    var game = new Phaser.Game(config);
    var level = 2;
    var player;
    var currentlevel;
    var lives = 3;
    var timer;
    var text_lives;
    var npc_spwan;
    var text_time;
    
    //Game Controls
    var keys;
    var shift;
    var space;
    var pause;
    var enter;
    
    //movement variables
    var run = false;
    var jump = false;
    var left = false;
    var right = false;
    //var interaction;
    
    //dados do utilizador (ir buscar aos cookies/)
    var user_name;
    var totalTime = 0;
    var volume;
    
	var masterWindow;
    window.addEventListener("message", msgHandler);
    var iframe = document.getElementsByTagName("iframe")[0];

    function preload ()
    {
        //Load images
        
        //player
        
        game.load.atlasJSONHash('frames', '../assets/Personagens/Sprites/Prisioneiro/Sprite_prisioneiro.png','../assets/Personagens/Sprites/Prisioneiro/Sprite_prisioneiro.json',Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
        switch(level){
            case 1:
                game.load.image('bgd', '../assets/Nivel_1/Fundo/lvl1_bgd.png');
                game.load.image('broken','../assets/Nivel_1/Objetos/sanita_partida.png');
                game.load.tilemap('map', '../assets/Nivel_1/level1.json', null, Phaser.Tilemap.TILED_JSON);
                game.load.image('sanita','../assets/Nivel_1/Objetos/sanita.png');
                game.load.image('bed', '../assets/Nivel_1/Objetos/cama.png');
                game.load.image('key', '../assets/Nivel_1/Objetos/chave.png');
                game.load.image('tutorial_screen', '../assets/tutorial/tutorial_recortado.png');
                game.load.image('lvl1_hint', '../assets/hints/lvl1.png')
                break;
            case 2:
                game.load.atlasJSONHash('NPC_sprite','../assets/Personagens/Sprites/Guarda/Sprite_guarda.png','../assets/Personagens/Sprites/Guarda/Sprite_guarda.json');
                game.load.tilemap('map2', '../assets/Nivel_2/level2.json', null, Phaser.Tilemap.TILED_JSON);
                game.load.image('tiles2', '../assets/Nivel_2/tiles.png');
                game.load.image('tileset_niv2', '../assets/Nivel_2/Objetos/tileset_niv2.png');
                game.load.image('bgd2','../assets/Nivel_2/Fundo/lvl2_6.png');
                game.load.image('button_pressed', '../assets/Nivel_2/Objetos/botao_press.png');
                game.load.image('button', '../assets/Nivel_2/Objetos/botao_unpress.png');
                game.load.image('sign', '../assets/Nivel_2/Objetos/aviso.png');
                game.load.image('closed_door', '../assets/Nivel_2/Objetos/porta_fechada.png');
                game.load.image('open_door', '../assets/Nivel_2/Objetos/porta_aberta.png');
                game.load.image('lvl2_hint', '../assets/hints/lvl2.png');
                break;
            case 3:
                game.load.tilemap('map3','../assets/Nivel_3/Tiles/level_3.json', null, Phaser.Tilemap.TILED_JSON);
                game.load.image('tiles3','../assets/Nivel_3/Tiles/Tileset.png');
                game.load.image('carro_main', '../assets/Nivel_3/Carros/carro_prisioneiro.png');
                game.load.image('carro_policia', '../assets/Nivel_3/Carros/carro_policia.png');
                game.load.image('carro_civil', '../assets/Nivel_3/Carros/carro_civil.png');
                game.load.image('oil_trap', '../assets/Nivel_3/Obstáculos/oil_stains.png');
                game.load.image('spike_trap', '../assets/Nivel_3/Obstáculos/trap_spikes.png');
                game.load.image('end_zone','../assets/Nivel_3/Obstáculos/meta.png');
                game.load.image('lvl3_hint', '../assets/hints/lvl3.png')
                break;
            default:
                break;
        }

    }

    function create ()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.arcade.gravity.y = 600;
        
        keys = game.input.keyboard.createCursorKeys();
        shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
        
        game.time.events.loop(Phaser.Timer.SECOND, function() {totalTime++}, this);
        
        
        
        //handle pause/ unpause
        pause.onDown.add(function() {
            if(game.paused === true){
                game.paused = false;
                //timer.resume();
                
            }else{
                game.paused = true;
                //timer.pause();
            }
            console.log('paused');
        }, this);
       
        if(level === 1){
                 
            currentlevel = new StaticLevel(game,timer);
            currentlevel.create();
            player = currentlevel.player;
            
            
            let update_level = function() {
                
                level = currentlevel.win(level)
            }
            
            
            space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            space.onDown.add(update_level,this);
            
            enter.onDown.add(function(){
                
                currentlevel.hint_count++;
                currentlevel.handle_hints();
                
            }, this);
          
            
        }else if (level === 2){
            
            const num_npcs = 3; 
            this.game.add.image(0,0,'bgd2');
            npc_spwan = [2700, 3900, 4500, 5600, 6600, 7300];
         
             //adicionar porta e botao aqui pq é especifico deste nivel
            game.add.image(9484,400,'sign');
            currentlevel = new PlatformLevel(game, num_npcs, npc_spwan);
            currentlevel.create();
            player = currentlevel.player;
            
            let end = false;
            let update_level = function() {
                
                level = currentlevel.win(level,end);
                currentlevel.reached_end = false;
            }
            
            space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            space.onDown.add(update_level,this);
            
            enter.onDown.add(function(){
                
                currentlevel.hint_count++;
                currentlevel.handle_hints();
                
            }, this);
          
            

            
            
            
        } else if(level === 3){
          
            currentlevel = new RunLevel(game, 50, 20, totalTime);
            currentlevel.create();
            player = currentlevel.player;
           
            
            enter.onDown.add(function(){
                
                currentlevel.hint_count++;
                currentlevel.handle_hints();
                
            }, this);
          
            
            
            
        }else if(level === -1){
            
			masterWindow.postMessage("game_over", "*");
            console.log('lost');
            //gerar GAME OVER E VOLTAR PARA O MENU PRINCIPAL
            
        }else{
			addTime(totalTime);
			masterWindow.postMessage("victory", "*");
            console.log('win');
            //GANHOU O JOGO E GERAR WIN SCREEN
            //calcular o tempo que demorou
			//adicionar o tempo ao cookie
			
			
			
            //verificar se faz parte dos melhores tempos e atualizar os rankings
        }
        
        text_lives = game.add.text(game.camera.x, game.camera.y, "Lives: "+ lives, {
            font: "40px peace-sans",
            fill: "Orange",
            align: "left"
        });

        text_lives.anchor.setTo(0, 0);
        text_time = game.add.text(game.camera.centerX, game.camera.y, "Time: " + totalTime +"s", {
            font: "40px peace-sans",
            fill: "Orange",
            align: "center"
        });

        text_time.anchor.setTo(0.5, 0);

    }
   
    function update (){
           
            //keys down events
        
            if (keys.left.isDown){

                right = false;
                left = true;
            }
            if (keys.right.isDown){

                left = false;
                right = true;

            }

            if (keys.up.isDown){

                jump = true;
            }
            
            if (shift.isDown){
                
                run = true;
                
            }
            
            //keys released events
        
            if (shift.isUp){
                
                run = false;
                
            }

            if (keys.left.isUp){

                left = false;
            }
            if (keys.right.isUp){

                right = false;

            }

            if (keys.up.isUp){

                jump = false;
            }
            //console.log(lives);
            let temp = currentlevel.update(level, lives, left, right, run, jump);
            lives = temp[0];
            level = temp[1];
        
            text_time.setText("Time: " + totalTime +"s");
            text_time.x = game.camera.centerX;
            text_time.y = game.camera.y;
            text_lives.setText("Lives: "+ lives);
            text_lives.y = game.camera.y;
            text_lives.x = game.camera.x;
    }
    function render() {
        
        //currentlevel.render();
        //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
        //game.debug.text('timer seconds: ' + totalTime, 100, 32);
        //game.debug.text('lives: ' + lives, 700, 32);

    }
    
    function msgHandler(ev) {
		masterWindow = ev.source;
	}

	function addTime(time) {
	    var string = document.cookie.split(";");
	    var field = string[0].split("=");
	    field[1] = time;
	    string[1] = field[0] + "=" + field[1];
	    for (var i = 0; i < string.length; i++) {
	        document.cookie = string[i];
	    }
	}



}


main();