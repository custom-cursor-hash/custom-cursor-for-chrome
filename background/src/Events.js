const getUserUid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const OnInstalledReason = async () => {
    const collections = await fetch('/libs/collections.json').then(response => response.json());
    const data = {
        collection: collections,
        size: 32,
        counterTab: 1,
        myCollection: {},
        version: chrome.runtime.getManifest().version,
        favorites: [],
        rotator: {
            status: false,
            type: 'request',
            value: 60
        },
        di: (new Date()).getTime(),
        uid: getUserUid()
    };
    chrome.storage.local.set(data, () => {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({target: {tabId: tab.id}, files: ['content.js']}, () => {
                });

            })
        });
        return true;
    });


}
const OnUpdateReason = async () => {
    chrome.storage.local.set({
        du: new Date().getTime(),
        size: 32,
        rotator: {status: false, type: 'request', value: 60}
    }, () => {
        return true;
    });


}

const registerContentScripts = async () => {
    await chrome.scripting.unregisterContentScripts();
    const props = {
        'matches': ['*://*/*',], 'allFrames': true, 'matchOriginAsFallback': true, 'runAt': 'document_start'
    };
    await chrome.scripting.registerContentScripts([{
        'id': 'cursor', 'js': ['content.js'], 'world': 'ISOLATED', ...props
    }]);
}

export {OnInstalledReason, OnUpdateReason, registerContentScripts, getUserUid}
