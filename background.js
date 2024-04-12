chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'pageReloaded') {
        console.log('Page reloaded!');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs);
            setTimeout(function() {
                console.log("sendMessage");
                //只可以一個分頁
                chrome.tabs.sendMessage(tabs[0].id, { action: 'GETTICKET' });
            }, 1000);
            
        });
    }
});


