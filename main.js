const div = document.getElementById('target')
// const canvases = getLab1AllFunc.map(() => {
//     let res = document.createElement('canvas')
//     div.before(res)
//     return res
// })
//
// const colors = ['red', 'green', 'blue']
//
// canvases.forEach((canvas, index) => addMethods(canvas)
//     .drawBorder({
//         before: (ctx) => ctx.strokeStyle = colors[index],
//         after: (ctx) => ctx.strokeStyle = 'black',
//     })
//     .drawLines({
//         arrows: {
//             beforeArrows: (ctx) => ctx.strokeStyle = colors[index],
//             afterArrows: (ctx) => ctx.strokeStyle = 'black',
//         },
//         markupOptions: {
//             every: 100,
//         },
//         shiftX: -2,
//         shiftY: -2,
//     })
//     .drawFunction({
//         f: getLab1AllFunc[index], dotty: false,
//         shiftX: -2,
//         shiftY: -2,
//         every: 100,
//         finishX: 31,
//     }))

let last = document.createElement('canvas')
div.before(last)
addMethods(last, {
    borderOptions: {
        before: (ctx) => ctx.strokeStyle = 'brown',
        after: (ctx) => ctx.strokeStyle = 'black',
    },
    markupOptions: {
        every: 100,
        shiftX: -2,
        shiftY: -2,
    },
    withMarkup: {
        every: 10,
    },
    shiftX: -10,
    shiftY: -10,
}).drawFunction({
        f: getLab2Rxx, dotty: false,
        finishX: 31,
    })

const rows = [
    ['name1', 'city1', 'some other info'],
    ['name2', 'city2', 'more info'],
]

// exportToCsv('test.csv', rows)