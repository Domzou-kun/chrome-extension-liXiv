
function LocalStorageClear(){
    chrome.storage.local.clear(function() {
        if(chrome.extension.lastError !== undefined) {
            console.log("Clear Fali...")
        }else{
            console.log("Clear ok...")
        }
    });
}