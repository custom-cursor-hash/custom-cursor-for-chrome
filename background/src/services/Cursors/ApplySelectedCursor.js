import ApplyRegularCursor from "./Regular/ApplyRegularCursor";
/* eslint-disable */
export default async function ApplySelectedCursor(cursorConfig, size) {
    const pack = await ApplyRegularCursor(cursorConfig, size)
    try {
        chrome.storage.local.set({selected: pack, size: size}, () => {
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    tabs.forEach((tab) => {
                        chrome.tabs.sendMessage(tab.id, {action: 'changeCursorPack'}, (response) =>  { })
                    })
                })
            },
        )
    } catch (e) {

    }
    return pack
}
