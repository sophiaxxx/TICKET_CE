## (TICKET_CE)利用chrome extension 自動點選操作搶票

功能介紹:(還在努力加載中...)


**如果想要在 Chrome 擴展中在頁面重新加載後繼續執行 JavaScript**
Chrome 擴展可以使用背景腳本（background scripts）來持續監聽和響應頁面事件，即使在頁面被重新加載後也不例外。
以下是一個基礎的策略，你可以根據這個策略來實施你的需求：

### 背景腳本監聽頁面加載事件

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
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // 檢查是否為頁面加載完成的事件
  if (changeInfo.status === 'complete' && tab.active) {
    // 你可以在這裡插入你想在頁面加載完成後執行的程式碼
    console.log(`Tab ${tabId} has been loaded`);

    // 向該頁面注入腳本
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: ['yourScript.js']  // 指定你想要執行的外掛腳本檔案名
    });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // 檢查是否為頁面加載完成的事件
    if (message.action === 'pageReloaded') {
        console.log('Page reloaded!');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs);
            setTimeout(function() {
                console.log("sendMessage");
                chrome.tabs.sendMessage(tabs[0].id, { action: 'GETTICKET' });
            }, 2000);
            
        });
    }
});
```

### 注入腳本

當你在背景腳本中捕捉到頁面加載事件後，可以使用 `chrome.scripting.executeScript` 方法向目標頁面注入和執行特定的 JavaScript。這可以是一個簡單的腳本，或是更複雜的腳本來進行各種操作。

記住，你可能需要在 `manifest.json` 中聲明 `scripting` 權限，以使用 `chrome.scripting.executeScript`：

```json
{
  "permissions": ["scripting"]
}
```

### 要在背景腳本中調用其他 JavaScript 檔案

可以使用 `chrome.tabs.executeScript()` 方法。這個方法可以在指定的標籤中執行 JavaScript 代碼。

以下是一個示例：

```javascript
chrome.tabs.executeScript(tabId, {
  file: 'script.js'
});
```

在這個示例中，`tabId` 是要在其上執行 JavaScript 代碼的標籤的 ID，`file` 是要執行的 JavaScript 文件的名稱。這將在指定的標籤中執行 `script.js` 文件中的代碼。

請注意，您需要確保在 `manifest.json` 文件中設置了適當的權限，以便在擴展中執行代碼：

```json
{
  "name": "My Extension",
  "version": "1.0",
  "manifest_version": 3,
  "permissions": [
    "tabs",
    "activeTab",
      //"webNavigation",    
      //"scripting"
  ],
  "background": {
    "scripts": "background.js"
  }
}
```
