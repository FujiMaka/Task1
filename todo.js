$(document).ready(function() {
    
     /** 登録ボタンクリック */
     $('#registration').click(function() {
         var time = new Date().getTime();
         var data = new Object();
         var now = new Date();
         new Date( JSON.parse( JSON.stringify(now) ) );
         var deadlinetime = getdeadline();
         var diff = getDateDiff(deadlinetime, now);
         
         var todo = $('#todo');
         var year = $('#year');
         var month = $('#month');
         var day = $('#day');
         
         data.todo = $('#todo').val();
         data.year = $('#year').val();
         data.month = $('#month').val();
         data.day = $('#day').val();
         data.deadline = "あと" + diff.days + "日";

         var str = JSON.stringify(data);                         //文字列として保存
         
         //ローカルストレージ
         localStorage.setItem(time, str);
         alert("追加しました。");
         loadStorage();
         
         //テキストボックスを空にする
         todo.val("");
         year.val("");
         month.val("");
         day.val(""); 
     });
    
    /** 全リストを削除のボタンクリック */
    $('#clear').click(function() {
        localStorage.clear();
        alert("全てのデータを消去しました。");
        loadStorage();
    });

    /** ローカルストレージデータ読み込み */
    function loadStorage() {
        $("#list tbody").empty();
        var rec = "";
        for (var i=0; i<localStorage.length; i++) {
            var key = localStorage.key(localStorage.length-i-1);   //keyを取得
            var value = localStorage.getItem(key);                //keyからJSON文字列を取得
            if (!value) {
                continue;
            }
            try {
                var data = JSON.parse(value);                       //JSONオブジェクトに変換
            } catch (event) {
                continue; 
            }
            var date = new Date();
            date.setTime(key);
            rec += "<tr id='" + key + "'><td>" + "・" + data.todo + "</td>";
            rec += "<td>" + data.year + "年" + data.month + "月" + data.day + "日" + "</td>";
            rec += "<td>" + data.deadline + "</td>";
            rec += "<td><button class='completion' href='#'>完了/削除</button></td>";
            rec += "</tr>";
             
            var value = JSON.parse( JSON.stringify(data.todo));           //data.todoを取得
           
        }
        $("#list tbody").append(rec);
        $('.completion').bind('click', completion_clickHandler);
    }
    
    /** 削除処理 */
    function completion_clickHandler(event) {
        var target = $(event.target).parents('tr').attr('id');
        localStorage.removeItem(target);
        alert('対象のリストを削除しました。');
        loadStorage(); 
    }
    //登録済みデータ読み込み
    loadStorage();
});

function getdeadline () {
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
  var day = document.getElementById("day").value;
  return new Date(year, month - 1, day);
}

function getDateDiff(previous, latest) {
  var diff = previous.getTime() - latest.getTime();
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -=  days * (1000 * 60 * 60 * 24);
  var hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  var mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);
  var seconds = Math.floor(diff / (1000));
  diff -= seconds * (1000);
  return {days:days, hours:hours, mins:mins, seconds:seconds};
}
