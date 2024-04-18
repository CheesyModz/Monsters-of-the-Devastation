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
 * Author: Gary Huang
 * Date: Mar 19, 2024
 */

// fps stats
let fps;
let timer = 1;

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
let gameState = intro;

// home screen menu buttons
let playButton, shopButton, controlsButton, creditsButton;

let newGameButton;

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
    "Move character to the left",
    "Move character to the right",
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
    'eyesNarrow',
    'eyesClosed',
    'atk1',
    'atk2',
    'atk3'
];
let changeMoveCd = 0;
let tempBossSpeed;

let stage = 1;

// coins
let coins = 0;
let coinMultiplier = 1;
let randomCoins;
let randomCoinGet = true;

function preload(){
    rocksImg = [
        loadImage("assets/Pink_Monster/Rock1.png"),
        loadImage("assets/Pink_Monster/Rock2.png")
    ];

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
    heartImg = loadImage('assets/heart.png');
    coinImg = loadImage('assets/coin_spin.gif');

    light = loadImage('assets/ParallaxBackground/Light.png');
    sky = loadImage('assets/ParallaxBackground/Sky.png');
    downLayer = loadImage('assets/ParallaxBackground/DownLayer.png');
    middleLayer = loadImage('assets/ParallaxBackground/MiddleLayer.png');
    topLayer = loadImage('assets/ParallaxBackground/TopLayer.png');

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
}

function setup(){
    new Canvas(1000, 700);
    world.gravity.y = 5;

    player = new Sprite(100, 500, 32, 32);
    player.scale *= 2;
    player.health = 5;

    for (character of characters){
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

    playerSensor = new Sprite(player.x, player.y+5, 50, 60, 'none');
    playerSensor.visible = false;

    new GlueJoint(player, playerSensor);

    rocks = new Group();
    rocks.x = () => hand.x;
    rocks.y = () => hand.y;
    rocks.speed = 10;
    rocks.life = 100;

    hand = new Sprite();
    hand.diameter = 1;
    hand.collider = 'None';
    hand.visible = false;

    floor = new Sprite(500, 565, 1300, 10, 'static');
	floor.color = color(255, 0, 0, 0);
	floor.stroke = color(255, 0, 0, 0);

    enemies = new Group();
    enemies.y = 540;
    enemies.health = () => round(random(10));
    enemies.isBoss = false;

    enemies.collides(rocks, enemyHit);
    enemies.collides(player, playerHit);

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
        eyesNarrow: { row:7, frameSize: [96, 95], frames: 3 },
        eyesClosed: { row:8, frameSize: [96, 95], frames: 3 },
        death: { row:9, frameSize: [96, 95.5], frames: 6 },
        idle: { row:0, frameSize: [96, 84], frames: 5 },
    });
    boss.visible = false;

    boss.collides(rocks, enemyHit);
    boss.collides(player, playerHit);

    allSprites.autoDraw = false;
    allSprites.autoUpdate = false;

    //intro
    playButton = createImg('assets/Menu Buttons/Large Buttons/Large Buttons/Play Button.png')
        .size(120, 50)
        .position(440, 310)
        .mousePressed(() => {
            gameState = runGame;
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
        .mousePressed(() => {
            if (gameState == intro) leaveIntro();
            gameState = shop;
        })
    controlsButton = createImg('assets/Menu Buttons/Large Buttons/Large Buttons/Controls Button.png')
        .size(120, 50)
        .position(440, 370)
        .mousePressed(() => {
            leaveIntro();
            gameState = controls;
        });
    creditsButton = createImg('assets/Menu Buttons/Square Buttons/Square Buttons/Info Square Button.png')
        .size(50, 50)
        .position(820, 20)
        .mousePressed(() => {
            if (gameState == intro) leaveIntro();
            else if (gameState == shop) leaveShop();
            gameState = credits;
        })

    //shop
    pinkButton = createButton('Equipped')
        .hide()
        .position(215, 370)
        .mousePressed(() => {
        if (currentCharacter != 'Pink_Monster'){
            currentCharacter = 'Pink_Monster';
            pinkButton.html('Equipped');
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
        }else if (owletBuy){
            owletButton.html('Equipped');
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
        }else if (dudeBuy){
            dudeButton.html('Equipped');
            currentCharacter = 'Dude_Monster';
        }
    });

    backButton = createImg('assets/Menu Buttons/Square Buttons/Square Buttons/Home Square Button.png')
        .size(50, 50)
        .position(930, 20)
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

    //settings buttons
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

        });

    musicOffButton = createImg('assets/Prinbles/Black-Icon/Music-Off.png')
        .size(100, 100)
        .position(515, 300)
        .hide()
        .mousePressed(() => {

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

    //resize images
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
}

function enemyHit(enemy, rock){
    rock.remove();
    enemy.health--;

    if (enemy.health <= 0 && !enemy.isBoss) enemy.remove();
}

let playerHitCd = 0;
let enemyHitCd = 0;

function playerHit(enemy, player){
    if (isPunching && enemyHitCd == 0){
        enemy.health -= 2;
        enemyHitCd = 10;
    }else if (isDoublePunching && enemyHitCd == 0){
        enemy.health -= 3;
        enemyHitCd = 10;
    }

    if (!bossAttacking && enemy.isBoss) return;

    if (playerHitCd == 0){
        player.health--;
        playerHitCd = 30;
        if (player.health <= 0){
            gameState = death;
            boss.speed = 0;
        }
    }
}

function draw(){
    clear();
    gameState();
}

let enter = true;

function intro(){
    drawBackground();

    if (enter){
        playButton.show();
        shopButton.show();
        controlsButton.show();
        creditsButton.show();
        backButton.show();
        enter = false;
    }

    fill('white');
    textAlign(CENTER);
    textSize(48);
    text("Monsters of the Devastation", 500, 250);
}

function leaveIntro(){
    enter = true;
    playButton.hide();
    controlsButton.hide();
}

function shop(){
    drawBackground();

    if (enter){
        pinkButton.show();
        owletButton.show();
        dudeButton.show();
        enter = false;
    }

    image(coinImg, 5, 10);
    text(`${coins} coins`, 60, 27);

    textSize(32);
    text("Shop", 500, 30);

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

    if (currentCharacter != 'Pink_Monster') pinkButton.html('Equip');
    if (owletBuy && currentCharacter != 'Owlet_Monster') owletButton.html('Equip');
    if (dudeBuy && currentCharacter != 'Dude_Monster') dudeButton.html('Equip');
}

function leaveShop(){
    enter = true;
    pinkButton.hide();
    owletButton.hide();
    dudeButton.hide();
}

function controls(){
    drawBackground();

    textAlign(CENTER)
    textSize(32);
    text("Controls", 500, 50);

    textAlign(LEFT);
    for (let i = 0; i < keysImgs.length; i++){
        image(keysImgs[i], 300, 90*(i+1));
        text(keysInfo[i], 360, 30+90*(i+1));
    }
}

function credits(){
    drawBackground();

    textAlign(CENTER);
    textSize(24);
    text("Author: Gary Huang\n \
    Characters by @Free Game Assets(GUI, Sprite, Tilesets)\nhttps://free-game-assets.itch.io/free-tiny-hero-sprites-pixel-art\n \
    Monsters by @DeepDiveGameStudio\nhttps://deepdivegamestudio.itch.io/demon-sprite-pack\n \
    Boss by @Elthen's Pixel Art Shop\nhttps://elthen.itch.io/2d-pixel-art-minotaur-sprites\n \
    Background by @Pixfinity\nhttps://pixfinity.itch.io/the-dungeon-pack\n \
    Heart by @Yrixsasow\nhttps://yrixsasow.itch.io/heart-icon-2\n \
    Coin by @OZU\nhttps://osmanfrat.itch.io/coin\n \
    Buttons by @Nectanebo\nhttps://nectanebo.itch.io/menu-buttons\n \
    Keys by @illugion\nhttps://illugion.itch.io/pixel-keyboard-lite", 500, 125);
}

let opacity = 255;
let shootCd = 0;
let shot = false;
let move;

function runGame(){
    drawBackground();

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
    text(`${coins} coins`, 55, 47);

    push();
        fill('blue');
        text(`Stage: ${stage} / 3`, 45, 70);
    pop();

    // allSprites.debug = mouse.pressing();

    if (spawnEnemy && stage == 1){
        for (let i = 0; i < 4; i++){
            enemies.amount++;
            enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
            enemies[enemies.amount-1].scale *= 3;
            enemies[enemies.amount-1].x = 500 + (i*50);
        }
        spawnEnemy = false;
    }else if (spawnEnemy && stage == 2){
        for (let i = 0; i < 4; i++){
            enemies.amount++;
            enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
            enemies[enemies.amount-1].scale *= 3;
            enemies[enemies.amount-1].x = 1000 + (i*50);
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
            enemies[i].move('left', 2);
            enemies[i].mirror.x = true;
        }else{
            enemies[i].move('right', 2);
            enemies[i].mirror.x = false;
        }
    }

    // boss move towards player
    if (stage == 3){
        // boss will face character
        if (player.x < boss.x) boss.mirror.x = true;
        else boss.mirror.x = false;

        if (player.x < boss.x){
            boss.direction = 'left';
            boss.mirror.x = true;
        }else{
            boss.direction = 'right';
            boss.mirror.x = false;
        }

        // change boss move on cd
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
    }

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

    if (shot) shootCd += 1;
    if (shootCd == 25){
        shot = false;
        shootCd = 0;
    }

    if (player.x < -20) player.x = 980;
    else if (player.x > 1020) player.x = 20;

    if (enemies.amount == 0 && stage != 3){
        gameState = stageCompletion;
        settingsButton.hide();
    }else if (boss.health <= 0){
        gameState = death;
        boss.speed = 0;
    }
    if (playerHitCd != 0){
        playerHitCd--;
        player.changeAni(`${currentCharacter}hurt`);
    }

    if (enemyHitCd != 0) enemyHitCd--;

    allSprites.draw();
    allSprites.update();
}

function death(){
    drawBackground();

    allSprites.draw();

    for (let i=0; i<player.health;i++) image(heartImg, 5+(15*i), 5);

    image(coinImg, 5, 30);
    text(`${coins} coins`, 55, 47);

    push();
        fill('blue');
        text(`Stage: ${stage} / 3`, 45, 70);
    pop();

    if (boss.health <= 0){
        boss.changeAni('death');
        boss.ani.frameDelay = 10;
        boss.update();

        if (boss.ani.frame == boss.ani.lastFrame){
            gameState = win;
            boss.ani.frameDelay = 4;
            newGameButton.show();
            settingsButton.hide();
        }
    }else if (player.health <= 0){
        player.changeAni(`${currentCharacter}death`);
        player.update();
        player.ani.frameDelay = 10;

        if (player.ani.frame == player.ani.lastFrame){
            gameState = gameOver;
            player.ani.frameDelay = 4;
            newGameButton.show();
            settingsButton.hide();
        }
    }
}

function setting(){
    drawBackground();

    allSprites.draw();

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
    text(`${coins} coins`, 55, 47);

    fill('blue');
    text(`Stage: ${stage} / 3`, 45, 70);

    fill(255, 100);
    noStroke();
    rect(250, 175, 500, 350);
}

function leaveSettings(){
    closeButton.hide();
    homeButton.hide();
    musicOnButton.hide();
    musicOffButton.hide();
    newGameButtonSquare.hide();
}

let powerups = [
    "Doubled Coins",
    "Heal 1 Heart",
];
let foundPowerup = false;
let powerup;

function stageCompletion(){
    drawBackground();
    
    if (randomCoinGet){
        randomCoins = round(random(5,10))*stage*coinMultiplier;
        randomCoinGet = false;
    }

    if (!foundPowerup){
        powerup = powerups[round(random(powerups.length-1))];
        foundPowerup = true;
    }
    fill('white');
    textAlign(CENTER);
    textSize(32);
    text(`You found ${randomCoins}`, 500, 320);
    text("Press 'b' to continue", 500, 380);
    text(`PowerUp: ${powerup}`, 500, 440);

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

function win(){
    drawBackground();

    if (randomCoinGet){
        randomCoins = round(random(5,10))*stage;
        randomCoinGet = false;
    }

    fill('red');
    textAlign(CENTER);
    textSize(32);
    text('Winner!', 500, 300);
    text("Press 'b' to return to home screen", 500, 340);
    
    if (kb.presses('b') || kb.presses('B')){
        coins += randomCoins;
        restartGame();
        newGameButton.hide();
    }
}

function gameOver(){
    clear();
    drawBackground();
    allSprites.draw();

    fill('red');
    textAlign(CENTER);
    textSize(32);
    text('Game Over!', 500, 300);
    text("Press 'b' to continue", 500, 340);
 
    if (kb.presses('b') || kb.presses('B')) restartGame();
}

function restartGame(){
    coinMultiplier = 1;
    player.health = 5;
    player.x = 100;
    player.y = 500;
    stage = 1;
    boss.health = 200;
    boss.x = 700;
    boss.y = 150;
    bossAttacking = false;
    boss.collider = 'static';
    boss.visible = false;
    spawnEnemy = true;
    enemies.removeAll();

    if (!newGame) gameState = intro;
}

function drawBackground(){
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

    if (gameState == runGame){
        offSetX--;
        if(offSetX <= -1000) offSetX = 0;
    }
    if (round(millis()/1000) == timer){
        fps = getFPS();
        timer++;
    }

    push();
        fill('green');
        textSize(16);
        text(`${fps} fps`, 950, 15);
    pop();
}