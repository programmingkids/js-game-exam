// 画像読込のシーン
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function() {
    // スタート画像
    this.load.image('gamestart', 'assets/images/gamestart.gif');
    // ゲームオーバー画像
    this.load.image('gameover', 'assets/images/gameover.png');
    // マップ画像
    this.load.image('map', 'assets/images/map.png');
    // プレイヤー画像
    this.load.image('player', 'assets/images/playerTank.png');
    // 敵画像
    this.load.image('enemyTank01', 'assets/images/enemyTank01.png');
    this.load.image('enemyTank02', 'assets/images/enemyTank02.png');
    this.load.image('enemyTank03', 'assets/images/enemyTank03.png');
    this.load.image('enemyTank04', 'assets/images/enemyTank04.png');
    this.load.image('enemyTank05', 'assets/images/enemyTank05.png');
    // 攻撃画像
    this.load.image('shot', 'assets/images/shot.png');
    // アイテム画像
    this.load.image('item', 'assets/images/item.png');
    // 爆発画像
    this.load.image('explosion1', 'assets/images/explosion1.png');
    this.load.image('explosion2', 'assets/images/explosion2.png');
    this.load.image('explosion3', 'assets/images/explosion3.png');
    this.load.image('explosion4', 'assets/images/explosion4.png');
};

loadScene.create = function() {
    // 読み込み完了後にstartSceneを起動
    this.scene.start("startScene");
};
