
document.addEventListener("DOMContentLoaded", function(){
    // button click
    var all_button = document.getElementsByTagName('button');

    for(var i=0; i<all_button.length; i++){
        all_button[i].addEventListener('click', {button_val: all_button[i], handleEvent: btn_action});
    }
});



function btn_action(e){

    console.log('clicked');
    
    // select button action
    var btn_name = this.button_val.name;
    var btn_val = this.button_val.value;
    
    // if delete
    if(btn_name=="delete_btn"){
        // button value
        var btn_val = this.button_val.value;

        // remove html
        var target_name = "aX_" + btn_val;
        var target_elem = document.getElementById(target_name);
        console.log(target_elem);
        target_elem.remove();   // 削除
        console.log("remove ok");
        
        // remove storage
        var rm_key = target_elem.textContent;
        chrome.storage.local.remove([rm_key], function() {});
        console.log("remove storage ok");

        // reload
        location.reload();
    
    }else if(btn_name=="memo_btn"){     // 入力フォームの表示と非表示の切り替え
        var new_memo_text = prompt('Please Enter memo', 'You can enter up to 140 characters.');

        if(new_memo_text==''){
            return -2; // 入力無し
        }else if(new_memo_text.length >= 141){
            alert("You can enter up to 140 characters.");
            return -3;
        }

        var change_text_id = "memo_box_" + btn_val;
        var btn_peper_id = "aX_" + btn_val;
        var arXiv_title = document.getElementById(btn_peper_id).textContent;
        var arXiv_url = document.getElementById(btn_peper_id).href;
        
        var value_dict = {
            url: arXiv_url,
            memo_text: new_memo_text
        };
        
        chrome.storage.local.set({[arXiv_title] : value_dict}, function (){});
        console.log("new_saved ok");

        // reload
        location.reload();
        
        
        //document.getElementById(change_text_id).innerText = memo_text;
        //console.log("change memo");

        
        /*
        var hidden_span_id = "hidden_span_" + btn_val;
        console.log(hidden_span_id);
        let element_st = document.getElementById(hidden_span_id);
        let set_style = getComputedStyle(element_st);
        
        if(set_style.getPropertyValue('visibility') == 'hidden'){
            element_st.style.visibility = 'visible';
        }else if(set_style.getPropertyValue('visibility') == 'visible'){
            element_st.style.visibility = 'hidden'
        }
        */
    }else if(btn_name=="save_btn"){        // 入力内容のチェック
        // local storageの取得
        chrome.storage.local.get(null, function(items) {
            var allKeys = Object.keys(items);
            var allValues = Object.values(items);
            var keys_length = allKeys.length;

            //console.log(keys_length);
            
            // 中身が0じゃない場合
            if(keys_length != 0){
                // 2d array
                var csv_data_ary = [["title", "url", "memo", "fav_time"]];
                for(var i=0; i<keys_length; i++){
                    var arXiv_obj = allValues[i];

                    var arXiv_title = allKeys[i];               // title
                    var arXiv_link = arXiv_obj["url"];          // url
                    var arXiv_memo = arXiv_obj["memo_text"];    // memo
                    var arXiv_fav_time = arXiv_obj["fav_time"]; // time
                    
                    var ins_ary = [arXiv_title, arXiv_link, arXiv_memo, arXiv_fav_time];
                    csv_data_ary.push(ins_ary);
                }
                // csvの作成
                let csv_string ="";
                for (let d of csv_data_ary) {
                    csv_string += d.join(",");
                    csv_string += '\r\n';
                }
                const date1 = new Date();
                const date2 = String(date1.getFullYear())+String((date1.getMonth()+1)).padStart(2, '0')+String(date1.getDate()).padStart(2, '0')+
                    String(date1.getHours())+String(date1.getMinutes());
                var dl_csv_name = "arXiv_fav_list_"+ date2 +".csv";
                let blob = new Blob([csv_string], {type: "text/csv"});
                let dl_url = URL.createObjectURL(blob);

                console.log(dl_url);
                console.log(csv_string);

                var dl_link = document.createElement("a");
                dl_link.download = dl_csv_name;
                dl_link.href = dl_url;
                dl_link.click();

                console.log("save pk csv");

            }else{  // 0件の場合
                alert("No arXie recode...");
                return 0;
            }
        });
    }
}


