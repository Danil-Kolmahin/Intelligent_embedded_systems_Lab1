const addMethods = (canvas, {
    width = 500,
    height = 500,
    withBorder = true,
    borderOptions = {},
    // withArrows = true,
    arrow_width = 10,
    arrow_height = 10,
    indent = 20,
    shiftX = 0,
    shiftY = 0,
    arrowsOptions = {},
    linesOptions = {},
    markupOptions = {},
    withMarkup = { // temp design
        every = 10,
    } = {},
} = {}) => {
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    // const line = (startX, startY, finishX, finishY, invertY = false) => {
    //     if (!invertY) {
    //         startY = height - startY
    //         finishY = height - finishY
    //     }
    //     ctx.beginPath()
    //     ctx.moveTo(startX, startY)
    //     ctx.lineTo(finishX, finishY)
    //     ctx.stroke()
    // }

    // if (ctx.line === undefined) ctx.line = line

    const drawLines = ({
                           lines: {
                               beforeLines = () => {},
                               afterLines = () => {},
                           } = {},
                           arrowsOptions: {
                               beforeArrows = () => {},
                               afterArrows = () => {},
                           } = {},
                           markupOptions: {
                               needMarkup = true,
                               length = 10,
                               needSubscription = true,
                               step = 1,
                               font = '7px mono',
                           } = {},
                           withMarkup: {
                               every = 10,
                           } = {},
                       } = {}) => {
        // lines
        beforeLines(ctx)

        ctx.beginPath()
        ctx.moveTo(indent, indent)
        ctx.lineTo(indent, height - indent)
        ctx.lineTo(width - indent, height - indent)
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
        ctx.moveTo(width - indent, height - indent)
        ctx.lineTo(width - indent - arrow_height, height - indent - arrow_width / 2)
        ctx.moveTo(width - indent, height - indent)
        ctx.lineTo(width - indent - arrow_height, height - indent + arrow_width / 2)
        ctx.stroke()

        afterArrows(ctx)

        if (needMarkup) {
            // y every
            for (let i = 1; i <= (height - arrow_height - indent * 2) / every; i++) {
                ctx.beginPath()
                ctx.moveTo(
                    indent - length / 2,
                    height - indent - i * every)
                ctx.lineTo(
                    indent + length / 2,
                    height - indent - i * every)
                ctx.stroke()
                if (needSubscription) {
                    ctx.font = font
                    ctx.textAlign = 'right'
                    ctx.textBaseline = 'middle'
                    ctx.strokeText(`${shiftY + i * step}`, indent - length / 2,
                        height - indent - i * every)
                }
            }
            // x every
            for (let i = 1; i <= (width - arrow_height - indent * 2) / every; i++) {
                ctx.beginPath()
                ctx.moveTo(
                    indent + i * every,
                    height - indent + length / 2)
                ctx.lineTo(
                    indent + i * every,
                    height - indent - length / 2)
                ctx.stroke()
                if (needSubscription) {
                    ctx.font = font
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'top'
                    ctx.strokeText(`${shiftX + i * step}`, indent + i * every,
                        height - indent + length / 2)
                }
            }
        }
        return ctx
    }

    const drawBorder = ({
                            before = () => {},
                            after = () => {},
                        }) => {
        before(ctx)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, height)
        ctx.lineTo(width, height)
        ctx.lineTo(width, 0)
        ctx.closePath()
        ctx.stroke()

        after(ctx)

        return ctx
    }

    const drawFunction = ({
                              f = (x) => x,
                              startX = 0,
                              finishX = 10,
                              step = 1,
                              dotty = true,
                          } = {}) => {
        ctx.beginPath()
        for (let x = startX; x <= finishX; x += step) {
            let y = f(x)
            // console.log(x, y)
            let eX = (-shiftX + x) * withMarkup.every // !!!
            let eY = (-shiftY + y) * withMarkup.every // !!!
            if (eX >= 0 && eX <= width - 2 * indent && eY >= 0 && eY <= height - 2 * indent) {
                if (dotty) {
                    ctx.arc(indent + eX, height - indent - eY,
                        1, 0, 2 * Math.PI, true)
                } else {
                    if (x === startX) ctx.moveTo(indent + eX, height - indent - eY)
                    ctx.lineTo(indent + eX, height - indent - eY)
                }
            } else {
                console.error(`eX >= 0 && eX <= width - 2 * indent && eY >= 0 && eY <= height - 2 * indent`)
            }
        }
        if (dotty) ctx.fill()
        else ctx.stroke()

        return ctx
    }

    if (withBorder) drawBorder(borderOptions)
    if (1) drawLines({ arrowsOptions, linesOptions, markupOptions, withMarkup })
    if (ctx.drawFunction === undefined) ctx.drawFunction = drawFunction

    return ctx
}