chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'pageReloaded') {
        chrome.tabs.query({},function(tabs){     
            tabs.forEach(function(tab){
                if(new URL(tab.url).hostname === "kktix.com"){ //因無法直接抓取manifest.json的content_scripts matches, 使用網域來指定要傳送message的tab
                    chrome.tabs.reload(tab.id);
                    setTimeout(function() {
                        chrome.tabs.sendMessage(tab.id, { action: 'GETTICKET' });
                        console.log('sendMessage!'+tab.id);
                    }, 1000);
                }
            });
         });
    }
});


