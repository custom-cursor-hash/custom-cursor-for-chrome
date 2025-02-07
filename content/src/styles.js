const customHoverClassName = 'custom-cursor-on-hover'
const defaultHoverClassName = 'custom-cursor-default-hover'

const pointerStyles = (pointer) => {
    const pointerUrl = pointer.path
    const offsetX = pointer.offsetSizeX
    const offsetY = pointer.offsetSizeY
    return (`body button, body [type='button'], body input[type='reset'], body input[type='submit'], body [role="button"], ::-webkit-search-cancel-button, ::-webkit-search-decoration, ::-webkit-scrollbar-button, ::-webkit-file-upload-button, [role^=button], .cc_pointer, [type="search"]::-webkit-search-cancel-button, a, select, [type="search"]::-webkit-search-decoration, .paper-button, .ytp-progress-bar-container, input[type=submit], :link, :visited, a > *, img,  ::-webkit-scrollbar-button, .ogdlpmhglpejoiomcodnpjnfgcpmgale_pointer, ::-webkit-file-upload-button, .ytp-volume-panel, #myogdlpmhglpejoiomcodnpjnfgcpmgale .icon, body .${customHoverClassName} {cursor: url("${pointerUrl}") ${offsetX} ${offsetY}, pointer !important;} `)
}

const cursorStyles = (cursor) => {
    const cursorUrl = cursor.path
    const offsetX = cursor.offsetSizeX
    const offsetY = cursor.offsetSizeY
    return (`html,body,body select,body .${defaultHoverClassName} {cursor: url("${cursorUrl}") ${offsetX} ${offsetY}, auto !important;}`)
}

export {pointerStyles, cursorStyles, customHoverClassName, defaultHoverClassName}
