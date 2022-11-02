var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function () {
    // 初期設定メソッド呼び出し
    this.config();
    
    // 背景色の設定
    this.cameras.main.setBackgroundColor('#99CCFF');
    
    // 背景のタイル画像の表示    
    this.createBackground();
    
    // プレイヤーの作成
    this.createPlayer();
    
    // UI作成
    this.createUI();
    
    // プレイヤーの攻撃グループ作成
    this.createShootGroup();
    
    // 敵グループの作成
    this.createEnemyGroup();
    
    // アイテムグループの作成
    this.createItemGroup();
    
    // プレイヤー用のパーティクル作成
    this.createParticle();
};

mainScene.update = function() {
    // タイル画像をY方向に移動
    this.background.tilePositionY -= 1;
    
    // ゲームオーバーならupdateメソッドを実行しない
    if(this.isGameOver) {
        return;
    }

    // プレイヤーの移動処理
    this.movePlayer();
};

mainScene.config = function () {
   // プレイヤーの速度
    this.speed = 200;
    // スコア
    this.score = 0;
    // ショット発射可能数
    this.bullets = 10;
    // 敵タイプの配列
    this.enemyType = ["enemyTank01", "enemyTank02", "enemyTank03", "enemyTank04", "enemyTank05"];
    // ゲームオーバーフラグ
    this.isGameOver = false;
};

mainScene.createBackground = function() {
     // 背景のタイルスプライトを設定
    this.background = this.add.tileSprite(0,0, 800, 600, 'map');
    this.background.setOrigin(0, 0);
    // 背景画像の高さは1600なので、画面の高さの600を減算した値が初期位置
    this.background.tilePositionY = 1000;
};

mainScene.createPlayer = function() {
    // プレイヤーの作成
    this.player = this.physics.add.sprite(400, 550, 'player');
    // プレイヤーのサイズ変更
    this.player.setDisplaySize(50,50);
    // プレイヤー画像を上下反転
    this.player.setFlipY(true);
    // プレイヤーがゲーム空間の領域と衝突
    this.player.setCollideWorldBounds(true);
    // プレイヤーのライフの初期設定
    this.player.life = 2;
    
    // キーを放したときに、プレイヤーの移動停止
    this.input.keyboard.on('keyup', function(event) {
        this.player.setVelocity(0,0);
    }, this);
    
    // スペースキーでビーム発射
    this.input.keyboard.on('keydown-SPACE', function(event) {
        this.createShoot();
    }, this);
};

mainScene.movePlayer = function() {
    // プレイヤーの移動処理
    var cursors = this.input.keyboard.createCursorKeys();
    if(cursors.right.isDown) {
        // 右に移動
        this.player.setVelocityX(this.speed);
    }
    if(cursors.left.isDown) {
        // 左に移動
        this.player.setVelocityX(-this.speed);
    }
    if(cursors.up.isDown) {
        // 上に移動
        this.player.setVelocityY(-this.speed);
    }
    if(cursors.down.isDown) {
        // 下に移動
        this.player.setVelocityY(this.speed);
    }
};

mainScene.createUI = function() {
    // UIの作成
    // スコアテキストの表示
    this.scoreText = this.add.text(650, 50, "Score:" + this.score,{
        font : "30px Open Sans",
        fill : "#ff0000",
    });
    
    // ライフテキストの表示
    this.lifeText = this.add.text(50, 50, "Life:" + this.player.life,{
        font : "30px Open Sans",
        fill : "#ff0000",
    });
    
    // ショット発射可能数の表示
    this.bulletsText = this.add.text(300, 50, "Bullets:" + this.bullets, {
        font : "30px Open Sans",
        fill : "#ff0000",
    });
};

mainScene.gameOver = function() {
    // ゲームオーバー画像表示
    this.gameover = this.add.image(400, 300, 'gameover');
    this.gameover.setDisplaySize(500,500);
    // 何かのキーをクリックするとスタートシーンを開始
    this.input.keyboard.on('keydown', function(event) {
        this.scene.start("startScene");
    },this);
};

mainScene.createShootGroup = function() {
    // プレイヤーの攻撃グループ
    this.shootGroup = this.physics.add.group();
};

mainScene.createShoot = function() {
    // プレイヤーの攻撃処理作成
    // this.bulletsが0になると発射できない
    // プレイヤーの位置から発射
    if(this.bullets <= 0) {
        return;
    }
    this.bullets--;
    this.bulletsText.setText("Bullets:" + this.bullets);
    
    var x = this.player.x;
    var y = this.player.y;
    
    var shot = this.shootGroup.create(x, y, 'shot');
    shot.setDisplaySize(30, 70);
    shot.setVelocityY(-500);
};

mainScene.createEnemyGroup = function() {
    // 敵のグループ作成
    this.enemyGroup = this.physics.add.group();
    
    // 敵の衝突処理設定
    this.physics.add.overlap(this.player, this.enemyGroup, this.hitEnemy, null, this);
    this.physics.add.overlap(this.shootGroup, this.enemyGroup, this.hitShoot, null, this);
    
    this.enemyTimer = this.time.addEvent({
        delay: 1000,
        callback: this.createEnemy,
        loop: true,
        callbackScope: this,
    });
};

mainScene.createEnemy = function() {
    // 敵作成
    // X座標は100から700のランダムな座標
    // Y座標は0で固定位置
    // 下方向のみにに加速
    var x = Phaser.Math.RND.between(100, 700);
    var y = 0;
    
    var enemyImage = Phaser.Math.RND.pick(this.enemyType);
    var enemy = this.enemyGroup.create(x, y, enemyImage);
    
    enemy.setDisplaySize(60, 60);
    enemy.setVelocityY(150);
    
    this.createEnemyParticle(enemy);
};

mainScene.createItemGroup = function() {
    // アイテムグループ作成
    this.itemGroup = this.physics.add.group();
    
    this.physics.add.overlap(this.player, this.itemGroup, this.hitItem, null, this);
    
    this.itemTimer = this.time.addEvent({
        delay: 4000,
        callback: this.createItem,
        loop: true,
        callbackScope : this,
    });
};

mainScene.createItem = function() {
    // アイテム作成
    // X座標は100から700のランダムな座標
    // Y座標は0で固定位置
    // 下方向のみにに加速
    
    var x = Phaser.Math.RND.between(100, 700);
    var y = 0;
    
    var item = this.itemGroup.create(x, y, 'item');
    item.setDisplaySize(50, 50);
    item.setVelocityY(100);
};

mainScene.hitEnemy = function(player, enemy) {
    // プレイヤーと敵が衝突したときの処理
    // this.player.lifeが減少する
    // this.player.lifeが0になるとゲームオーバー
    if( this.isGameOver ) {
        return;
    }
    enemy.destroy();
    this.player.life--;
    this.lifeText.setText('Life:' + this.player.life);
    
    if(this.player.life <= 0) {
        this.isGameOver = true;
        this.emitter.start();
        this.player.setVisible(false);
        this.gameOver();
    }
};

mainScene.hitShoot = function(shot, enemy) {
    // プレイヤーの攻撃と敵が衝突したときの処理
    // スコアに5加算
    shot.destroy();
    enemy.emitter.start();
    enemy.destroy();
    this.score += 5;
    this.scoreText.setText('Score:' + this.score);
};

mainScene.hitItem = function(player, item) {
    // プレイヤーとアイテムが衝突したときの処理
    // this.bulletsに5加算
    item.destroy();
    this.bullets += 5;
    this.bulletsText.setText("Bullets:" + this.bullets);
};

mainScene.createParticle = function() {
    // プレイヤーの爆発パーティクル作成
    var particles = this.add.particles('explosion1');
    this.emitter = particles.createEmitter({
        speed: 200,
        maxParticles: 20,
        blendMode: 'ADD',
        follow: this.player,
    });
    // 最初はパーティクルは停止
    this.emitter.stop();
};

mainScene.createEnemyParticle = function(enemy) {
    // 敵の爆発パーティクル作成
    var particles = this.add.particles('explosion2');
    enemy.emitter = particles.createEmitter({
        speed: 200,
        maxParticles: 5,
        blendMode: 'ADD',
        follow: enemy,
    });
    // 最初はパーティクルは停止
    enemy.emitter.stop();
};
