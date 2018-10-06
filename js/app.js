var score = 0;
const bounce = ["animated", "rubberBand"];
const tada = ["animated", "tada"];
const flash = ["animated", "flash"];
var lives = 3;
var allEnemies = [];
document.getElementById('level').append(score);

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



            if (lives <= 0) {
                resetGame();
            }
            //collisions with player, remove hearts, reset player pos
            if (this.x < player.x + player.width && this.x + this.width > player.x &&
                this.y < player.y + player.height && this.y + this.height > player.y) {
                player.x = 200;
                player.y = 410;
                lives--;


                let life3 = document.getElementById('life3');
                let life2 = document.getElementById('life2');
                let life1 = document.getElementById('life1');

                if (life3.className == 'visible') {
                    life3.classList.add(...bounce);
                    setTimeout(delay, 400)

                    function delay() {
                        life3.classList.remove(...bounce);
                        life3.classList.remove('visible');
                        life3.classList.add('hidden');
                    }


                } else if (life2.className == 'visible') {
                    life2.classList.add(...bounce);
                    setTimeout(delay, 400)

                    function delay() {
                        life2.classList.remove(...bounce);
                        life2.classList.remove('visible');
                        life2.classList.add('hidden');

                    }



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
            score += 10;
            document.getElementById('level').innerHTML = score;
            //score animation
            document.getElementById('level').classList.add(...tada);
            setTimeout(delay, 1000)

            function delay() {
                document.getElementById('level').classList.remove(...tada);
            }

            enemy.speed += 5;
            enemy2.speed += 15;
            enemy3.speed += 35;

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
// Place the player object in a variable called player
var player = new Player(200, 410);
// Place all enemy objects in an array called allEnemies
var enemy = new Enemy(0, 220, 50);
var enemy2 = new Enemy(0, 140, 20);
var enemy3 = new Enemy(0, 60, 10);



//Resets game
function resetGame() {
    console.log("reset game");
    alert('Game Over! Your score: ' + score);
    score = 0;
    lives = 3;
    let modal = document.getElementById('myModal');
    modal.classList.remove('hidden');
    modal.classList.add('visible');
    document.getElementById('level').innerHTML = score;
    document.getElementById('life3').classList.add('visible');
    document.getElementById('life3').classList.remove('hidden');
    document.getElementById('life2').classList.add('visible');
    document.getElementById('life2').classList.remove('hidden');
    
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//Prevent arrows scrolling screen
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
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
function chooseChar(img) {
    let charName = img.id;
    charName.toString();
    player.changeSprite(charName);
    // Get the modal
    let modal = document.getElementById('myModal');
    modal.classList.add('hidden');
    //Add init enemies to array
    enemy.x =0;
    enemy2.x=0;
    enemy3.x=0;
    enemy.speed = 50;
    enemy2.speed = 20;
    enemy3.speed = 10;
    allEnemies.push(enemy);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
    //Start random stars
    star.displayStar();
}
//Controls random star collectibles
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 67;
        this.sprite = 'images/Star.png';
    }
    update(dt) {
        //collisions with player
        if (this.x < player.x + player.width && this.x + this.width > player.x &&
            this.y < player.y + player.height && this.y + this.height > player.y - 2) {
            score += 50;
            document.getElementById('level').innerHTML = score;
            this.x = -100;
            //score animation
            document.getElementById('level').classList.add(...tada);
            setTimeout(delay, 1000)

            function delay() {
                document.getElementById('level').classList.remove(...tada);
            }
            //increase enemy speed
            enemy.speed += 5;
            enemy2.speed += 5;
            enemy3.speed += 15;
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    displayStar() {
        let maxTime = 3500;
        let minTime = 3500;
        var myVar = setInterval(myTimer, Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime)

        function myTimer() {
            var offsetX = 2;
            var offsetY;
            let maxX = 5;
            let minX = 0;
            let maxY = 3;
            let minY = 1;
            let randomX = Math.floor(Math.random() * Math.floor(maxX));
            randomX = randomX * 100 + offsetX;
            let randomY = Math.floor(Math.random() * Math.floor(maxY));
            console.log(randomY);
            //offsets gem on top row 
            if (randomY === 0) {
                offsetY = -50;
            } else {
                offsetY = -70;
            }
            randomY = randomY * 100 + 100 + offsetY;
            console.log(randomX + ',' + randomY);


            star.x = randomX;
            star.y = randomY;

        }
    }


}
//instantiate first star object offscreen
var star = new Star(-100, 0);