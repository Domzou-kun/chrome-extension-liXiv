
document.addEventListener("DOMContentLoaded", function(){
    //a タグの全聚徳
    var tag_elem = document.getElementsByTagName("a");
    
    for(var i=0; i<tag_elem.length; i++){
        tag_elem[i].addEventListener('click', function (event){
            
            let target_link = event.target.getAttribute('href');
            console.log(target_link);

            
            chrome.tabs.create({url: target_link});
            
        });
    }

});



