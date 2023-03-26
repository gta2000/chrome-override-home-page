let overrideUrl = 'chrome://new-tab-page';


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "DEFAULT PLEASE") {
        createTab(overrideUrl);
     }
});

function createTab (url) {
    return new Promise(resolve => {
        chrome.tabs.update({url}, async tab => {
            chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    chrome.tabs.onUpdated.removeListener(listener);
                    resolve(tab);
                }
            });
        });
    });
}