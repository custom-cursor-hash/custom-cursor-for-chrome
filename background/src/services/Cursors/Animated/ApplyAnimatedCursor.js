import ResizeOffset from "../../ResizeOffset";
import ResizeImage from "../../Utils/ResizeImage";

export default async function ApplyAnimatedCursor (cursorConfig, size) {
    const cursorResizedFramesPromises = cursorConfig.cursor.originalFrames.map(frameUrl => ResizeImage(frameUrl, size))
    const pointerResizedImage = await ResizeImage(cursorConfig.pointer.originalPath, size)
    const cursorResizedFrames = await Promise.all(cursorResizedFramesPromises)
    const newOffsets = ResizeOffset(cursorConfig, size)
    const newCurrentCursor = { ...cursorConfig }
    newCurrentCursor.cursor.frames = cursorResizedFrames
    newCurrentCursor.pointer.path = pointerResizedImage
    newCurrentCursor.cursor.offsetX = newOffsets.nextCursorOffsetX
    newCurrentCursor.cursor.offsetY = newOffsets.nextCursorOffsetY
    newCurrentCursor.pointer.offsetX = newOffsets.nextPointerOffsetX
    newCurrentCursor.pointer.offsetY = newOffsets.nextPointerOffsetY
    return newCurrentCursor
}
