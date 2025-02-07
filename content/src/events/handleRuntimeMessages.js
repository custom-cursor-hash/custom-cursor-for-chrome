import handleDisableExtension from './handleDisableExtension'
import handleCursorChange from './handleCursorChange'

const handleRuntimeMessages = (request, sender, sendResponse) => {
    switch (request.action) {
        case 'clear':
        case 'disableApp':
            handleDisableExtension()
            break;
        case 'changeCursorPack':
            handleCursorChange()
            break;
        default:
            console.log(``)
    }
}

export default handleRuntimeMessages
