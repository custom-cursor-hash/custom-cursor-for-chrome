import ResizeCursorImages from "../../ResizeCursorImages";
import ResizeOffset from "../../ResizeOffset";

export default async function ApplyRegularCursor (cursorConfig, size) {
    const newCurrentCursor = { ...cursorConfig }
    const [newCursorURI, newPointerURI] = await ResizeCursorImages(newCurrentCursor, size)
    const newOffsets = ResizeOffset(cursorConfig, size)
    newCurrentCursor.cursor.path = newCursorURI
    newCurrentCursor.pointer.path = newPointerURI
    newCurrentCursor.cursor.offsetSizeX = newOffsets.nextCursorOffsetX
    newCurrentCursor.cursor.offsetSizeY = newOffsets.nextCursorOffsetY
    newCurrentCursor.pointer.offsetSizeX = newOffsets.nextPointerOffsetX
    newCurrentCursor.pointer.offsetSizeY = newOffsets.nextPointerOffsetY

    return newCurrentCursor
}
