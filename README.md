## 利用chrome extension 自動點選操作買甜點

**功能介紹:**

:pencil:**注意** 

此外掛只適用某甜點網站，還有此功能未上架到chrome extension，欲使用請自行下載

:pencil:**步驟**

1. 先下載此包程式到你的本機
2. 到chrome extension開發者模式，選擇loading unpacked，再選擇剛剛下載的那包專案
3. 將此外掛加到你的chrome外掛中，就可以去看有無此外掛功能，如下圖

![小工具圖片](https://github.com/sophiaxxx/img-folde/blob/master/ticket_intro.PNG?raw=true)

4. 在你要買的那個頁面，操作小功能，輸入當天你要買票的時間，再點選按鈕(Get Ticket)
   注意這邊只能輸入大於目前的時間，妳也可以打開F12開發者模式看有無跳出提示訊息~
   
![小工具圖片](https://github.com/sophiaxxx/img-folde/blob/master/ticket_step.PNG?raw=true)

5. 待時間到，這部分會針對所有打開的頁面重整畫面，並進行點選目前可選擇的第一個票種張數點選一張後會自己勾選同意條款並執行下一步的按鈕，進行完這一連串的自動點選後，就會跑到輸入資料的畫面，那邊就要開始自己操作。**注意**跑到填寫資料與付款畫面前，請勿自動重整畫面，如重整畫面最好重新設定步驟4的操作。

(其他進階功能如搶其它網站/選擇特定票價張數等，還在努力加載中...)



### **想要在頁面重新加載後繼續執行 JavaScript**
Chrome 擴展可以使用背景腳本（background scripts）來持續監聽和響應頁面事件，即使在頁面被重新加載後也不例外。
以下是一個基礎的策略，你可以根據這個策略來實施你的需求：

**背景腳本監聽頁面加載事件** 

首先，確保你的擴展擁有對需要的頁面的訪問權限，這通常在 `manifest.json` 文件中設定：

```json
{
  "name": "你的擴展名稱",
  "version": "1.0",
  "description": "描述你的擴展做什麼",
  "permissions": [    
    "activeTab",
    "tabs"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "manifest_version": 2
}
```

在你的 `background.js`（或你在 `manifest.json` 中指定的背景腳本檔案名）中，你可以使用 Chrome Tabs API 監聽頁面加載事件：

```javascript
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'pageReloaded') { //use sendMessage addListener
        chrome.tabs.query({},function(tabs){ //find all tabs
            tabs.forEach(function(tab){
                //scripts for you...
            });
         });
    }
});

```

