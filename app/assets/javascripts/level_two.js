//jquery shorthand for ondocumentready
$(function(){
  // these are for creating a user id that we can save in the data base via .ajax
  var userId = gon.user_id;
  localStorage.setItem("userId", userId);

  if (gon.level == 2) {
    load_level_two();
  };
});



function load_level_two(){

    saveScore();


    var game = new Phaser.Game(860, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update, render: render});



    function preload() {
       
        // i dont know why previous_time / - 1000 works but it does
        beginningTimeSeconds = (game.time.time / 1000);
        
       

        // regular time variable
        beginningTimeMS = game.time.time;
        game.load.image('house', '/images/moneys_house.png');
        game.load.image('blank_line', '/images/blank_line.png');
        game.load.image('purp_line', '/images/purp_line.png');
        game.load.image('mountain', '/images/LEVEL2_mountains_sky_hollywood_sign.png');
        game.load.image('background', '/images/LEVEL2_city_buildings.png');
        game.load.image('close_background', '/images/LEVEL2_city_buildings.png');
        game.load.image('sidewalk', '/images/LEVEL2_foreground_street.png');
        game.load.spritesheet('user', '/images/runninmoney.png', 250, 320, 60);
        game.load.image('icecream', '/images/ice_cream.png');
        game.load.image('hotdog', '/images/mainHotDog.png');
        game.load.image('hotdogBurst', '/images/LEVEL2_OBSTACLE_hotdog.png');

      }
    

    var house, hotdogBurst, emitter, icecream;
        // these create the timer variables
    var timer;
    var timer2;
    // this adds the total time from the first level time into this level time at begining of level
    var total_hours = localStorage.getItem("total_hours");
    var total_minutes = localStorage.getItem("total_minutes"); 
    var total_seconds = localStorage.getItem("total_seconds");

    var total_points = localStorage.getItem("total_points");

    function create() {


        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.input.onDown.add(gofull, this);
        game.world.setBounds(0, 0, 10240, 2000);
         
        clouds = game.add.image(0, 0, 'mountain');
        clouds.scale.setTo(.5,.55);

        // grass = game.add.image(0, 100, 'grass');
        // grass.scale.setTo(.1,.2);


        // inserting background image
        background = game.add.image(0, 0, 'background');
        background.scale.setTo(.5,.5);

        close_building = game.add.image(500,-1035, 'close_background');
        // close_building.anchor.setTo(-0.4, .4);
        close_building.scale.setTo(1.5,1.5);


        sidewalk = game.add.image(0, -425, 'sidewalk');
        sidewalk.scale.setTo(.9,.9);
        // sidewalk.x += 10;
        //background.width = game.width

        // this is where we will be creating the hot dogs
        // hotdog = game.add.emitter(200, 200, 2);
        // hotdog.makeParticles('hotdog');
        // // hotdog.anchor.setTo(0.5, 0.5);
        // hotdog.scale.setTo(0.014,0.014);
        // game.physics.enable(hotdog, Phaser.Physics.ARCADE);
        // // hotdog.body.allowRotation = false;
        // hotdog.start(false, 5000, 20);


        


        // house = game.add.sprite(-150,-211,'house');
        // house.scale.setTo(1.2,1);
        // house.collideWorldBounds = false;
        
        // creating ground so i can customize ground
        platforms = game.add.group();
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        // adding sidewalk
        var ground = platforms.create(0,500, 'blank_line');
        game.physics.arcade.enable(ground);
        ground.scale.setTo(200, 2);
        ground.body.immovable = true;

        
       


        // creating player
        player = game.add.sprite(1, -200, 'user');
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        game.physics.enable(player);
        game.camera.follow(player);
        player.scale.setTo(0.6,0.6);
        player.body.gravity.y = 500;
        //  This adjusts the collision body size to be a 100x50 box.
        //  50, 25 is the X and Y offset of the newly sized box.
        player.body.setSize(45, 230, 65, 50);
        // player.body.checkCollision.up = false;
        // player.body.checkCollision.left = false;
        // player.body.checkCollision.right = false;
         //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y= 0.2;
        player.body.gravity.y = 375;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left',[3,4,5,6,7,8,9,10], 9, true);
        player.animations.add('right',[58,57,56,55,54,53,52,51,50], 9, true);


        

        cursors = game.input.keyboard.createCursorKeys();
        spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        // this is what creates the grass on the bottom of screen

        

                 //  Create our Timer
        timer = game.time.create(false);
        timer2 = game.time.create(false);
        //  Set a TimerEvent to occur after 2 seconds
        // if the seconds is game.time.time then this updates every 1 second real time (which is 1 second real time  = 1000 on phaser for some reason). So we want our game to be 2 minutes long real time. so 
        
        // 1000 = update every second
        // 1000 * 60  = 60,000(update once a minute (real time)
        // 60,000 * 2 = 120,000(update every two minutes)
       
        // how many minutes are in 2 min
        // 120 seconds = 2 minutes
        // 120 seconds / 10 = 12 seconds per minute game time
        // 12 * 1000 = 12,000 (makes clock time increase every 12 seconds!!!!)

        // so now every 12 seconds, this loop saves time on the clock at 
        // timer.loop(12000, updateCounter, this);
        // this is the look that updates the game time seconds.
        // in game time, one second = 200
        timer.loop(200, updateCounter_2, this);
        
        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        timer.start();
        timer2.start();
        
        gameTime = ('TIME: ' + total_hours + ":" + total_minutes + ":" + total_seconds +' a.m.');

        emitter = game.add.emitter(game.world.centerX, 200, 400);
        emitter.makeParticles('hotdogBurst');
        //false means don't explode all the sprites at once, but instead release at a rate of 20 (150) particles per frame

        //  The 5000 value is the lifespan of each particle
        emitter.start(false, 5000, 190);
       
        icecreams = game.add.group();
        icecreams.enableBody = true;

        function createIcecream(x, y, size, xVelocity){
                var icecream = "icecream"
               
                icecream = icecreams.create(x, y, icecream);
                game.physics.arcade.enable(icecream);
                icecream.body.immovable = true;
                icecream.scale.setTo(.1, .1);
                icecream.body.velocity.x = xVelocity;
                icecream.body.bounce.y = 0.1;
                icecream.body.collideWorldBounds = false;

            
            }

        game.time.events.loop(Phaser.Timer.SECOND * 3, icecreamLaunch, this);
        icecreamLaunch();
        
        function icecreamLaunch() {
            createIcecream(1500, 80, 1.2, -600);
            createIcecream(-1500, 80, 1.2, -600);
            createIcecream(-500, 385, 1.5, -500);
            createIcecream(1000, 530, 1.5, -500);
        }


    }



    function update() {
        
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(icecreams, platforms);
        game.physics.arcade.collide(player, icecreams);
        // game.physics.arcade.collide(player, hotdog);
        // game.physics.arcade.moveToObject(hotdog, player, 60, 1000);

        // this is what makes the hot dog follow the player
        


        // helps with parallax movement
        clouds.x=game.camera.x*0.9;
        // the little - and + at after these game.camera.x set the object based on the camera position
        background.x=(game.camera.x*0.8)-3000;
        close_building.x=(game.camera.x*0.25) + 2500;
        sidewalk.x=game.camera.x*0.2;
        // grass.x=game.camera.x*0.8;
        // house.x=game.camera.x*0.2;

       
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -1250;
            

            player.animations.play('left');
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 1250;


            player.animations.play('right');
            game.camera.x += 4;
            
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 24;
        }

        //  Allow the player to jump if they are touching the ground.
        if (spaceBar.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }



    }

    function gofull() {

        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(false);
        }
    }



    // this is the function that updates the clock and keeps track
    function updateCounter_2() {
       
       if (total_seconds > 59) 
        {
            total_seconds = total_seconds - 60;
            total_minutes ++;
              
              if (total_minutes > 59) 
                {
                total_minutes = total_minutes - 60;
                total_hours++;
                }
              else {

              }
        }
        else    
        {
            total_seconds++;
        }
        // this updates the clock
        gameTime.text = 'TIME: ' + total_hours + ":" + total_minutes + ":" + total_seconds +' a.m.';
    }

    // these will be the code that ends the level and saves data and kills player and takes you to the next map. This is a place holder for now
    // this is the actually function being called when you jump out the window. this bring you to the next level

    function overlapHandler (player, exit_window) {

        game.stage.backgroundColor = '#992d2d';
    // this makes player disappear when they change levels
        player.kill();

       

                
          // this changes level
        var levelChange = function() {
            // this kills timer after you win
            timer.stop();
            timer2.stop();

            // this is what saves the time to local storage
            localStorage.setItem("total_minutes", total_minutes);

            localStorage.setItem("total_hours", total_hours);

            localStorage.setItem("total_seconds", total_seconds);

            localStorage.setItem("firstLevelClock", gameTime);

            
            localStorage.setItem("secondLevelClock", gameTime);

            saveScore();
            // insert timeout function
            // window.location.replace("http://reincarnage.herokuapp.com/level2intro")};
            window.location.replace("http://localhost:3000/games/level_two")};
            
            $('body').fadeOut(2000, function(){levelChange();});

    }




    function render() {
        // this is to display the clock
        game.debug.text('TIME: ' + total_hours + ":" + total_minutes + ":" + total_seconds +' a.m.', 358, 25);
        // this allows player to be followed by camera
        // game.debug.cameraInfo(game.camera, 0, 0);
        
         game.debug.body(player);
         game.debug.body(icecreams);
    }

}