let canvas = document.querySelector('canvas')

addMethods(canvas)
    .drawBorder({
        before: (ctx) => ctx.strokeStyle = 'green',
        after: (ctx) => ctx.strokeStyle = 'black',
    })
    .drawLines({
        arrows: {
            beforeArrows: (ctx) => ctx.strokeStyle = 'green',
            afterArrows: (ctx) => ctx.strokeStyle = 'black',
        },
    })
    .drawFunction({f: (x) => 2 * x + 1})

const rows = [
    ['name1', 'city1', 'some other info'],
    ['name2', 'city2', 'more info'],
]

exportToCsv('test.csv', rows)