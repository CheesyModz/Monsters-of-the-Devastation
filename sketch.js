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

// sprite objects
let player, hand, rocks, floor, box;

let currentCharacter = 'Pink_Monster';
let characters = ['Pink_Monster', 'Owlet_Monster', 'Dude_Monster'];

// sprite enemy objects
let rascals, abomination, imp, blackguard, demom, eye, gouger, gremlin, scamp, balor, demonspawn, demonling, stalker, scoundrel;
let enemiesAni = [];

// image objects
let rock1Img, rock2Img;
let rocksImg = [];
let boss, bossImg, coinImg, heartImg, pinkMonster, owletMonster, dudeMonster;

// background
let light, sky, downLayer, middleLayer, topLayer;
let offSetX = 0;

// game state
let gameState = intro;

// home screen menu buttons
let playButton, shopButton, controlsButton, creditsButton;

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
// let enemyHealthWidth;
let spawnEnemy = true;
let amountOfEnemies = 10;
let bossAttacking = false;
let bossMoves = [];

let stage = 1;

// coins
let coins = 0;
let randomCoins;
let randomCoinGet = true;

function preload(){
    rock1Img = loadImage("assets/Pink_Monster/Rock1.png");
    rock2Img = loadImage("assets/Pink_Monster/Rock2.png");
    rocksImg = [rock1Img, rock2Img];

    rascals = loadAnimation('assets/Basic Demon/antlered rascal/AntleredRascal.png', { frameSize: [16, 16], frames: 4 });
    abomination = loadAnimation('assets/Basic Demon/clawed abomination/ClawedAbomination.png', { frameSize: [16, 16], frames: 4 });
    imp = loadAnimation('assets/Basic Demon/crimson imp/CrimsonImp.png', { frameSize: [16, 16], frames: 4 });
    blackguard = loadAnimation('assets/Basic Demon/depraved blackguard/DepravedBlackguard.png', { frameSize: [16, 16], frames: 4 });
    demom = loadAnimation('assets/Basic Demon/fledgling demon/FledglingDemon.png', { frameSize: [16, 16], frames: 4 });
    eye = loadAnimation('assets/Basic Demon/floating eye/FloatingEye.png', { frameSize: [16, 16], frames: 4 });
    gouger = loadAnimation('assets/Basic Demon/foul gouger/FoulGouger.png', { frameSize: [16, 16], frames: 4 });
    gremlin = loadAnimation('assets/Basic Demon/grinning gremlin/GrinningGremlin.png', { frameSize: [16, 16], frames: 4 });
    scamp = loadAnimation('assets/Basic Demon/nefarious scamp/NefariousScamp.png', { frameSize: [16, 16], frames: 4 });
    balor = loadAnimation('assets/Basic Demon/pit balor/PitBalor.png', { frameSize: [16, 16], frames: 4 });
    demonspawn = loadAnimation('assets/Basic Demon/pointed demonspawn/PointedDemonspawn.png', { frameSize: [16, 16], frames: 4 });
    demonling = loadAnimation('assets/Basic Demon/rascally demonling/RascallyDemonling.png', { frameSize: [16, 16], frames: 4 });
    stalker = loadAnimation('assets/Basic Demon/tainted scoundrel/TaintedScoundrel.png', { frameSize: [16, 16], frames: 4 });
    scoundrel = loadAnimation('assets/Basic Demon/warp skull/WarpSkull.png', { frameSize: [16, 16], frames: 4 });
    enemiesAni = [rascals, abomination, imp, blackguard, demom, eye, gouger, gremlin, scamp, balor, demonspawn, demonling, stalker, scoundrel];

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

    keysImgs.push(loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_w.png'));
    keysImgs.push(loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_a.png'));
    keysImgs.push(loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_d.png'));
    keysImgs.push(loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_j.png'));
    keysImgs.push(loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_k.png'));
    keysImgs.push(loadImage('assets/Pixel Keyboard Lite/PNG Sprites/1 Bit/pkl_lite_keys_0_one_letter_l.png'));
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

    playerSensor = new Sprite();
    playerSensor.x = player.x;
    playerSensor.y = player.y + 5;
    playerSensor.w = 50;
    playerSensor.h = 60;
    playerSensor.collider = 'none';
    playerSensor.visible = false;

    new GlueJoint(player, playerSensor);

    rocks = new Group();
    rocks.x = () => hand.x;
    rocks.y = () => hand.y;
    rocks.speed = 10;
    rocks.life = 200;

    hand = new Sprite();
    hand.diameter = 1;
    hand.collider = 'None';

    floor = new Sprite(500, 565, 1000, 10, 'static');
	floor.color = color(255, 0, 0, 0);
	floor.stroke = color(255, 0, 0, 0);

    enemies = new Group();
    enemies.y = 540;
    enemies.health = () => round(random(2));

    enemies.collides(rocks, enemyHit);
    enemies.collides(player, playerHit);

    boss = new Sprite(1100, 500, 54, 42);
    boss.spriteSheet = bossImg;
    boss.scale *= 2;
    boss.health = 1;
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

    boss.collides(rocks, enemyHit);

    allSprites.autoDraw = false;
    allSprites.autoUpdate = false;

    //intro
    playButton = createImg('assets/Menu Buttons/Large Buttons/Large Buttons/Play Button.png');
    playButton.size(120, 50);
    playButton.position(430, 310);
    
    shopButton = createImg('assets/Prinbles/Black-Icon/Cart.png');
    shopButton.size(50, 50);
    shopButton.position(875, 20);

    controlsButton = createImg('assets/Menu Buttons/Large Buttons/Large Buttons/Controls Button.png');
    controlsButton.size(120, 50);
    controlsButton.position(430, 370);

    creditsButton = createImg('assets/Menu Buttons/Square Buttons/Square Buttons/Info Square Button.png');
    creditsButton.size(50, 50);
    creditsButton.position(820, 20);

    //shop
    pinkButton = createButton('Equipped');
    owletButton = createButton('Buy');
    dudeButton = createButton('Buy');

    backButton = createImg('assets/Menu Buttons/Square Buttons/Square Buttons/Home Square Button.png');
    backButton.size(50, 50);
    backButton.position(930, 20);
}

function enemyHit(enemy, rock){
    rock.remove();
    enemy.health--;
    enemy.hit = true;

    if (enemy.health <= 0) enemy.remove();
}

function playerHit(enemy, player){
    player.health--;
    if (player.health <= 0) gameState = gameOver;
}

function draw(){
    clear();
    gameState();
}

function intro(){
    drawBackground();

    fill('white');
    textSize(48);
    text("Monsters of the Devastation", 500, 250);

    playButton.mousePressed(() => {
        gameState = runGame;
        playButton.hide();
        shopButton.hide();
        controlsButton.hide();
        creditsButton.hide();
        backButton.hide();
        player.ani = `${currentCharacter}idle`;
    });

    controlsButton.mousePressed(() => {
        gameState = controls;
        playButton.hide();
        controlsButton.hide();
    });

}

function shop(){
    drawBackground();

    fill('white');
    image(coinImg, 5, 10);
    coinImg.resize(20,20);
    text(`${coins} coins`, 60, 27);

    textSize(32);
    text("Shop", 500, 30);

    image(pinkMonster, 210, 250);
    image(owletMonster, 460, 250);
    image(dudeMonster, 710, 250);

    pinkMonster.resize(100, 100);
    owletMonster.resize(100, 100);
    dudeMonster.resize(100, 100);

    textSize(16);
    image(coinImg, 230, 230);
    text('free', 270, 245);
    image(coinImg, 480, 230);
    text('50', 515, 245);
    image(coinImg, 730, 230);
    text('100',  770, 245);

    if (currentCharacter != 'Pink_Monster') pinkButton.html('Equip');
    pinkButton.position(215, 370);
    pinkButton.mousePressed(() => {
        if (currentCharacter != 'Pink_Monster'){
            currentCharacter = 'Pink_Monster';
            pinkButton.html('Equipped');
        }
    });

    if (owletBuy && currentCharacter != 'Owlet_Monster') owletButton.html('Equip');
    owletButton.position(485, 370);
    owletButton.mousePressed(() => {
        if (coins >= 50 && !owletBuy && currentCharacter != 'Owlet_Monster'){
            coins -= 50;
            owletBuy = true;
            currentCharacter = 'Owlet_Monster';
            owletButton.html('Equipped')
        }else if (owletBuy){
            owletButton.html('Equipped')
            currentCharacter = 'Owlet_Monster';
        }
    });

    if (dudeBuy && currentCharacter != 'Dude_Monster') dudeButton.html('Equip');
    dudeButton.position(745, 370);
    dudeButton.mousePressed(() => {
        if (coins >= 100 && !dudeBuy && currentCharacter != 'Dude_Monster'){
            coins -= 100;
            dudeBuy = true;
            currentCharacter = 'Dude_Monster';
            dudeButton.html('Equipped')
        }else if (dudeBuy){
            dudeButton.html('Equipped')
            currentCharacter = 'Dude_Monster';
        }
    });
}

function controls(){
    drawBackground();

    fill('white');
    textSize(32);
    text("Controls", 500, 50);

    textSize(32);
    textAlign(LEFT);
    for (let i = 0; i < keysImgs.length; i++){
        keysImgs[i].resize(50, 50);
        image(keysImgs[i], 300, 90*(i+1));
        text(keysInfo[i], 360, 30+90*(i+1));
    }

}

function credits(){
    drawBackground();

    fill('white');

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

function runGame(){
    drawBackground();

    for (let i=0; i<player.health;i++){
        image(heartImg, 5+(15*i), 5);
        heartImg.resize(25,25);
    }

    push();
        fill(255, opacity);
        textSize(64);
        text(`Stage ${stage}`, 500, 200);
        if (opacity > 0) opacity -= 3;
    pop();

    fill('white');
    image(coinImg, 5, 30);
    coinImg.resize(20,20);
    text(`${coins} coins`, 55, 47);

    fill('blue');
    text(`Stage: ${stage} / 3`, 45, 70);

    player.debug = mouse.pressing();
    rocks.debug = mouse.pressing();
    enemies.debug = mouse.pressing();
    boss.debug = mouse.pressing();

    if (stage != 3 && spawnEnemy){
        for (let i = 0; i < stage*5; i++){
            enemies.amount++;
            enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
            enemies[enemies.amount-1].scale *= 3;
            enemies[enemies.amount-1].x = 500 + (i*50);
        }
        spawnEnemy = false;
    }else if (stage == 3 && spawnEnemy){

        spawnEnemy = false;
    }

    // boss will face character
    if (player.x < boss.x) boss.mirror.x = true;
    else boss.mirror.x = false;

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

    if (kb.pressing('j') || kb.pressing('J')){
        player.changeAni(`${currentCharacter}atk1`);
    }else if (kb.pressing('k') || kb.pressing('K')){
        player.changeAni(`${currentCharacter}atk2`);
    }else if (kb.pressing('l') || kb.pressing('L')){
        if (!shot){
            rocks.amount++;
            rocks[rocks.amount-1].image = rocksImg[round(random(0, rocksImg.length-1))];
            shot = true;
        }
        player.changeAni(`${currentCharacter}throw`);
    }

    if (shot) shootCd += 1;
    if (shootCd == 25){
        shot = false;
        shootCd = 0;
    }

    if (kb.presses('e') || kb.presses('E')){
        enemies.amount++;
        enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
        enemies[enemies.amount-1].scale *= 3;
    }

    if (facing) hand.x = player.x+35;
    else hand.x = player.x-35;
    hand.y = player.y;

    // player cannot go pass screen size
    if (player.x < 20) player.x = 20;
    else if (player.x > 980) player.x = 980;

    if (boss.collides(player) && bossAttacking){
        player.changeAni(`${currentCharacter}hurt`);
        player.health--;
        if (player.health <= 0){
            player.changeAni(`${currentCharacter}death`);
            gameState = gameOver;
        }
    }

    if (enemies.amount == 0){
        gameState = stageCompletion;
    }

    allSprites.draw();
    allSprites.update();
}

function stageCompletion(){
    drawBackground();

    if (randomCoinGet){
        randomCoins = round(random(5,10))*stage;
        randomCoinGet = false;
    }
    fill('white');
    textAlign(CENTER);
    textSize(32);
    text(`You found ${randomCoins}`, 460, 320);
    text("Press 'b' to continue", 460, 380);
    text("Power-ups found", 470, 440);

    if (kb.presses('b') || kb.presses('B')){
        coins += randomCoins;
        stage++;
        randomCoinGet = true;
        spawnEnemy = true;
        opacity = 255;
        if (stage != 3) gameState = runGame; 
        else{
            gameState = intro;
            playButton.show();
            shopButton.show();
            controlsButton.show();
            creditsButton.show();
            backButton.show();
        }
    }
}

function gameOver(){
    clear();
    drawBackground();
    allSprites.draw();

    fill('red');
    textAlign(CENTER);
    textSize(32);
    text('Game Over!', 485, 340);
    text("Press 'b' to continue", 490, 380);
    
    if (kb.presses('b') || kb.presses('B')){
        gameState = intro;
        player.health = 5;
        player.x = 100;
        player.y = 400;
        stage = 1;
        boss.health = 100;
        boss.x = 500;
        boss.y = 400;
        playButton.show();
        shopButton.show();
        controlsButton.show();
        creditsButton.show();
        backButton.show();
    }
}

function drawBackground(){
    image(sky, offSetX, 0);
    image(downLayer, offSetX, 0);
    image(middleLayer, offSetX, 0);
    image(topLayer, offSetX, 0);
    image(light, offSetX, 0);

    image(sky, offSetX+windowWidth, 0);
    image(downLayer, offSetX+windowWidth, 0);
    image(middleLayer, offSetX+windowWidth, 0);
    image(topLayer, offSetX+windowWidth, 0);
    image(light, offSetX+windowWidth, 0);

    sky.resize(windowWidth, windowHeight);
    downLayer.resize(windowWidth, windowHeight);
    middleLayer.resize(windowWidth, windowHeight);
    topLayer.resize(windowWidth, windowHeight);
    light.resize(windowWidth, windowHeight);

    if (gameState == runGame){
        offSetX--;
        if(offSetX <= -windowWidth) offSetX = 0;
    }

    if (round(millis()/1000) == timer){
        fps = getFPS();
        timer++;
    }

    fill('green');
    textAlign(CENTER);
    textSize(16);
    text(`${fps} fps`, 950, 15);

    if (gameState != runGame){
        creditsButton.mousePressed(() => {
            if (gameState == shop){
                pinkButton.hide();
                owletButton.hide();
                dudeButton.hide();
            }else if (gameState == intro){
                playButton.hide();
                controlsButton.hide();
            }
            gameState = credits;
        });
    
        shopButton.mousePressed(() => {
            if (gameState == intro){
                playButton.hide();
                controlsButton.hide();
            }
            gameState = shop;
            pinkButton.show();
            owletButton.show();
            dudeButton.show();
        });
    
        backButton.mousePressed(() => {
            if (gameState == shop){
                pinkButton.hide();
                owletButton.hide();
                dudeButton.hide();
            }
            playButton.show();
            shopButton.show();
            controlsButton.show();
            creditsButton.show();
            gameState = intro;
        });
    }
}