var w, h, s = 20;
var snake = [], foods = [];
var keyCode = 0;
var point = 0;
var timer = NaN;
var ctx;

// pointオブジェクト
function Point(x, y) {
    this.x = x;
    this.y = y;
}

// 初期化関数
function init() {
    var canvas = document.getElementById("field");

    w = canvas.width / s;
    h = canvas.height / s;
    ctx = canvas.getContext("2d");
    ctx.font = "20px sans-serif";

    // ヘビの初期化
    snake.push(new Point(w/2, h/2));

    // 餌の初期化
    for (var i=0; i<10; i++) {
        addFood();
    }

    timer = setInterval(tick, 200);
    window.onkeydown = keydown;

    // 餌の追加
    function addFood() {
        while (true) {
            var x = Math.floor(Math.random() * w);
            var y = Math.floor(Math.random() * h);

            if (isHit(foods, x, y) || isHit(snake, x, y)) {
                continue;
            }

            foods.push(new Point(x, y));
            break;
        }
    }

    // 衝突判定
    function isHit(data, x, y) {
        var len = data.length;
        for (var i=0; i<len; i++) {
            if (data[i].x == x && data[i].y == y) {
                return true;
            }
        }
        return false;
    }

    function moveFood(x, y) {
        foods = foods.filter(function (p) {
            return (p.x != x || p.y != y);
        });
        addFood();
    }

    function tick() {
        var x = snake[0].x;
        var y = snake[0].y;

        switch (keyCode) {
            case 37: x--; break; // 左
            case 38: y--; break; // 上
            case 39: x++; break; // 右
            case 40: y++; break; // 下
            default: paint(); return;
        }

        // 自分あるいは壁に衝突？
        if (isHit(snake, x, y) || x < 0 || x >= w || y < 0 || y >= h) {
            clearInterval(timer);
            paint();
            return;
        }

        // 頭を先頭に追加
        snake.unshift(new Point(x, y));
        if (isHit(foods, x, y)) {
            point += 10; // 餌を食べた
            moveFood(x, y);
        } else {
            snake.pop(); // 食べてない -> しっぽを削除
        }
        paint();
    }

    function paint() {
        ctx.clearRect(0, 0, w*s, h*s);
        ctx.fillStyle = "rgb(256, 0, 0)";
        ctx.fillText(point, s, s*2);
        ctx.fillStyle = "rgb(0, 0, 256)";

        foods.forEach(function (p) {
            ctx.fillText("+", p.x * s, (p.y + 1) * s);
        });
        snake.forEach(function (p) {
            ctx.fillText("*", p.x * s, (p.y + 1) * s);
        });
    }
    function keydown(event) {
        keyCode = event.keyCode;
    }
}