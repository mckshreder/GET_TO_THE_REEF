//jquery shorthand for ondocumentready
$(function(){
  // these are for creating a user id that we can save in the data base via .ajax
  var userId = gon.user_id;
  localStorage.setItem("userId", userId);

  if (gon.level == 1) {
    load_level_one();
  };
});



//we need objects to test against, so we're creating an object called load_level_one
function load_level_one(){

  function update_total_points(change_points) {
    total_points += change_points;
  }

  // for timer
  var pauser = true;

  var game = new Phaser.Game(860, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update, render: render });


  var coins, clouds, cloud, player, ringing_alarm, pizzaSlice, phone, ledge_4, exit_window,keys, money_message;



  function preload() {
    localStorage.clear();
    // this is for the clock
    beginningTimeSeconds = game.time.time / 1000;
    beginningTimeMS = game.time.time;
    console.log(beginningTimeMS);

    game.load.image('background', '/images/LEVEL1_modern_bedroom.png');
    game.load.image('blank_line', '/images/blank_line.png');
    game.load.image('purp_line', '/images/purp_line.png');
    game.load.image('blank_line_vertical', '/images/blank_line_vertical.png');
    game.load.image('purp_line_vertical', '/images/purp_line_vertical.png');
    game.load.image('ringing_alarm_clock', '/images/ringing_alarm_clock.png');
    game.load.image('pizza', '/images/pizza.png');
    game.load.image('pizzabox', '/images/pizzabox.png');
    game.load.image('phone', '/images/iphone.png');
    game.load.image('keys', '/images/keys.png');
    game.load.image('keys_message', '/images/LEVEL1_keys_message.png');
    game.load.image('message', '/images/LEVEL1_message_boneout.png');
      // game.load.spritesheet('user', '/images/hotdogsprite.png', 49, 100);
    game.load.spritesheet('user', '/images/runninmoney.png', 250, 320, 60);
    game.load.spritesheet('coin', '/images/redgacoin.png', 273.29, 300);
    game.load.spritesheet('cloud', '/images/cloudsprite.png', 500, 275, 13);
    game.load.audio('alarm', '/sounds/alarm.mp3');

  }

  // these create the timer variables
  // these should be variables on the game object rather than global
  var timer;
  var timer2;
  //setting the value of the properties of the object-- hence no "var"
  var total_minutes = 50;
  var total_hours = 8;
  var total_seconds = 0;

  var total_points = 0;

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);

      
    
    // inserting background image
    background = game.add.image(0, 0, 'background');
    background.height = game.height;
    background.width = game.width;
      
    // creating platform group to contain the floor
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

      
      // creating the floor for the game
     var ground = platforms.create(0, game.world.height -70, 'blank_line');
     game.physics.arcade.enable(ground);
     ground.scale.setTo(200, 2);
     ground.body.immovable = true;

  // this is the ledge for the rug to the right
      ledge_1 = platforms.create(590, 470, 'blank_line');
      ledge_1.scale.setTo(1.5, 1);
      ledge_1.body.immovable = true;
      ledge_1.body.checkCollision.left = false;
      ledge_1.body.checkCollision.right = false;
      

      // this is the ledge for the bed
      ledge_2 = platforms.create(300, 375, 'blank_line');
      ledge_2.scale.setTo(2.7, 1);
      ledge_2.body.immovable = true;
      ledge_2.body.checkCollision.left = false;
      ledge_2.body.checkCollision.right = false;

      // this is the ledge for the top of the bedframe below mattress
      ledge_5 = platforms.create(290, 430, 'blank_line');
      ledge_5.scale.setTo(3, 1);
      ledge_5.body.immovable = true;
      ledge_5.body.checkCollision.left = false;
      ledge_5.body.checkCollision.right = false;


    // this is where we create the ringing alarm clock alarm clock
      ringing_alarm = game.add.sprite(650,370, 'ringing_alarm_clock');
      game.physics.arcade.enable(ringing_alarm);
      ringing_alarm.body.setSize(45, 130, 0, 0);
      ringing_alarm.scale.x = game.rnd.realInRange(.01, .01);
      ringing_alarm.scale.y = game.rnd.realInRange(.01, .01);
      ringing_alarm.anchor.set(0.5);
      ringing_alarm.smoothed = false;
      // this is what makes teh alarm animate
      game.add.tween(ringing_alarm.scale).to( { x: 0.3, y: 0.3 }, 250, Phaser.Easing.Linear.None, true, 0, 100, true);
      // this is the alarm sound
      alarm = game.add.audio('alarm');
      alarm.play();

        // game.physics.arcade.overlap(player, ringing_alarm, collectCoin, null, this);

        // game.time.events.add(Phaser.Timer.SECOND * 3, playerCreate, this);


      // bring character into the game
      player = game.add.sprite(270, 210, 'user');
      // We need to enable physics on the player
      game.physics.arcade.enable(player);
      player.scale.setTo(0.6,0.6);
      player.body.setSize(45, 230, 65, 50);
      player.body.gravity.y = 500;
      player.body.checkCollision.up = false;
      // player.body.checkCollision.left = false;
      // player.body.checkCollision.right = false;
     //  Player physics properties. Give the little guy a slight bounce.
      player.body.bounce.y= 0.2;
      player.body.gravity.y = 575;
      player.body.collideWorldBounds = true;

      //  Our two animations, walking left and right.
      player.animations.add('left',[3,4,5,6,7,8,9,10], 9, true);
      player.animations.add('right',[58,57,56,55,54,53,52,51,50], 9, true);
      // player.animations.add('jumpLeft', [14], 3, true);
      // player.animations.add('jumpRight', [26], 3, true);

      // this is where player movement starts 
      cursors = game.input.keyboard.createCursorKeys();
      spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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
      // 12 * 1000 = 12,000 (makes clock time increase one minute every 12 seconds!!!!)

      // so now every 12 seconds(one minute game time) , this loop saves time on the clock
    // timer.loop(12000, updateCounter, this);
    // this is the look that updates the game time seconds.
    // in game time, one second = 200
    timer.loop(200, updateCounter_2, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
    timer2.start();

    gameTime = ('TIME: ' + total_hours + ":" + total_minutes + ":" + total_seconds +' a.m.');


  // clouds = game.add.group();

  // clouds.enableBody = true;
  //         var cloud = clouds.create(i * 100,200, 'cloud');
  //         // cloud.scale.x = game.rnd.realInRange(.24, .24);
  //         // cloud.scale.y = game.rnd.realInRange(.24, .24);
          
  //         cloud.animations.add('cloud',[1,2,3,4,5,6,7,8,9,10,11,12], 7 , true);
  //         cloud.animations.play('cloud');


  // coins = game.add.group();

    //   coins.enableBody = true;

    //   //  Here we'll create 12 of them evenly spaced apart
    //   for (var i = 1.8; i < 4.5; i++)
    //   {
    //       //  Create a star inside of the 'stars' group
    //       var coin = coins.create(i * 90, 0, 'coin');
    //       coin.scale.x = game.rnd.realInRange(.24, .24);
      // coin.scale.y = game.rnd.realInRange(.24, .24);

    //       //  Let gravity do its thing
    //       coin.body.gravity.y = 300;
    //       //  This just gives each star a slightly random bounce value
    //       coin.body.bounce.y = 0.6 + Math.random() * 0.4;

    //       coin.animations.add('spin', [5, 6, 7, 8, 9, 10, 9], 10, true);
    //       coin.animations.play('spin');
    //   }

          
          
       
        
  }





  function update() {
    // this calls the pizza when you turn alarm clock off
    game.physics.arcade.overlap(player, ringing_alarm, createPizza, null, this);
    game.physics.arcade.overlap(player, pizzaSlice, createPhone, null, this);
    game.physics.arcade.overlap(player, phone, createPlant, null, this);
    game.physics.arcade.overlap(player, ledge_4, createKeys, null, this);


    // for could movement
      
    
      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;

      if (cursors.left.isDown)
      {
          //  Move to the left
          player.body.velocity.x = -250;

          player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
          //  Move to the right
          player.body.velocity.x = 250;

          player.animations.play('right');
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


      // coin animation
    
    game.physics.arcade.collide(coins, platforms);
    game.physics.arcade.collide(player, platforms);


    // allows player to collect coins
    game.physics.arcade.overlap(player, coins, collectCoin, null, this);

    // this allows the player to overlap with the window and allow you to jump out of it when you hit it.
    game.physics.arcade.overlap(player, exit_window, overlapHandler, null, this);
    

  }


  function createPizza() {
    // this terminates the alarm graphic and make the pizza
    update_total_points(20);
    ringing_alarm.kill();
    alarm.stop();
    pizzaBox = game.add.sprite(20, 400, 'pizzabox');
    pizzaBox.scale.setTo(0.25,0.25);
    game.physics.arcade.enable(pizzaBox);
    pizzaBox.body.setSize(45, 230, 0, 0);

    pizzaSlice = game.add.sprite(95, 445, 'pizza');
      game.physics.arcade.enable(pizzaSlice);
      pizzaSlice.body.setSize(45, 230, 0, 0);
      pizzaSlice.scale.x = game.rnd.realInRange(0.18, 0.18);
      pizzaSlice.scale.y = game.rnd.realInRange(0.18, 0.18);
      pizzaSlice.anchor.set(0.5);
      pizzaSlice.smoothed = false;
      // this is what makes the alarm animate
      game.add.tween(pizzaSlice.scale).to( { x: 0.3, y: 0.3 }, 450, Phaser.Easing.Linear.None, true, 0, 2, true);

  }

  function createPhone() {
    // this terminates the alarm graphic and make the pizza
    pizzaSlice.kill();
    pizzaBox.kill();

    phone = game.add.sprite(800, 475, 'phone');
        game.physics.arcade.enable(phone);
        phone.body.setSize(45, 230, 0, 0);
        phone.scale.x = game.rnd.realInRange(0.11, 0.11);
        phone.scale.y = game.rnd.realInRange(0.11, 0.11);
        phone.anchor.set(0.5);
        phone.smoothed = false;
        // this is what makes the alarm animate
        game.add.tween(phone.scale).to( { x: 0.15, y: 0.15 }, 400, Phaser.Easing.Linear.None, true, 0, 2, true);

  }

  function createPlant() {
    // this terminates the alarm graphic and make the planter ledge you have to run into to unock the keys
    phone.kill();
  // this is the message that says find moneys keys

    money_message = game.add.sprite(420, 270, 'keys_message');
      game.physics.arcade.enable(money_message);
      money_message.body.setSize(45, 230, 0, 0);
      money_message.scale.x = game.rnd.realInRange(0.8, 0.8);
      money_message.scale.y = game.rnd.realInRange(0.8, 0.8);
      money_message.anchor.set(0.5);
      money_message.smoothed = false;
      // this is what makes teh alarm animate
      game.add.tween(money_message.scale).to( { x: 1, y: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 2, true);

      // this is the ledge for the top of the plant
      ledge_4 = platforms.create(140, 350, 'purp_line');
      ledge_4.scale.setTo(0.5, 0);
      ledge_4.body.immovable = true;
      game.physics.arcade.enable(ledge_4);


  }

  function createKeys() {
    // this terminates the alarm graphic and make the keys 
    ledge_4.kill();
    money_message.kill();
    

    keys = game.add.sprite(140, 350, 'keys');
        game.physics.arcade.enable(keys);
        keys.body.setSize(45, 230, 0, 0);
        keys.scale.x = game.rnd.realInRange(0.01, 0.01);
        keys.scale.y = game.rnd.realInRange(0.01, 0.01);
        keys.anchor.set(0.5);
        keys.smoothed = false;
        // this is what makes teh alarm animate
    game.add.tween(keys.scale).to( { x: 0.8, y: 0.8 }, 550, Phaser.Easing.Linear.None, true, 500, 100, true);

     message = game.add.sprite(140, 350, 'message');
        game.physics.arcade.enable(message);
        message.body.setSize(45, 230, 0, 0);
        message.scale.x = game.rnd.realInRange(0.5, 0.5);
        message.scale.y = game.rnd.realInRange(0.5, 0.5);
        message.anchor.set(0.5);
        message.smoothed = false;
        // this is what makes teh alarm animate
        game.add.tween(message.scale).to( { x: 1, y: 1 }, 6000, Phaser.Easing.Linear.None, true, 500, 100, true);

        game.time.events.add(Phaser.Timer.SECOND * 6, createExitWindow, this);
  }

  function createExitWindow() {
      keys.kill();
      message.kill();
      // this is for the line that makes the window allow you to jump out of it to the next level
        exit_window = game.add.sprite(840, 100, 'blank_line_vertical');
        exit_window.scale.setTo(2, 1);
        game.physics.arcade.enable(exit_window);


  }


  // this function makes the screen go fullscreen when you call it
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


  var score = 0;


  function collectCoin (player, coin) {
    
      // Removes the star from the screen
      coin.kill();
      

      
      score += 10;
      // scoreText.text = 'Score: ' + score;
     

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



  function render() {
      // this is to display the clock
      game.debug.text('TIME: ' + total_hours + ":" + total_minutes + ":" + total_seconds +' a.m.', 358, 25);
      
      // game.debug.body(player);
      
  }

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

          //this saves points to local storage
          localStorage.setItem("total_points", total_points)

          // insert timeout function
          // window.location.replace("http://reincarnage.herokuapp.com/level2intro")};
          window.location.replace("http://localhost:3000/games/level_two")};
          
          $('body').fadeOut(2000, function(){levelChange();});

  }




}

