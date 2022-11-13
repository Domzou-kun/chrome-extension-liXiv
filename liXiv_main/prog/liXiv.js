// special thanks Sorairo
// special thanks Sohika

LikeForm()
LikeButtonAdd()


function LikeForm(){
    // htmlの追加
    const element = document.querySelector(".extra-services");
    let new_element = document.createElement("div");
    let new_style = document.createElement("style");


    new_element.className = "like";
    new_element.innerHTML = "<div><h3>Fav for arXiv</h3></div>";

    new_style.innerHTML = `
    .like {
        clear: both;
        margin: 0;
        padding: 0 1em .5em 1em;
        font-size: 90%;
        border-top: medium solid #ddd;
        border-left: .35em solid #ddd;
    }

    button {
        width: auto;
        padding:0;
        margin:0;
        background:none;
        border:0;
        font-size:0;
        line-height:0;
        overflow:visible;
        cursor:pointer;
        position:relative;
    }
    
    #overlay{
        top:1;
        z-index: 10;
        width: 148px;
        height: 55px;
        visibility: hidden;
        opacity: 5;
        background: rgba(0,0,0,0.30);
        transition: all 0.5s ease-out;
        border-radius: 0.5rem;
        position:absolute;
        right:100px;
        line-height: 0%;
    }
    #overlay.overlay-on{
        visibility: visible;
        opacity: 1;
    }
    
    #box_wrap{  
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #message_box{
        width: 130px;
        height: 37px;
        margin-top: 3px;
        padding: 6px;
        border-radius: 0.5rem;
        background-color: #fff;
        font-size: 0.8rem; 
        text-align: center;
    }
    `;

    element.appendChild(new_element);
    document.head.appendChild(new_style);

    //const arxiv_css_tag = document.querySelector("long-dc-list");

    

}



function LikeButtonAdd(){

    // Like classの取得
    const like_element = document.querySelector(".like");
    // buttonの設置エリアの設定
    let new_element = document.createElement("a");

    new_element.setAttribute("id", "like on twitter");
    like_element.appendChild(new_element);

    
    // シェアボタン追加
    //var like_icon_url = chrome.runtime.getURL("icon/like_icon.png");  // heart
    var like_icon_url = chrome.runtime.getURL("icon/like_icon_fav.png");    // star
    var shareArea = document.getElementById('like on twitter');
    //var shareLink = '<a href="' + shareUrl + '" onclick="LikeClick()"><img src="' + like_icon_url + '" alt="like on twitter" width="17" height="17"></a>';
    var shareLink = '<button id="button"><img src="' + like_icon_url + '" alt="like on twitter" width="20" height="20"></button>';
    shareArea.innerHTML = shareLink;

    like_element.appendChild(shareArea);

    var button = document.getElementById('button');
    button.onclick = ClickLike;
    
}



function ClickLike(){
    const like_element = document.querySelector(".like");
    let new_element = document.createElement("div");
    new_element.setAttribute("id", "overlay");
    new_element.innerHTML = '<div id="box_wrap"><div id="message_box"><p>ファボしました</p><p id="message_txt"></p></div';

    like_element.appendChild(new_element)

    var msg = "test"
    const overlay = document.getElementById("overlay");
    const messageTxt = document.getElementById("message_txt");
    
    // 現在のページのURLの取得
    var arXiv_link = location.href;
    // タイトルの取得
    var arXiv_title = document.title;

    // シェアボタンのリンク先
    var shareUrl  = 'https://twitter.com/intent/tweet';
    let text_msg = arXiv_title+' にいいねしました \n#arXiv #liXiv より'
    shareUrl += '?url='+encodeURIComponent(arXiv_link);
    shareUrl += '&text='+encodeURIComponent(text_msg);
    
    // シェアボタン追加
    var share_icon_url = chrome.runtime.getURL("icon/tweet_icon.png");
    var shareArea = document.getElementById('message_txt');
    var shareLink = '<a href="' + shareUrl + '" onClick="window.open(this.href, \'tweetwindow\', \'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1\'); return false;"><img src="' + share_icon_url + '" alt="like on twitter" width="52" height="14"></a>';
    shareArea.innerHTML = shareLink;

    // ファボの記録
    chrome.storage.local.get(null, function(items) {
        var allKeys = Object.keys(items);
        //console.log(allKeys.length);
        console.log(allKeys);
        var keys_length = allKeys.length;

        const date1 = new Date();
        const date2 = String(date1.getFullYear())+String((date1.getMonth()+1)).padStart(2, '0')+String(date1.getDate()).padStart(2, '0')+
            String(date1.getHours())+String(date1.getMinutes());
        var value_dict = {
            url: arXiv_link,
            memo_text: "Press the document button to add a memo",
            fav_time: date2
        };

        console.log(keys_length);
        if(keys_length < 300){
            //localStorage.setItem(arXiv_title, arXiv_link);
            chrome.storage.local.set({[arXiv_title] : value_dict}, function (){});
            console.log("saved ok");
        }else{
            alert('これ以上登録できないよ！')
        }

    });
    //chrome.storage.local.set(arXiv_title, arXiv_link);
    
    //localStorage.setItem("testKey", "testVal");
    // 確認用
    //console.log(localStorage.getItem(arXiv_title));


    /*
    // html making
    var out_html = "<a href=" + arXiv_link + " id=\"arXiv link\">" + arXiv_title + "</a>";
    console.log(out_html);

    // append
    const ar_link_elements = document.querySelector("#like_link");
    let link_element = document.createElement("div");
    link_element.innerHTML = out_html;
    ar_link_elements.appendChild(like_element);
    */

    // 5秒間表示
    overlay.classList.toggle('overlay-on');
    //messageTxt.textContent = msg + "がクリックされました";
    setTimeout(function() {
        overlay.classList.toggle('overlay-on');
    }, 5000);


}




