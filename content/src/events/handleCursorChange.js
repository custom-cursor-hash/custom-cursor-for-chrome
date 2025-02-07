import { injectStyles } from './injectStyles'

const handleCursorChange = () => {
    chrome.storage.local.get('selected', ({selected}) => {
        if (selected && selected !== null) {
            if (document.body) {
                injectStyles(selected)
            } else {
                const headObserver = new MutationObserver(() => {
                    if (document.body) {
                        headObserver.disconnect()
                        injectStyles(selected)
                    }
                })
                headObserver.observe(document, { childList: true, subtree: true })
            }
        }
    })
}

export default handleCursorChange
