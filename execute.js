const ticketEvent = (t) => {
    //設定訂票當日的日期時間
    if(t===''){
        alert("Please input the time you want!");
        return;
    }

    let today = new Date().toISOString().slice(0, 10);
    const targetDate = new Date(today+'T'+ t +':00');
    console.log("targetDate=>"+targetDate);
    const currentTime = new Date();
    
    if (currentTime < targetDate) {
        //計算延遲時間
        const delay = targetDate.getTime() - currentTime.getTime();
        //延遲執行按鈕
        setTimeout(function() {
            go2getTicket();
        }, delay);
    } else {
        console.log('Current time is after the target date, button will not be clicked.');
    }
};

function ticketGot(){
const clickBtn = document.querySelector("button.btn-default.plus");
if (clickBtn && !clickBtn.disabled) {

    clickBtn.click();
    //setTimeout(()=> { element.click(); }, 100); //twice click, so i can choose 2 tickets!
} else {
    console.log("not found");
}
const checkbox = document.getElementById("person_agree_terms");
if (!checkbox.checked) {
    checkbox.click();
}
// 觸發複選框方法 假如是用 .ckecked = true的話要加這段
//conditions.agreeTerm = true;
const buttons = document.querySelectorAll('button.btn.btn-primary.btn-lg.ng-isolate-scope');
buttons.forEach(button => {

    if (button.textContent.includes('下一步')) {

        if (!button.disabled) {
            button.click();
            console.log('Next step button clicked');
        } else {
            console.log('Next step button is disabled');
        }
    }
});

console.log('done!!');
}

function go2getTicket(){
    chrome.runtime.sendMessage({ action: 'pageReloaded' });
}

function reset(){
    console.log("reset");
    window.location.reload();
}


const onMessage = (message) => {
    console.log(message.action);
  switch (message.action) {
    case "SETTIME":
        ticketEvent(message.startTime);
        break;
    case "RESET":
        reset();
        break;
    case "GETTICKET":
        console.log('Execute function in execute.js');
        ticketGot();
        break;
    default:
      break;
  }
};

chrome.runtime.onMessage.addListener(onMessage);
