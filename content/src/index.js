import handleCursorChange from './events/handleCursorChange'
import handleRuntimeMessages from './events/handleRuntimeMessages'

const initialize = () => {
    handleCursorChange()
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    handleRuntimeMessages(request, sender, sendResponse);
    sendResponse({})
})

initialize()
