import ResizeImage from "./Utils/ResizeImage";
const ResizeCursorImages = async (cursorConfig, size) => {
    const cursorURL = cursorConfig.cursor.originalPath
    const pointerURL = cursorConfig.pointer.originalPath
    const newCursorURI = cursorURL ? await ResizeImage(cursorURL, size) : null
    const newPointerURI = pointerURL ? await ResizeImage(pointerURL, size) : null

    return [ newCursorURI, newPointerURI ]
}

export default ResizeCursorImages
