const originalImageSize = 128

const ResizeOffset = (cursorConfig, size) => {
    const currentSizeRatio = originalImageSize / size;
    const nextCursorOffsetX = Math.floor(cursorConfig.cursor.offsetX / currentSizeRatio)
    const nextCursorOffsetY = Math.floor(cursorConfig.cursor.offsetY / currentSizeRatio)
    const nextPointerOffsetX = Math.floor(cursorConfig.pointer.offsetX / currentSizeRatio)
    const nextPointerOffsetY = Math.floor(cursorConfig.pointer.offsetY / currentSizeRatio)

    return { nextCursorOffsetX, nextCursorOffsetY, nextPointerOffsetX, nextPointerOffsetY }
}

export default ResizeOffset
