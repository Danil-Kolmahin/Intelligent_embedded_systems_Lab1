const addMethods = (canvas) => {
    const ctx = canvas.getContext('2d')
    const ALL_WIDTH = canvas.width
    const ALL_HEIGHT = canvas.height

    const DEFAULT_INDENT = 20
    const DEFAULT_EVERY = 10
    const DEFAULT_ARROW_HEIGHT = 10
    const DEFAULT_ARROW_WIDTH = 10

    // const line = (startX, startY, finishX, finishY, invertY = false) => {
    //     if (!invertY) {
    //         startY = ALL_HEIGHT - startY
    //         finishY = ALL_HEIGHT - finishY
    //     }
    //     ctx.beginPath()
    //     ctx.moveTo(startX, startY)
    //     ctx.lineTo(finishX, finishY)
    //     ctx.stroke()
    // }

    // if (ctx.line === undefined) ctx.line = line

    const drawLines = ({
                           arrow_width = DEFAULT_ARROW_WIDTH,
                           arrow_height = DEFAULT_ARROW_HEIGHT,
                           indent = DEFAULT_INDENT,
                           markupOptions: {
                               needMarkup = true,
                               every = DEFAULT_EVERY,
                               length = 10,
                               needSubscription = true,
                               step = 1,
                               font = '7px mono',
                           } = {},

                           lines: {
                               beforeLines = () => {},
                               afterLines = () => {},
                           } = {},
                           arrows: {
                               beforeArrows = () => {},
                               afterArrows = () => {},
                           } = {},
                       } = {}) => {
        // lines
        beforeLines(ctx)

        ctx.beginPath()
        ctx.moveTo(indent, indent)
        ctx.lineTo(indent, ALL_HEIGHT - indent)
        ctx.lineTo(ALL_WIDTH - indent, ALL_HEIGHT - indent)
        ctx.stroke()

        afterLines(ctx)

        beforeArrows(ctx)

        // y arrow
        ctx.beginPath()
        ctx.moveTo(indent, indent)
        ctx.lineTo(indent - arrow_width / 2, indent + arrow_height)
        ctx.moveTo(indent, indent)
        ctx.lineTo(indent + arrow_width / 2, indent + arrow_height)
        ctx.stroke()

        // x arrow
        ctx.beginPath()
        ctx.moveTo(ALL_WIDTH - indent, ALL_HEIGHT - indent)
        ctx.lineTo(ALL_WIDTH - indent - arrow_height, ALL_HEIGHT - indent - arrow_width / 2)
        ctx.moveTo(ALL_WIDTH - indent, ALL_HEIGHT - indent)
        ctx.lineTo(ALL_WIDTH - indent - arrow_height, ALL_HEIGHT - indent + arrow_width / 2)
        ctx.stroke()

        afterArrows(ctx)

        if (needMarkup) {
            // y every
            for (let i = 1; i <= (ALL_HEIGHT - arrow_height - indent * 2) / every; i++) {
                ctx.beginPath()
                ctx.moveTo(
                    indent - length / 2,
                    ALL_HEIGHT - indent - i * every)
                ctx.lineTo(
                    indent + length / 2,
                    ALL_HEIGHT - indent - i * every)
                ctx.stroke()
                if (needSubscription) {
                    ctx.font = font
                    ctx.textAlign = 'right'
                    ctx.textBaseline = 'middle'
                    ctx.strokeText(`${i * step}`, indent - length / 2,
                        ALL_HEIGHT - indent - i * every)
                }
            }
            // x every
            for (let i = 1; i <= (ALL_WIDTH - arrow_height - indent * 2) / every; i++) {
                ctx.beginPath()
                ctx.moveTo(
                    indent + i * every,
                    ALL_HEIGHT - indent + length / 2)
                ctx.lineTo(
                    indent + i * every,
                    ALL_HEIGHT - indent - length / 2)
                ctx.stroke()
                if (needSubscription) {
                    ctx.font = font
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'top'
                    ctx.strokeText(`${i * step}`, indent + i * every,
                        ALL_HEIGHT - indent + length / 2)
                }
            }
        }
        return ctx
    }

    const drawBorder = ({
                            before = () => {},
                            after = () => {},
                        } = {}) => {
        before(ctx)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, ALL_HEIGHT)
        ctx.lineTo(ALL_WIDTH, ALL_HEIGHT)
        ctx.lineTo(ALL_WIDTH, 0)
        ctx.closePath()
        ctx.stroke()

        after(ctx)

        return ctx
    }

    const drawFunction = ({
                              f = (x) => x,
                              startX = 0,
                              step = 1,
                              indent = DEFAULT_INDENT,
                              every = DEFAULT_EVERY,
                              finishX = (ALL_WIDTH - 2 * indent) / every,
                          } = {}) => {
        for (let x = startX; x <= finishX; x += step) {
            let y = f(x)
            let eX = x * every
            let eY = y * every
            if (eX >= 0 && eX <= ALL_WIDTH - 2 * indent && eY >= 0 && eY <= ALL_HEIGHT - 2 * indent) {
                ctx.beginPath()
                ctx.arc(indent + eX, ALL_HEIGHT - indent - eY,
                    1, 0, 2 * Math.PI, true)
                ctx.fill()
            }
        }

        return ctx
    }

    if (ctx.drawLines === undefined) ctx.drawLines = drawLines
    if (ctx.drawBorder === undefined) ctx.drawBorder = drawBorder
    if (ctx.drawFunction === undefined) ctx.drawFunction = drawFunction

    return ctx
}