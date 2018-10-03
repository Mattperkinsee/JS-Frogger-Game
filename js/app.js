var score = 0;
document.getElementById('level').append(score);
// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
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

            //collisions with player, remove hearts, reset player pos
            if (this.x < player.x + player.width && this.x + this.width > player.x &&
                this.y < player.y + player.height && this.y + this.height > player.y) {

                player.x = 200;
                player.y = 410;

                if (document.getElementById('life3').className == 'visible') {
                    document.getElementById('life3').classList.remove('visible');
                    document.getElementById('life3').classList.add('hidden');
                } else if (document.getElementById('life2').className == 'visible') {
                    document.getElementById('life2').classList.remove('visible');
                    document.getElementById('life2').classList.add('hidden');
                } else {
                    resetGame();
                }

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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 67;
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {
        //check if across roads. update score. reset player pos
        if (this.y <= 0) {
            this.y = 410;
            this.x = 200;
            score += 1;
            document.getElementById('level').innerHTML = "SCORE: " + score;

            // document.getElementById('level').addClass('animatedbounce');

        }
    }
    handleInput(key) {
        if (key === "up") {
            this.y -= 83;
        }
        if (key === "down" && this.y < 400) {
            this.y += 83;
        }
        if (key === "left" && this.x > 0) {
            this.x -= 100;
        }
        if (key === "right" && this.x < 400) {
            this.x += 100;
        }
    }
    changeSprite(charName) {
        this.sprite = "images/" + charName + ".png";
        console.log(this.sprite);
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy = new Enemy(0, 220, 50);
var enemy2 = new Enemy(0, 140, 20);
var enemy3 = new Enemy(0, 60, 10);
var allEnemies = [];
allEnemies.push(enemy);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// Place the player object in a variable called player
var player = new Player(200, 410);

function resetGame() {
    console.log("reset game");
    score = 0;
    document.getElementById('level').innerHTML = "SCORE: " + score;
    document.getElementById('life3').classList.add('visible');
    document.getElementById('life3').classList.remove('hidden');
    document.getElementById('life2').classList.add('visible');
    document.getElementById('life2').classList.remove('hidden');
}

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
//Handle character selection
//var characters = document.getElementsByClassName("characters");
//for (let i = 0; i < characters.length; i++) {
//    //  characters[i].addEventListener('click',chooseChar);
//}

function chooseChar(img) {
    let charName = img.id;
    charName.toString();
    player.changeSprite(charName);
    // Get the modal
    var modal = document.getElementById('myModal');
    modal.style.display = "none";

}