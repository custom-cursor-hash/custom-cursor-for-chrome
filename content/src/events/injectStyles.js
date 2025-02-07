import throttle from 'lodash/debounce'
import {cursorStyles, customHoverClassName, defaultHoverClassName, pointerStyles} from "../styles";
const styleTagId = 'custom-cursor',
    animationId = 'custom-cursor-animated',
    cursorAnimationTarget = () => document.body;
const throttledHandleMouseOver = throttle(
    (element) => {
        const classList = element.target.classList
        if (classList.contains(customHoverClassName) || classList.contains(defaultHoverClassName)) return

        const cursorValue = getComputedStyle(element.target, null).getPropertyValue('cursor')

        if (cursorValue === 'pointer') {
            element.target.classList.add(customHoverClassName)
        }

        if (cursorValue === 'default' || cursorValue === 'auto') {
            element.target.classList.add(defaultHoverClassName)
        }
    },
    40,
    {leading: true},
)

const applyAnimation = (currentCursorConfig) => {
    removeAnimation()
    const cursor = currentCursorConfig.cursor

    const keyframes = []
    cursor.frames.forEach((blob) => {
        keyframes.push({
            cursor: `url(${blob}) ${cursor.offsetX} ${cursor.offsetY}, auto`,
            backfaceVisibility: 'hidden',
        })
    })

    const animateOptions = {id: animationId, duration: currentCursorConfig.animationSpeed, iterations: Infinity}
    cursorAnimationTarget().animate(keyframes, animateOptions)
}

const removeAnimation = () => {
    cursorAnimationTarget()
        .getAnimations()
        .find(animation => animation.id === animationId)?.cancel()
}

const injectStyles = (currentCursorConfig) => {
    const existingStyleTag = document.getElementById(styleTagId)

    if (existingStyleTag) {
        existingStyleTag.innerHTML = ''
        existingStyleTag.appendChild(document.createTextNode(pointerStyles(currentCursorConfig.pointer)))

        if (currentCursorConfig.isAnimated) {
            applyAnimation(currentCursorConfig)
        } else {
            existingStyleTag.appendChild(document.createTextNode(cursorStyles(currentCursorConfig.cursor)))
        }

    } else {
        const styleTag = document.createElement('style')
        styleTag.id = styleTagId
        styleTag.type = 'text/css'
        styleTag.appendChild(document.createTextNode(pointerStyles(currentCursorConfig.pointer)))

        if (currentCursorConfig.isAnimated) {
            applyAnimation(currentCursorConfig)
        } else {
            styleTag.appendChild(document.createTextNode(cursorStyles(currentCursorConfig.cursor)))
        }

        document.head.appendChild(styleTag)
    }

    document.body.removeEventListener('mouseover', throttledHandleMouseOver)
    document.body.addEventListener('mouseover', throttledHandleMouseOver)
}

const removeStyles = () => {
    const styleTag = document.getElementById(styleTagId)
    if (styleTag) {
        styleTag.parentNode.removeChild(styleTag)
        removeAnimation()
    }
}

export {injectStyles, removeStyles}
