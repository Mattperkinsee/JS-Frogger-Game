function init() {

}

function start() {

}

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.height = 83;
        this.width = 70;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    //Enemy.prototype.update = function(dt) 
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.speed;
        if (this.x > 500) {
            this.x = -100;
        }
    }
    // Draw the enemy on the screen, required method for game
    //Enemy.prototype.render = function() 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y) {
        this.x = 200;
        this.y = 300;
        this.height = 30;
        this.width = 67;
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {

    }
    render() {

    }
}
//var Player = function(){
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy = new Enemy();
var allEnemies = [];
allEnemies.push(enemy);
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});