/**
 * Assets: 
 * https://free-game-assets.itch.io/free-tiny-hero-sprites-pixel-art
 * https://deepdivegamestudio.itch.io/demon-sprite-pack
 * https://elthen.itch.io/2d-pixel-art-minotaur-sprites
 * https://yrixsasow.itch.io/heart-icon-2
 * https://osmanfrat.itch.io/coin
 * 
 * Scrolling Background:
 * https://pixfinity.itch.io/the-dungeon-pack
 * 
 * Buttons:
 * https://nectanebo.itch.io/menu-buttons
 * https://prinbles.itch.io/yet-another-icons
 * 
 * Key images:
 * https://illugion.itch.io/pixel-keyboard-lite
 * 
 * Background Music:
 * https://pixabay.com/music/beats-stellar-echoes-202315/
 * 
 * Social Media icons:
 * https://cazwolf.itch.io/caz-social-media
 * 
 * P5 logo:
 * https://p5play.org/assets/p5play_logo.svg
 * 
 * Font:
 * https://www.1001freefonts.com/watanabe.font
 * 
 * Sound Effects:
 * https://pixabay.com/sound-effects/collect-5930/
 * https://pixabay.com/sound-effects/poof-of-smoke-87381/
 * https://pixabay.com/sound-effects/negative-beeps-6008/
 * https://pixabay.com/sound-effects/cash-register-purchase-87313/
 * https://pixabay.com/sound-effects/item-equip-6904/
 * https://pixabay.com/sound-effects/game-bonus-144751/
 * https://pixabay.com/sound-effects/monster-sound-medium-death-94826/
 * https://pixabay.com/sound-effects/male-hurt7-48124/
 * https://pixabay.com/sound-effects/computer-startup-music-97699/
 * 
 * Author: Gary Huang
 * Date: Mar 19, 2024
 */

// fps stats
let fps, timer;

// character variables
// facing: direction false for left, true for right
let facing = true;
let isPunching = false;
let isDoublePunching = false;

// sprite objects
let player, hand, rocks, floor, box;
let currentCharacter = 'Pink_Monster';
let characters = ['Pink_Monster', 'Owlet_Monster', 'Dude_Monster'];

// sprite enemy objects
let enemiesAni = [];

// sensors
let playerSensor;

// image objects
let rocksImg = [];
let boss, bossImg, coinImg, heartImg, pinkMonster, owletMonster, dudeMonster;

// background
let light, sky, downLayer, middleLayer, topLayer;
let offSetX = 0;

// game state
let gameState = enterScreen;

// home screen menu 
let playButton, shopButton, controlsButton, creditsButton, gmail, linkedIn, instagram, github, discord, socialText;

let newGameButton, gura, p5logo;

// settings screen button
let settingsButton, closeButton, homeButton, musicOnButton, musicOffButton, newGameButtonSquare;

// shop variables - buttons, if bought
let pinkButton, owletButton, dudeButton;
let owletBuy = false;
let dudeBuy = false;

let backButton;

// control variables
let keysImgs = [];
let keysInfo = [
    "Jump",
    "Move left",
    "Move right",
    "Punch",
    "Double punch",
    "Throw rocks"
];

// enemy variables
let spawnEnemy = true;
let bossAttacking = false;
let bossMoves = [
    'idle',
    'run',
    'angry',
    'angry2',
    'atk1',
    'atk2',
    'atk3'
];
let changeMoveCd = 0;
let tempBossSpeed;

let stage = 1;
let font;

// coins
let coins = 0;
let coinMultiplier = 1;
let randomCoins;
let randomCoinGet = true;

// music & sound effects
let backgroundMusic, collectPowerup, playerDeath, gameOverSound, purchasedSound, itemEquip, completedSound, bossDeath, playerHurt, startup;

let tutorialShow = true;

/**
 * Preload images, sounds and font
 */
function preload(){
    // rocks
    rocksImg = [
        loadImage("assets/Pink_Monster/Rock1.png"),
        loadImage("assets/Pink_Monster/Rock2.png")
    ];

    // enemies
    enemiesAni = [
        loadAnimation('assets/Basic Demon/antlered rascal/AntleredRascal.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/clawed abomination/ClawedAbomination.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/crimson imp/CrimsonImp.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/depraved blackguard/DepravedBlackguard.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/fledgling demon/FledglingDemon.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/floating eye/FloatingEye.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/foul gouger/FoulGouger.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/grinning gremlin/GrinningGremlin.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/nefarious scamp/NefariousScamp.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/pit balor/PitBalor.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/pointed demonspawn/PointedDemonspawn.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/rascally demonling/RascallyDemonling.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/tainted scoundrel/TaintedScoundrel.png', { frameSize: [16, 16], frames: 4 }),
        loadAnimation('assets/Basic Demon/warp skull/WarpSkull.png', { frameSize: [16, 16], frames: 4 })
    ];
    bossImg = loadImage('assets/Minotaur - Sprite Sheet.png');
    
    // hearts and coins
    heartImg = loadImage('assets/heart.png');
    coinImg = loadImage('assets/coin_spin.gif');

    // background image
    light = loadImage('assets/ParallaxBackground/Light.png');
    sky = loadImage('assets/ParallaxBackground/Sky.png');
    downLayer = loadImage('assets/ParallaxBackground/DownLayer.png');
    middleLayer = loadImage('assets/ParallaxBackground/MiddleLayer.png');
    topLayer = loadImage('assets/ParallaxBackground/TopLayer.png');

    // characters
    pinkMonster = loadImage('assets/Pink_Monster/Pink_Monster.png');
    owletMonster = loadImage('assets/Owlet_Monster/Owlet_Monster.png');
    dudeMonster = loadImage('assets/Dude_Monster/Dude_Monster.png');

    keysImgs = [
        loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_w.png'),
        loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_a.png'),
        loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_d.png'),
        loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_j.png'),
        loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_k.png'),
        loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_l.png')
    ];

    // bgm
    backgroundMusic = loadSound("assets/Music/stellar echoes.mp3");
    backgroundMusic.setVolume(0.3);

    // sounds effects
    collectPowerup = loadSound("assets/Music/collect powerup.mp3");
    playerDeath = loadSound("assets/Music/poof smoke.mp3");
    gameOverSound = loadSound("assets/Music/game over.mp3");
    purchasedSound = loadSound("assets/Music/cash register purchase.mp3");
    itemEquip = loadSound("assets/Music/item equip.mp3");
    completedSound = loadSound("assets/Music/game bonus.mp3");
    bossDeath = loadSound("assets/Music/death.mp3");
    playerHurt = loadSound("assets/Music/male hurt.mp3");
    startup = loadSound("assets/Music/startup.mp3");
    startup.setVolume(0.5);


    // font
    font = loadFont("assets/Font/Watanabe.ttf");

    // logos
    gura = loadImage("assets/icons/gura.png");
    p5logo = loadImage("https://p5play.org/assets/p5play_logo.svg");
}

/**
 * Set up sprites and buttons 
 */
function setup(){
    textFont(font);
    new Canvas(1000, 700);
    world.gravity.y = 5;

    // player
    player = new Sprite(500, 500, 32, 32);
    player.scale *= 2;
    player.health = 5;
    for (let character of characters){
        player.addAni(`${character}atk1`, `assets/${character}/${character}_Attack1_4.png`, { frameSize: [32, 32], frames: 4 });
        player.addAni(`${character}atk2`, `assets/${character}/${character}_Attack2_6.png`, { frameSize: [32, 32], frames: 6 });
        player.addAni(`${character}death`, `assets/${character}/${character}_Death_8.png`, { frameSize: [32, 32], frames: 8 });
        player.addAni(`${character}hurt`, `assets/${character}/${character}_Hurt_4.png`, { frameSize: [32, 32], frames: 4 });
        player.addAni(`${character}jump`, `assets/${character}/${character}_Jump_8.png`, { frameSize: [32, 32], frames: 8 });
        player.addAni(`${character}walk`, `assets/${character}/${character}_Walk_6.png`, { frameSize: [32, 32], frames: 6 });
        player.addAni(`${character}run`, `assets/${character}/${character}_Run_6.png`, { frameSize: [32, 32], frames: 6 });
        player.addAni(`${character}walkAtk`, `assets/${character}/${character}_Walk+Attack_6.png`, { frameSize: [32, 32], frames: 6 });
        player.addAni(`${character}throw`, `assets/${character}/${character}_Throw_4.png`, { frameSize: [32, 32], frames: 4 });
        player.addAni(`${character}idle`, `assets/${character}/${character}_Idle_4.png`, { frameSize: [32, 32], frames: 4 });
    }
    player.ani = `${currentCharacter}idle`;
    playerSensor = new Sprite(player.x, player.y+5, 50, 60, 'none');
    playerSensor.visible = false;
    new GlueJoint(player, playerSensor);
    // player's hand for rock throw
    hand = new Sprite();
    hand.diameter = 1;
    hand.collider = 'None';
    hand.visible = false;

    // rocks
    rocks = new Group();
    rocks.x = () => hand.x;
    rocks.y = () => hand.y;
    rocks.speed = 10;
    rocks.life = 100;

    // floor
    floor = new Sprite(500, 565, 1300, 10, 'static');
	floor.color = color(255, 0, 0, 0);
	floor.stroke = color(255, 0, 0, 0);

    // enemies
    enemies = new Group();
    enemies.y = 540;
    enemies.health = () => round(random(2, 10));
    enemies.isBoss = false;
    enemies.isHit = false;
    enemies.collides(rocks, enemyHit);
    enemies.collides(player, playerHit);

    // boss
    boss = new Sprite(700, 150, 54, 42, 'static');
    boss.spriteSheet = bossImg;
    boss.scale *= 2;
    boss.health = 200;
    boss.isBoss = true;
    boss.addAnis({
        run: { row:1, frameSize: [96, 92], frames: 8 },
        angry: { row:2, frameSize: [96, 94], frames: 5 },
        atk1: { row:3, frameSize: [96, 94], frames: 9 },
        atk2: { row:4, frameSize: [96, 95], frames: 5 },
        angry2: { row:5, frameSize: [96, 95], frames: 6 },
        atk3: { row:6, frameSize: [96, 95], frames: 9 },
        death: { row:9, frameSize: [96, 95.5], frames: 6 },
        idle: { row:0, frameSize: [96, 84], frames: 5 },
    });
    boss.visible = false;
    boss.collides(rocks, enemyHit);
    boss.collides(player, playerHit);

    allSprites.autoDraw = false;
    allSprites.autoUpdate = false;

    // intro buttons
    playButton = createImg('assets/Menu Buttons/Large Buttons/Large Buttons/Play Button.png')
        .size(120, 50)
        .position(440, 310)
        .hide()
        .mousePressed(() => {
            if (tutorialShow){
                gameState = tutorial;
                tutorialShow = false;
            }else gameState = runGame;
            player.ani = `${currentCharacter}idle`;
            opacity = 255;
            leaveIntro();
            shopButton.hide();
            creditsButton.hide();
            backButton.hide();
            settingsButton.show();
        });
    shopButton = createImg('assets/Prinbles/Black-Icon/Cart.png')
        .size(50, 50)
        .position(875, 20)
        .hide()
        .mousePressed(() => {
            if (gameState == intro) leaveIntro();
            gameState = shop;
        })
    controlsButton = createImg('assets/Menu Buttons/Large Buttons/Large Buttons/Controls Button.png')
        .size(120, 50)
        .position(440, 370)
        .hide()
        .mousePressed(() => {
            leaveIntro();
            gameState = controls;
        });
    creditsButton = createImg('assets/Menu Buttons/Square Buttons/Square Buttons/Info Square Button.png')
        .size(50, 50)
        .position(820, 20)
        .hide()
        .mousePressed(() => {
            if (gameState == intro) leaveIntro();
            else if (gameState == shop) leaveShop();
            gameState = credits;
        })

    // shop buttons
    pinkButton = createButton('Equipped')
        .hide()
        .position(215, 370)
        .mousePressed(() => {
        if (currentCharacter != 'Pink_Monster'){
            currentCharacter = 'Pink_Monster';
            pinkButton.html('Equipped');
            itemEquip.play();
        }
    });
    owletButton = createButton('Buy')
        .hide()
        .position(485, 370)
        .mousePressed(() => {
        if (coins >= 50 && !owletBuy && currentCharacter != 'Owlet_Monster'){
            coins -= 50;
            owletBuy = true;
            currentCharacter = 'Owlet_Monster';
            owletButton.html('Equipped');
            purchasedSound.play();
        }else if (owletBuy){
            owletButton.html('Equipped');
            itemEquip.play();
            currentCharacter = 'Owlet_Monster';
        }
    });
    dudeButton = createButton('Buy')
        .hide()
        .position(745, 370)
        .mousePressed(() => {
        if (coins >= 100 && !dudeBuy && currentCharacter != 'Dude_Monster'){
            coins -= 100;
            dudeBuy = true;
            currentCharacter = 'Dude_Monster';
            dudeButton.html('Equipped');
            purchasedSound.play()
        }else if (dudeBuy){
            dudeButton.html('Equipped');
            itemEquip.play();
            currentCharacter = 'Dude_Monster';
        }
    });

    backButton = createImg('assets/Menu Buttons/Square Buttons/Square Buttons/Home Square Button.png')
        .size(50, 50)
        .position(930, 20)
        .hide()
        .mousePressed(() => {
            if (gameState == shop) leaveShop();
            gameState = intro;
        })
    newGameButton = createImg('assets/Menu Buttons/Large Buttons/Large Buttons/New Game Button.png')
        .hide()
        .size(120, 50)
        .position(440, 370)
        .mousePressed(() => {
            if (gameState == win) coins += randomCoins;
            newGame = true;
            restartGame();
            gameState = runGame;
            opacity = 255;
            newGameButton.hide();
            settingsButton.show();
        });

    // settings buttons
    settingsButton = createImg('assets/Menu Buttons/Square Buttons/Square Buttons/Settings Square Button.png')
        .size(50, 50)
        .position(930, 20)
        .hide()
        .mousePressed(() => {
            gameState = setting;
            tempBossSpeed = boss.speed;
            boss.speed = 0;
            closeButton.show();
            homeButton.show();
            musicOnButton.show();
            musicOffButton.show();
            newGameButtonSquare.show();
        });
    closeButton = createImg('assets/Prinbles/Black-Icon/Cross.png')
        .size(25, 25)
        .position(715, 185)
        .hide()
        .mousePressed(() => {
            gameState = runGame;
            leaveSettings();
            boss.speed = tempBossSpeed;
            if (player.health <= 0) gameState = gameOver;
        });
    homeButton = createImg('assets/Prinbles/Black-Icon/Home.png')
        .size(100, 100)
        .position(275, 300)
        .hide()
        .mousePressed(() => {
            restartGame();
            gameState = intro;
            leaveSettings();
            settingsButton.hide();
        });
    musicOnButton = createImg('assets/Prinbles/Black-Icon/Music-On.png')
        .size(100, 100)
        .position(395, 300)
        .hide()
        .mousePressed(() => {
            backgroundMusic.setVolume(0.3);
            collectPowerup.setVolume(1);
            playerDeath.setVolume(1);
            gameOverSound.setVolume(1);
            purchasedSound.setVolume(1);
            itemEquip.setVolume(1);
            completedSound.setVolume(1);
            bossDeath.setVolume(1);
            playerHurt.setVolume(1);
        });

    musicOffButton = createImg('assets/Prinbles/Black-Icon/Music-Off.png')
        .size(100, 100)
        .position(515, 300)
        .hide()
        .mousePressed(() => {
            backgroundMusic.setVolume(0);
            collectPowerup.setVolume(0);
            playerDeath.setVolume(0);
            gameOverSound.setVolume(0);
            purchasedSound.setVolume(0);
            itemEquip.setVolume(0);
            completedSound.setVolume(0);
            bossDeath.setVolume(0);
            playerHurt.setVolume(0);
        });

    newGameButtonSquare = createImg('assets/Prinbles/Black-Icon/Play.png')
        .size(100, 100)
        .position(635, 300)
        .hide()
        .mousePressed(() => {
            leaveSettings();
            newGame = true;
            restartGame();
            gameState = runGame;
            opacity = 255;
            settingsButton.show();
        });

    // resize images
    coinImg.resize(20,20);
    heartImg.resize(25,25);
    pinkMonster.resize(100, 100);
    owletMonster.resize(100, 100);
    dudeMonster.resize(100, 100);
    for (let i = 0; i < keysImgs.length; i++) keysImgs[i].resize(50, 50);
    sky.resize(1000, 700);
    downLayer.resize(1000, 700);
    middleLayer.resize(1000, 700);
    topLayer.resize(1000, 700);
    light.resize(1000, 700);
    gura.resize(100, 100);

    // social media icons
    gmail = createImg("assets/Pixel Fantasy Icons Social Media/MV Icons Social Media/Individual Icons/social-media4.png")
        .size(40,40)
        .position(740, 625)
        .hide()
        .mouseOver(() => {
            socialText = "garyhuang325@gmail.com"
        });

    linkedIn = createImg("assets/Pixel Fantasy Icons Social Media/MV Icons Social Media/Individual Icons/social-media5.png")
        .size(40,40)
        .position(790, 625)
        .hide()
        .mouseOver(() => {
            socialText = "@Gary Huang";
        });
    
    instagram = createImg("assets/Pixel Fantasy Icons Social Media/MV Icons Social Media/Individual Icons/social-media6.png")
        .size(40,40)
        .position(840, 625)
        .hide()
        .mouseOver(() => {
            socialText = "@gary_huangg";
        });

    github = createImg("assets/Pixel Fantasy Icons Social Media/MV Icons Social Media/Individual Icons/social-media24.png")
        .size(40,40)
        .position(890, 625)
        .hide()
        .mouseOver(() => {
            socialText = "@CheesyModz";
        });

    discord = createImg("assets/Pixel Fantasy Icons Social Media/MV Icons Social Media/Individual Icons/social-media25.png")
        .size(40,40)
        .position(940, 625)
        .hide()
        .mouseOver(() => {
            socialText = "@itscheesemodz";
        });

    startup.play();
}

/**
 * Function for collision between enemy and rock
 * 
 * @param {*} enemy - enemy that was hit by rock
 * @param {*} rock  - rock that hit enemy
 */

function enemyHit(enemy, rock){
    rock.remove();
    enemy.health--;

    // set enemy to be hit to display hp bar
    if (!enemy.isHit) enemy.isHit = true;

    // if enemy is not boss and hp is 0 remove enemy
    if (enemy.health <= 0 && !enemy.isBoss) enemy.remove();
}

// cooldown variables
let playerHitCd = 0;
let enemyHitCd = 0;

/**
 * Function for collision between player and enemy
 * 
 * @param {*} enemy  - enemy that collided with player
 * @param {*} player  - player
 * @returns 
 */

function playerHit(enemy, player){
    // if player is punching, decrease enemy's health and set atk cd
    if (isPunching && enemyHitCd == 0){
        enemy.health -= 2;
        enemyHitCd = 10;
    }else if (isDoublePunching && enemyHitCd == 0){
        enemy.health -= 3;
        enemyHitCd = 10;
    }

    // if enemy is hit, display hp bar, remove enemy if hp 0 and do nothing if boss is not attacking
    if (!enemy.isHit && !enemy.isBoss) enemy.isHit = true;
    if (enemy.health <= 0 && !enemy.isBoss) enemy.remove();
    if (!bossAttacking && enemy.isBoss) return;

    // decrease player hp and set a cooldown
    if (playerHitCd == 0){
        player.health--;
        playerHitCd = 30;
        playerHurt.play();
        // if player is dead change screen
        if (player.health <= 0){
            gameState = death;
            boss.speed = 0;
        }
    }
}

/**
 * Draw screen onto canvas
 */
function draw(){
    // play background music on loop
    if (gameState != enterScreen && !backgroundMusic.isPlaying()) backgroundMusic.play();
    clear();
    gameState();
}

let opacity = 0;
let enter = true;

/**
 * Loading enter screen with logos
 */
function enterScreen(){
    background('gray');

    // upon entry do the following
    if (enter){
        textSize(60);
        textAlign(CENTER);
        enter = false;
    }

    // fade in animation for logos and text
    push();
        fill(255, 255, 255, opacity);
        text("Welcome!", 500, 100);
        tint(255, opacity);
        image(gura, 300, 275);
        text('X', 500, 350);
        image(p5logo, 600, 250);
        text('Press anywhere to continue', 500, 550);
    pop();
    if (opacity <= 255) opacity += 2;

    // if mouse is press change screen
    if (mouse.presses()){
        gameState = intro;
        backgroundMusic.play();
        opacity = 255;
        enter = true;
        timer = round(millis()/1000);
        if (startup.isPlaying) startup.pause();
    }
}

/**
 * Intro screen
 */
function intro(){
    drawBackground();

    // upon entry do the following
    if (enter){
        playButton.show();
        shopButton.show();
        controlsButton.show();
        creditsButton.show();
        backButton.show();
        enter = false;
        gmail.show();
        linkedIn.show();
        instagram.show();
        github.show();
        discord.show();
    }

    fill('white');
    textAlign(CENTER);
    textSize(56);
    text("Monsters of the Devastation", 500, 250);

    textSize(20);
    text(socialText, 850, 600);
}

/**
 * Hide button when leave intro screen
 */
function leaveIntro(){
    enter = true;
    playButton.hide();
    controlsButton.hide();
    gmail.hide();
    linkedIn.hide();
    instagram.hide();
    github.hide();
    discord.hide();
}

/**
 * Shop screen
 */
function shop(){
    drawBackground();

    // upon entry do the following
    if (enter){
        pinkButton.show();
        owletButton.show();
        dudeButton.show();
        enter = false;
        textAlign(CENTER);
    }

    image(coinImg, 5, 10);
    text(`${coins} coins`, 64, 27);

    textSize(64);
    text("Shop", 500, 100);

    image(pinkMonster, 210, 250);
    image(owletMonster, 460, 250);
    image(dudeMonster, 710, 250);

    textSize(16);
    image(coinImg, 230, 230);
    text('free', 270, 245);
    image(coinImg, 480, 230);
    text('50', 515, 245);
    image(coinImg, 730, 230);
    text('100',  770, 245);

    // change button text if user equips or buys
    if (currentCharacter != 'Pink_Monster') pinkButton.html('Equip');
    if (owletBuy && currentCharacter != 'Owlet_Monster') owletButton.html('Equip');
    if (dudeBuy && currentCharacter != 'Dude_Monster') dudeButton.html('Equip');
}

/**
 * Hide button when leave shop
 */
function leaveShop(){
    enter = true;
    pinkButton.hide();
    owletButton.hide();
    dudeButton.hide();
}

/**
 * Controls screen
 */
function controls(){
    drawBackground();

    textAlign(CENTER)
    textSize(32);
    text("Controls", 500, 50);

    textAlign(LEFT);
    for (let i = 0; i < keysImgs.length; i++){
        image(keysImgs[i], 420, 90*(i+1));
        text(keysInfo[i], 480, 30+90*(i+1));
    }
}

/**
 * Credits screen
 */
function credits(){
    drawBackground();

    textAlign(CENTER);
    textSize(24);
    text("Game Created by Gary Huang\n \
    Characters by @Free Game Assets(GUI, Sprite, Tilesets)\n \
    Monsters by @DeepDiveGameStudio\n \
    Boss by @Elthen's Pixel Art Shop\n \
    Background by @Pixfinity\n \
    Heart by @Yrixsasow\n \
    Coin by @OZU\n \
    Buttons by @Nectanebo\n \
    Keys by @illugion\n \
    Social Media Icons by @Caz \n \
    Background music by @Top-Flow \n \
    Sounds effects by @Pixabay @Universfield\n \
    Font by @Pinisiart", 500, 175);
}


// tutorial variables
let tutorialKeys = [
    'A',
    'D',
    'W',
    'L',
    'J',
    'K',
    'B'
];
let tutorialText = [
    "Press 'A' to move Left",
    "Press 'D' to move right",
    "Press 'W' to jump",
    "Press 'L' to throw rocks",
    "Press 'J' to single punch",
    "Press 'K' to double punch",
    "Press 'B' to continue"
];
let count = 0;

/**
 * Tutorial screen
 */
function tutorial(){
    drawBackground();

    if (enter){
        fill('white');
        textSize(56);
        enter = false;
    }

    player.draw();
    player.update();

    text(tutorialText[count], 500, 100);

    // fade out animation
    if (opacity > 0){
        push();
            fill(255, opacity);
            text(`Welcome to tutorial`, 500, 250);
            opacity -= 2;
        pop();
    }

    if (kb.pressing(tutorialKeys[count])){
        if (tutorialKeys[count] == 'A'){
            player.changeAni(`${currentCharacter}run`);
            player.mirror.x = true;
            player.vel.x = -2;
        }else if (tutorialKeys[count] == 'D'){
            player.changeAni(`${currentCharacter}run`);
            player.mirror.x = false;
            player.vel.x = 2;
        }else if (tutorialKeys[count] == 'W'){
            player.changeAni(`${currentCharacter}jump`);
            player.vel.y = 15;
        }else if (tutorialKeys[count] == 'J') player.changeAni(`${currentCharacter}atk1`);
        else if (tutorialKeys[count] == 'K') player.changeAni(`${currentCharacter}atk2`);
        else if (tutorialKeys[count] == 'L'){
            player.changeAni(`${currentCharacter}throw`);
            hand.x = player.x+25;
            hand.y = player.y;
            rocks.amount++;
            rocks[rocks.amount-1].image = rocksImg[round(random(0, rocksImg.length-1))];
            rocks[rocks.amount-1].speed = 10;
        }else if (tutorialKeys[count] == 'B'){
            gameState = runGame;
            player.x = 100;
            opacity = 255;
            enter = true;
        }
        count++;
    }

    rocks.draw();
    rocks.update();
}


// shoot cooldown
let shootCd = 0;
let shot = false;
// boos move enemies' hp bar
let move, healthWidth;

function runGame(){
    drawBackground();

    // fade out animation
    if (opacity > 0){
        push();
            fill(255, opacity);
            textSize(64);
            text(`Stage ${stage}`, 500, 200);
            opacity -= 3;
        pop();
    }

    for (let i=0; i<player.health;i++) image(heartImg, 5+(15*i), 5);

    fill('white');
    textSize(16);
    image(coinImg, 5, 30);
    text(`${coins} coins`, 64, 47);

    push();
        fill('blue');
        text(`Stage: ${stage} / 3`, 54, 70);
    pop();

    // allSprites.debug = mouse.pressing();

    // spawn enemies according to the stage
    if (spawnEnemy && stage == 1){
        for (let i = 0; i < 6; i++){
            enemies.amount++;
            enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
            enemies[enemies.amount-1].scale *= 3;
            enemies[enemies.amount-1].x = 500 + (i*50);
        }
        spawnEnemy = false;
    }else if (spawnEnemy && stage == 2){
        for (let i = 0; i < 4; i++){
            //right side enemies
            enemies.amount++;
            enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
            enemies[enemies.amount-1].scale *= 3;
            enemies[enemies.amount-1].x = 1000 + (i*50);
            //left side enemies
            enemies.amount++;
            enemies[enemies.amount-1].x = -(i*50);
            enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
            enemies[enemies.amount-1].scale *= 3;
        }
        spawnEnemy = false;
    }else if (spawnEnemy && stage == 3){
        boss.y = 515;
        boss.visible = true;
        boss.collider = 'kinematic';
        spawnEnemy = false;
    }

    // enemies will go towards character
    for (let i = 0; i < enemies.length; i++){
        if (player.x < enemies[i].x){
            enemies[i].direction = 'left';
            enemies[i].mirror.x = true;
        }else{
            enemies[i].direction = 'right';
            enemies[i].mirror.x = false;
        }
        enemies[i].speed = 1;

        //display health bar if enemy is hit
        if (enemies[i].isHit){
            push();
                healthWidth = map(enemies[i].health, 0, 10, 0, 50);
                fill('red');
                rect(enemies[i].x-25, enemies[i].y-50, healthWidth, 15);
                stroke('white');
                noFill();
                rect(enemies[i].x-25, enemies[i].y-50, 50, 15);
                noStroke();  
            push();
        }
    }

    // boss move towards player
    if (stage == 3){
        // boss will face character
        if (player.x < boss.x){
            boss.direction = 'left';
            boss.mirror.x = true;
        }else{
            boss.direction = 'right';
            boss.mirror.x = false;
        }

        // change boss move on cooldown
        if (changeMoveCd % 150 == 0){
            move = bossMoves[round(random(0, bossMoves.length-1))];
            if (move.includes('atk')){
                bossAttacking = true;
                boss.speed = 1;
            }else if (move .includes('run')){
                bossAttacking = false;
                boss.speed = 2;
            }else{
                bossAttacking = false;
                boss.speed = 0;
            }
            boss.changeAni(move);
        }
        changeMoveCd += 1;

        // display boss health bar
        push();
            healthWidth = map(boss.health, 0, 400, 0, 400);
            fill('red');
            rect(300, 25, healthWidth*2, 30);
            stroke('white');
            noFill();
            rect(300, 25, 400, 30);
            noStroke();  
        push();

    }

    // handle key board input
    if (playerSensor.overlapping(floor)){
        if (kb.presses('w') || kb.presses('W')){
            player.changeAni(`${currentCharacter}jump`);
            player.vel.y = 15;
        }
    }
    
    if (kb.pressing('a') || kb.pressing('A')){
        player.changeAni(`${currentCharacter}run`);
        player.mirror.x = true;
        player.vel.x = -2;
        facing = false;
    }else if (kb.pressing('d') || kb.pressing('D')){
        player.changeAni(`${currentCharacter}run`);
        player.mirror.x = false;
        player.vel.x = 2;
        facing = true;
    }else{
        if (player.vel.y == 0) player.changeAni(`${currentCharacter}idle`);
    }

    if (facing) hand.x = player.x+25;
    else hand.x = player.x-25;
    hand.y = player.y;

    if (kb.pressing('j') || kb.pressing('J')){
        player.changeAni(`${currentCharacter}atk1`);
        isPunching = true;
        isDoublePunching = false;
    }else if (kb.pressing('k') || kb.pressing('K')){
        player.changeAni(`${currentCharacter}atk2`);
        isDoublePunching = true;
        isPunching = false;
    }else if (kb.pressing('l') || kb.pressing('L')){
        if (!shot){
            rocks.amount++;
            rocks[rocks.amount-1].image = rocksImg[round(random(0, rocksImg.length-1))];
            shot = true;
            if (facing) rocks[rocks.amount-1].speed = 10;
            else rocks[rocks.amount-1].speed = -10;
        }
        player.changeAni(`${currentCharacter}throw`);
        isPunching = false;
        isDoublePunching = false;
    }else{
        isPunching = false;
        isDoublePunching = false;
    }

    if (player.x < -20) player.x = 980;
    else if (player.x > 1020) player.x = 20;

    // change screen if conditions are met
    if (enemies.amount == 0 && stage != 3){
        gameState = stageCompletion;
        settingsButton.hide();
    }else if (boss.health <= 0){
        gameState = death;
        boss.speed = 0;
    }

    // cool downs
    if (shot) shootCd += 1;
    if (shootCd == 25){
        shot = false;
        shootCd = 0;
    }
    if (playerHitCd != 0){
        playerHitCd--;
        player.changeAni(`${currentCharacter}hurt`);
    }
    if (enemyHitCd != 0) enemyHitCd--;

    allSprites.draw();
    allSprites.update();
}

/**
 * Function or player's or boss's death
 */
function death(){
    drawBackground();

    allSprites.draw();

    for (let i=0; i<player.health;i++) image(heartImg, 5+(15*i), 5);

    image(coinImg, 5, 30);
    text(`${coins} coins`, 64, 47);

    push();
        fill('blue');
        text(`Stage: ${stage} / 3`, 54, 70);
    pop();

    //boss death
    if (boss.health <= 0){
        boss.changeAni('death');
        boss.ani.frameDelay = 10;
        boss.update();

        // show full animation before changing screen
        if (boss.ani.frame == boss.ani.lastFrame){
            gameState = win;
            boss.ani.frameDelay = 4;
            newGameButton.show();
            settingsButton.hide();
            bossDeath.play();
        }
    //player death
    }else if (player.health <= 0){
        player.changeAni(`${currentCharacter}death`);
        player.update();
        player.ani.frameDelay = 10;

        // show full animation before changing screen
        if (player.ani.frame == player.ani.lastFrame){
            gameState = gameOver;
            player.ani.frameDelay = 4;
            newGameButton.show();
            settingsButton.hide();
            playerDeath.play();
        }
    }
}

/**
 * Settings screen - display everything before settings button press and pause it
 */
function setting(){
    drawBackground();

    allSprites.draw();

    // fade out
    if (opacity > 0){
        push();
            fill(255, opacity);
            textSize(64);
            text(`Stage ${stage}`, 500, 200);
        pop();
    }

    push();
        fill('white');
        textSize(48);
        text("Settings", 495, 250);
    pop();

    for (let i=0; i<player.health;i++) image(heartImg, 5+(15*i), 5);

    fill('white');
    image(coinImg, 5, 30);
    text(`${coins} coins`, 64, 47);

    fill('blue');
    text(`Stage: ${stage} / 3`, 54, 70);

    fill(255, 100);
    noStroke();
    rect(250, 175, 500, 350);
}

/**
 * Hide buttons when leave settings
 */
function leaveSettings(){
    closeButton.hide();
    homeButton.hide();
    musicOnButton.hide();
    musicOffButton.hide();
    newGameButtonSquare.hide();
}

// powerup variables
let powerups = [
    "Doubled Coins",
    "Heal 1 Heart",
];
let foundPowerup = false;
let powerup;

/**
 * Stage competed screen
 */
function stageCompletion(){
    drawBackground();
    
    // get random power up and amount of coins once
    if (randomCoinGet){
        randomCoins = round(random(5,10))*stage*coinMultiplier;
        randomCoinGet = false;
    }
    if (!foundPowerup){
        powerup = powerups[round(random(powerups.length-1))];
        foundPowerup = true;
        collectPowerup.play();
    }

    fill('white');
    textAlign(CENTER);
    textSize(32);
    text(`You found ${randomCoins}`, 500, 320);
    text("Press 'b' to continue", 500, 380);
    text(`PowerUp: ${powerup}`, 500, 440);

    // change screen to runGame, add/change values
    if (kb.presses('b') || kb.presses('B')){
        if (powerup == "Heal 1 Heart") player.health++;
        else coinMultiplier = 2;
        coins += randomCoins;
        foundPowerup = false;
        stage++;
        randomCoinGet = true;
        spawnEnemy = true;
        opacity = 255;
        if (stage == 2) player.x = 500;
        else player.x = 100;
        player.y = 500;
        gameState = runGame; 
        settingsButton.show();
        rocks.removeAll();
    }
}

let newGame = false;

/**
 * Winner screen
 */
function win(){
    drawBackground();

    // get random amount of coins once
    if (randomCoinGet){
        randomCoins = round(random(5,10))*stage;
        randomCoinGet = false;
        completedSound.play();
    }

    fill('red');
    textAlign(CENTER);
    textSize(32);
    text('Winner!', 500, 300);
    text("Press 'b' to return to home screen", 500, 340);
    
    // change screen to intro, add/change values
    if (kb.presses('b') || kb.presses('B')){
        coins += randomCoins;
        newGame = false;
        restartGame();
        newGameButton.hide();
    }
}


/**
 * Game over screen
 */
function gameOver(){
    clear();
    drawBackground();
    allSprites.draw();

    // upon entry do the following
    if (enter){
        gameOverSound.play();
        enter = false;
    }

    fill('red');
    textAlign(CENTER);
    textSize(32);
    text('Game Over!', 500, 300);
    text("Press 'b' to continue", 500, 340);
 
    // change screen to intro, reset values
    if (kb.presses('b') || kb.presses('B')){
        newGame = false;
        restartGame();
    }
}

/**
 * Reset values - animation, multipliers, hp, positions, etc.
 */
function restartGame(){
    //reset the values
    coinMultiplier = 1;
    player.health = 5;
    player.x = 100;
    player.y = 500;
    stage = 1;
    boss.health = 200;
    boss.x = 700;
    boss.y = 150;
    boss.changeAni(bossMoves[round(random(0, bossMoves.length-1))]);
    bossAttacking = false;
    boss.collider = 'static';
    boss.visible = false;
    spawnEnemy = true;
    enemies.removeAll();
    if (!enter) enter = true;

    if (!newGame){
        gameState = intro;
        newGameButton.hide();
    }
}

/**
 * Draw background
 */
function drawBackground(){
    //background and offset to create moving effect
    image(sky, offSetX, 0);
    image(downLayer, offSetX, 0);
    image(middleLayer, offSetX, 0);
    image(topLayer, offSetX, 0);
    image(light, offSetX, 0);

    image(sky, offSetX+1000, 0);
    image(downLayer, offSetX+1000, 0);
    image(middleLayer, offSetX+1000, 0);
    image(topLayer, offSetX+1000, 0);
    image(light, offSetX+1000, 0);

    // if gameState is runGame, move background
    if (gameState == runGame){
        offSetX--;
        if(offSetX <= -1000) offSetX = 0;
    }

    // show fps every second
    if (round(millis()/1000) == timer){
        fps = getFPS();
        timer++;
    }
    push();
        fill('green');
        textAlign(CENTER);
        textSize(16);
        text(`${fps} fps`, 950, 15);
    pop();
}