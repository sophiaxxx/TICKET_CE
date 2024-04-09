const ticketEvent = () => {
    //設定訂票當日的日期時間
    const targetDate = new Date('2024-04-09T17:40:00');

    const currentTime = new Date();
    
    if (currentTime < targetDate) {
        //計算延遲時間
        const delay = targetDate.getTime() - currentTime.getTime();
    
        //延遲執行按鈕
        setTimeout(function() {
            const clickBtn = document.querySelector("button.btn-default.plus");
            if (clickBtn && !clickBtn.disabled) {
     
                clickBtn.click();
                clickBtn.click();
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
            
        }, delay);
    } else {
        console.log('Current time is after the target date, button will not be clicked.');
    }
};


const reset = () => {
  document.body.style.transform = "";
};

const onMessage = (message) => {
  switch (message.action) {
    case "TICKETGET":
      ticketEvent();
      break;
    case "RESET":
      reset();
      break;
    default:
      break;
  }
};

chrome.runtime.onMessage.addListener(onMessage);
