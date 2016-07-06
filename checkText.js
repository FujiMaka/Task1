$(loaded);

function loaded() {
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#registration").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
        saveText();
        showText();         
                                            //returnがtrueのときのみtodo.jsを呼んでtableに表示させたい
    });
}

// 入力された内容をローカルストレージに保存する
function saveText() {
  var val = escapeText($("#todo").val());
    console.log("a " +val);
     var time = new Date();
    if(checkText(val)) {
        localStorage.setItem(time, escape(val));
    }
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list")
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    value += value;
  }
}

function escapeText(text) {
  return $("<div>").text(text).html();
}

// 入力チェックを行う
function checkText(text) {
  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
      console.log("入力した文字 " +text);
      console.log("比較する値 " +value);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }
  // すべてのチェックを通過できれば可
  return true;
}
