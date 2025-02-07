import {OnInstalledReason, OnUpdateReason, registerContentScripts} from './Events'
import {getInstalled} from "./actions/getInstalled";
import {getConfig, setConfig} from "./actions/getConfig";
import {counterTab, startRotator, stopRotator} from "./services/rotator";
import ApplySelectedCursor from "./services/Cursors/ApplySelectedCursor";
import {initAlarm} from "./Notification";

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        OnInstalledReason().then((response) => {

        });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        OnUpdateReason().then((response) => {

        });
    }
});

chrome.runtime.onMessageExternal.addListener(
    async (request, sender, sendResponse) => {
        await getConfig().then(async (storage) => {
            switch (request.action) {
                case "getInstalled":
                case "get_config": {
                    sendResponse(storage);
                    break;
                }
                case "install_collection": {
                    const {slug, collection} = request;
                    if (Object.prototype.hasOwnProperty.call(storage.collection, slug)) {
                        storage.collection[slug] = collection;
                    } else {
                        storage.collection[slug] = {};
                        storage.collection[slug] = collection;
                    }
                    chrome.storage.local.set({collection: storage.collection}, () => {
                        sendResponse ({status: true, action: 'install_collection'})
                    });
                    break;
                }
                case "set_config": {
                    if (request.data.selected) {
                        const selected = request.data.selected;

                        selected.path = selected.image;
                        selected.cursor.originalPath =  selected.cursor.image;

                        selected.pointer.path = selected.pointer.path;
                        selected.pointer.originalPath =  selected.pointer.image;

                        await ApplySelectedCursor(request.data.selected, storage.size)
                        sendResponse ({status: true, action: 'set_config'})
                        break;
                    } else {
                        await setConfig(request.data).then(data => sendResponse(data))
                    }
                    break;
                }
            }

        });
    }
)

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const {action} = request;
    switch (action) {
        case "startRotator": {
            try {
                await startRotator();
                sendResponse({})
            } catch (e){
                sendResponse({error: e})
            }

            break;
        }
        case "stopRotator":
            try {
                await stopRotator();
                sendResponse({})
            } catch (e){
                sendResponse({error: e})
            }
            break;
        case "getOffset":
            sendResponse({getOffset: false})
            break;
        default:

    }
});

chrome.runtime.onStartup.addListener(registerContentScripts);
chrome.runtime.onInstalled.addListener(registerContentScripts);

try {
    chrome.tabs.onCreated.addListener(counterTab);
    chrome.tabs.onUpdated.addListener(counterTab);
} catch (e) {

}

try {
    initAlarm();
} catch (e) {
}
