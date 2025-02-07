const customHoverClassName = 'custom-cursor-hover'
const defaultHoverClassName = 'custom-cursor-default-hover'

const pointerStyles = (pointer) => {
    const pointerUrl = pointer.path
    const offsetX = pointer.offsetSizeX
    const offsetY = pointer.offsetSizeY
    return (
        `
      body a,
      body button,
      body [type='button'],
      body input[type='reset'],
      body input[type='submit'],
      body [role="button"],
      ::-webkit-search-cancel-button,
      ::-webkit-search-decoration,
      ::-webkit-scrollbar-button, 
      ::-webkit-file-upload-button,
      body .${customHoverClassName} {
        cursor: url("${pointerUrl}") ${offsetX} ${offsetY}, pointer !important;
      }
    `
    )
}

const cursorStyles = (cursor) => {
    const cursorUrl = cursor.path
    const offsetX = cursor.offsetSizeX
    const offsetY = cursor.offsetSizeY

    return (
        `
      html,
      body,
      body select,
      body .${defaultHoverClassName} {
        cursor: url("${cursorUrl}") ${offsetX} ${offsetY}, auto !important;
      }
    `
    )
}

export { pointerStyles, cursorStyles, customHoverClassName, defaultHoverClassName }
