var w = 20, h = 20, bomb = 50, cell = [], opened = 0;

function init() {
    // id=mainの要素への参照を取得
    var main = document.getElementById("main");

    // テーブルの生成
    for (var i = 0; i < h; i++) {
        cell[i] = [];
        var tr = document.createElement("tr");
        for (var j = 0; j < w; j++) {
            var td = document.createElement("td");
            td.addEventListener("click", click);// ハンドラー登録
            td.className = "cell";// class属性を指定
            td.y = i;// どこがクリックされたかを判定するためにプロパティを追加
            td.x = j;// どこがクリックされたかを判定するためにプロパティを追加 
            cell[i][j] = td;
            tr.appendChild(td);
        }
        main.appendChild(tr);
    }

    // 爆弾を配置
    for (var i = 0; i < bomb; i++) {
        while (true) {
            var x = Math.floor(Math.random() * w);
            var y = Math.floor(Math.random() * h);

            // 同じ場所に再配置しないようにエスケープ
            if (!cell[x][y].bomb) {
                cell[x][y].bomb = true;
                // cell[x][y].textContent = "*";
                break;
            }
        }
    }
}

// 座標の周囲にいくつの爆弾が有るかを返す
function count(x, y) {
    var b = 0;
    for (var j = y-1; j <= y+1; j++) {
        for (var i = x-1; i <= x+1; i++) {
            // マスの外を参照した時、爆弾を数えないようにする
            if (cell[j] && cell[j][i]) {
                if (cell[j][i].bomb) b++;
            }
        }
    }
    return b;
}

// マスを開く処理を行う
function open(x, y) {
    for (var j = y-1; j <= y+1; j++) {
        for (var i = x-1; i <= x+1; i++) {
            if (cell[j] && cell[j][i]) {
                var c = cell[j][i];
                if (c.opened || c.bomb) {
                    continue;
                }
                flip(c);
                var n = count(i, j);
                if (n == 0) {
                    open(i, j);
                } else {
                    c.textContent = n;
                }
            }
        }
    }
}

// 実際にマス目を開く処理
function flip(cell) {
    cell.className = "cell open";
    cell.opened = true;
    // すべての空マスを開いたとき
    if (++opened >= (w * h - bomb)) {
        document.getElementById("title").textContent = "Good Job!!";
    }
}

function click(e) {
    var src = e.currentTarget;
    if (src.bomb) {
        cell.forEach(function(tr) {
            tr.forEach(function (td) {
                if (td.bomb) {
                    td.textContext = "+";
                }
            })
        });
        document.getElementById("title").textContent = "Game Over";
    } else {
        open(src.x, src.y);
    }
}














