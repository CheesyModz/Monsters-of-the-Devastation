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
 * Author: Gary Huang
 * Date: Mar 19, 2024
 */

// fps stats
let fps;
let timer = 1;

// character variables
// facing: direction false for left, true for right
let facing = true;
let isWalking = false;

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
let gameState = shop;

// home screen menu buttons
let playButton, shopButton, controlsButton, creditsButton;
//shop buttons
let pinkButton, owletButton, dudeButton;

// enemy variables
// let enemyHealthWidth;
let spawnEnemy = true;
let amountOfEnemies = 10;
let bossAttacking = true;
let bossMoves = [];

let stage = 1;

// coins
let coins = 300;
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
}

function setup(){
    new Canvas(1000, 700);
    world.gravity.y = 5;

    player = new Sprite(100, 500, 32, 32);
    // player.anis.frameDelay = 30;
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
    player.ani = `${currentCharacter}idle`;

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
    enemies.x = 700;
    enemies.y = 540;
    enemies.health = () => round(random(2));
    // enemies.hit = false;

    enemies.collides(rocks, enemyHit);
    enemies.collides(player, playerHit);

    boss = new Sprite(500, 500, 54, 42);
    boss.spriteSheet = bossImg;
    // boss.anis.frameDelay = 30;
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

    //shop
    pinkButton = createButton('Equipped');
    owletButton = createButton('Buy');
    dudeButton = createButton('Buy');
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

    playButton = createButton('Play');
    playButton.position(windowWidth/2-30, windowHeight/2-30);
    playButton.mousePressed(() => {
        gameState = runGame;
    });

    shopButton = createButton('Shop');
    shopButton.position(windowWidth/2-42, windowHeight/2);
    shopButton.mousePressed(() => {
        gameState = shop;
    });

    controlsButton = createButton('Controls');
    controlsButton.position(windowWidth/2-42, windowHeight/2+30);
    controlsButton.mousePressed(() => {
        gameState = controls;
    });

    creditsButton = createButton('Credits');
    creditsButton.position(windowWidth/2-35, windowHeight/2+60);
    creditsButton.mousePressed(() => {
        gameState = credits;
    });

    // remove buttons
    // playButton.remove();
    // controlsButton.remove();
    // creditsButton.remove();
    // shopButton.remove();
}

// let pinkBuy = true;
let owletBuy = false;
let dudeBuy = false;

function shop(){
    drawBackground();

    fill('white');
    image(coinImg, 5, 10);
    coinImg.resize(20,20);
    text(`${coins} coins`, 55, 27);

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
    text('100', 520, 245);
    image(coinImg, 730, 230);
    text('200',  770, 245);

    if (currentCharacter != 'Pink_Monster') pinkButton.html('Equip');
    pinkButton.position(215, 370);
    pinkButton.mousePressed(() => {
        if (currentCharacter != 'Pink_Monster'){
            currentCharacter = 'Pink_Monster';
            pinkButton.html('Equipped');
        }
    });

    text(`${currentCharacter} ${owletBuy}`, 100, 100);

    if (owletBuy && currentCharacter != 'Owlet_Monster') owletButton.html('Equip');
    owletButton.position(485, 370);
    owletButton.mousePressed(() => {
        if (coins >= 100 && !owletBuy && currentCharacter != 'Owlet_Monster'){
            coins -= 100;
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
        if (coins >= 200 && !dudeBuy && currentCharacter != 'Dude_Monster'){
            coins -= 200;
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
    Coin by @OZU\nhttps://osmanfrat.itch.io/coin", 500, 125);
}

function runGame(){
    drawBackground();

    for (let i=0; i<player.health;i++){
        image(heartImg, 5+(15*i), 5);
        heartImg.resize(25,25);
    }

    fill('white');
    image(coinImg, 5, 30);
    coinImg.resize(20,20);
    text(`${coins} coins`, 55, 47);

    fill('blue');
    text(`Stage: ${stage} / 5`, 45, 70);

    player.debug = mouse.pressing();
    rocks.debug = mouse.pressing();
    enemies.debug = mouse.pressing();
    boss.debug = mouse.pressing();

    if (stage != 5 && spawnEnemy){
        for (let i = 0; i < stage*10; i++){
            enemies.amount++;
            enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
            enemies[enemies.amount-1].scale *= 3;
        }
        spawnEnemy = false;
    }

    // boss will face character
    if (player.x < boss.x)boss.mirror.x = true;
    else boss.mirror.x = false;

    // enemies will go towards character
    for (let i = 0; i < enemies.length; i++){
        if (player.x < enemies[i].x){
            enemies[i].speed -= 3;
            enemies[i].mirror.x = true;
        }else{
            enemies[i].speed += 3;
            enemies[i].mirror.x = false;
        }
    }

    if (kb.pressing('a') || kb.pressing('A')){
        player.changeAni(`${currentCharacter}run`);
        player.mirror.x = true;
        player.vel.x = -2;
        isWalking = true;
        facing = false;
    }else if (kb.pressing('d') || kb.pressing('D')){
        player.changeAni(`${currentCharacter}run`);
        player.mirror.x = false;
        player.vel.x = 2;
        isWalking = true;
        facing = true;
    }
    if (kb.presses('w') || kb.presses('W')){
        player.changeAni(`${currentCharacter}jump`);
        player.vel.y = 20;
    }else if (kb.presses('j') || kb.presses('J')){
        player.changeAni(`${currentCharacter}atk1`);
    }else if (kb.presses('k') || kb.presses('K')){
        player.changeAni(`${currentCharacter}atk2`);
    }else if (kb.presses('l') || kb.presses('L')){
        player.changeAni(`${currentCharacter}throw`);
        rocks.amount++;
        rocks[rocks.amount-1].image = rocksImg[round(random(0, rocksImg.length-1))];
    }else if (kb.presses('esc')){
        
    }

    if (kb.presses('e') || kb.presses('E')){
        enemies.amount++;
        enemies[enemies.amount-1].ani = enemiesAni[round(random(0, enemiesAni.length-1))];
        enemies[enemies.amount-1].scale *= 3;
    }

    // loop through each enemy, if they are hit display health bar on top
    // for (let i = 0; i < enemies.length; i++){
    //     if (enemies.hit){
    //         // enemy healthBar  
    //         enemyHealthWidth = map(enemy.health, 0, 10, 0, 200);
    //         fill('green');
    //         rect(20, 20, enemyHealthWidth, 20);
    //         stroke('white');
    //         noFill();
    //         rect(20, 20, enemies., 20);
    //         noStroke();  
    //     }
    // }

    if (facing) hand.x = player.x+35;
    else hand.x = player.x-35;
    hand.y = player.y;

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
    text(`You found ${randomCoins}`, windowWidth/2-40, windowHeight/2-30);
    text("Press 'b' to continue", windowWidth/2-40, windowHeight/2+30);
    text("Power-ups found", windowWidth/2-30, windowHeight/2+90);


    if (kb.presses('b')){
        coins += randomCoins;
        stage++;
        gameState = runGame; 
        randomCoinGet = true;
        spawnEnemy = true;
    }
}

function gameOver(){
    clear();
    drawBackground();
    allSprites.draw();

    fill('red');
    textAlign(CENTER);
    textSize(32);
    text('Game Over!', windowWidth/2-15, windowHeight/2-10);
    text("Press 'b' to continue", windowWidth/2-10, windowHeight/2+30);
    
    if (kb.presses('b')){
        gameState = intro;
        player.health = 5;
        player.x = 100;
        player.y = 400;
        stage = 1;
        boss.health = 100;
        boss.x = 500;
        boss.y = 400;
        box.x = 700;
        box.y = 400;
    }
}

function keyReleased(){
    if (isWalking){
        player.changeAni(`${currentCharacter}idle`);
        isWalking = false;
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
    text(`${fps} fps`, windowWidth-35, 15);
}