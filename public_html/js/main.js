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
    
    
    // 敵グループの作成
    
    
    // アイテムグループの作成
    
    
    // プレイヤー用のパーティクル作成
    
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
    
    
    
};

mainScene.createShoot = function() {
    // プレイヤーの攻撃処理作成
    // this.bulletsが0になると発射できない
    // プレイヤーの位置から発射
    
    
    
};

mainScene.createEnemyGroup = function() {
    // 敵のグループ作成
    
    
    
};

mainScene.createEnemy = function() {
    // 敵作成
    // X座標は100から700のランダムな座標
    // Y座標は0で固定位置
    // 下方向のみにに加速
    
    
    
};

mainScene.createItemGroup = function() {
    // アイテムグループ作成
    
    
    
};

mainScene.createItem = function() {
    // アイテム作成
    // X座標は100から700のランダムな座標
    // Y座標は0で固定位置
    // 下方向のみにに加速
    
    
    
};

mainScene.hitEnemy = function(player, enemy) {
    // プレイヤーと敵が衝突したときの処理
    // this.player.lifeが減少する
    // this.player.lifeが0になるとゲームオーバー
    
    
    
};

mainScene.hitShoot = function(shot, enemy) {
    // プレイヤーの攻撃と敵が衝突したときの処理
    // スコアに5加算
    
    
    
};

mainScene.hitItem = function(player, item) {
    // プレイヤーとアイテムが衝突したときの処理
    // this.bulletsに5加算
    
    
    
};

mainScene.createParticle = function() {
    // プレイヤーの爆発パーティクル作成
    
    
    
};

mainScene.createEnemyParticle = function(enemy) {
    // 敵の爆発パーティクル作成
    
    
    
};
