
// save button
var save_icon_url = chrome.runtime.getURL("icon/save_icon.png")
var main_body = document.getElementsByTagName("h2");
var save_button = document.createElement("button")
save_button.setAttribute("type", "submit");
save_button.setAttribute("name", "save_btn");
save_button.setAttribute("id", "output_csv");
save_button.innerHTML = "<img src="+ save_icon_url +" alt='save_csv' width='35' height='35'>";
main_body[0].append(save_button);




// get all storage data
chrome.storage.local.get(null, function(items) {
    var inner_htmls = "";
    var allKeys = Object.keys(items);
    var allValues = Object.values(items);
    var keys_length = allKeys.length;

    //console.log(keys_length);
    
    // 中身が0じゃない場合
    if(keys_length != 0){
        
        for(var i=0; i<keys_length; i++){
            var remove_icon_url = chrome.runtime.getURL("icon/remove_icon.png");
            var memo_icon_url = chrome.runtime.getURL("icon/memo_icon.png");
            var arXiv_title = allKeys[i];
            var arXiv_obj = allValues[i];
            var arXiv_link = arXiv_obj["url"];
            var arXiv_memo = arXiv_obj["memo_text"];
            console.log(arXiv_memo);

            var paper_id = "aX_" + i;
            var memo_id = "memo_" + i;
            var memo_box_id = "memo_box_" + i;
            var hidden_hashtag_id = "hidden_tag_" + i;
            var hidden_span_id = "hidden_span_" + i;
            var hidden_button_id = "hidden_button_" + i;
            // html making
            /*
            var out_html = "<p><a href=" + arXiv_link + " id=" + paper_id + ">" + arXiv_title + "</a>\
            <button type='submit' name='delete_btn' value=" + i +"><img src=" + remove_icon_url + " alt='like remove' width='18' height='18'></button>\
            <p style='position: relative'>test</p>\
            <span id="+ hidden_span_id + " style='display:inline-block; margin-top:4px; visibility: hidden; z-index: 5; position: absolute; top: auto; right: auto'>\
            <input type='text' name='tag_form' id="+ hidden_hashtag_id +" size='50' value='tags'>\
            <button type='submit' name='input_checker_btn' id="+ hidden_button_id +" value="+ i +">check</button></span>\
            <button type='submit' name='tags_btn' id=" + hashtag_id +" value="+ i +"><img src=" + hashtag_icon_url + " alt='add hashtag' width='17' height='17'></button></p>";
            */
            var out_html = "<p><a href=" + arXiv_link + " id=" + paper_id + ">" + arXiv_title + "</a>\
            <button type='submit' name='delete_btn' value=" + i +"><img src=" + remove_icon_url + " alt='like remove' width='18' height='18'></button>\
            <button type='submit' name='memo_btn' id=" + memo_id +" value="+ i +"><img src=" + memo_icon_url + " alt='add memo' width='19' height='19'></button></p>\
            <p style='height: auto; font-size: 11px; color: #696969' id="+ memo_box_id +">"+ arXiv_memo + "</p>";
            inner_htmls += out_html;
        }
        // append
        const elements = document.querySelector("div");
        let new_element = document.createElement("div");
        new_element.innerHTML = inner_htmls;
        elements.appendChild(new_element);


        // hidden style
        //document.getElementById(hidden_span_id).style.display == "none";

    }else{
        // append
        const elements = document.querySelector("div");
        let new_element = document.createElement("div");
        new_element.innerHTML = '<p><a href="">not data</a></p>';
        elements.appendChild(new_element);
    }
});
