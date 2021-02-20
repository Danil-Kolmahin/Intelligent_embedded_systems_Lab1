const end = document.getElementById('target')
end.before(document.createElement('h1').title = 'Intelligent embedded systems Lab1, Lab2')

const writeDescription = (text) => {
    end.before(document.createElement('br'))
    end.before(document.createElement('h1').title = text)
    end.before(document.createElement('br'))
}

//Lab1
//getLab1AllFunc
getLab1AllFunc.forEach((_, i) => {
    writeDescription('Lab1 #' + (i + 1))
    const canvas = document.createElement('canvas')
    new Lab1Graph(canvas).drawFunction({
        f: getLab1AllFunc[i], dotty: false,
        finishX: 31,
    })
    end.before(canvas)
})

//getLab1AverageFunc
writeDescription('Lab1 Average')
const Lab1Average = document.createElement('canvas')
new Lab1Graph(Lab1Average).drawFunction({
    f: getLab1AverageFunc, dotty: false,
    finishX: 31,
})
end.before(Lab1Average)

//MX
writeDescription('MX = ' + MX)
//DX
writeDescription('DX = ' + DX)

//Lab1 O(n)
writeDescription('Lab1 O(n)')
const Lab1On = document.createElement('canvas')
new LabOn(Lab1On).drawFunction({
    f: getLab1On, dotty: false,
    finishX: 89,
})
end.before(Lab1On)

//Lab2
//getLab2RxxFunc
writeDescription('Lab2 Rxx')
const Lab2RxxFunc = document.createElement('canvas')
new Lab2Rx(Lab2RxxFunc).drawFunction({
    f: getLab2RxxFunc, dotty: false,
    finishX: 31,
})
end.before(Lab2RxxFunc)

//getLab2RxyFunc
writeDescription('Lab2 Rxy')
const Lab2RxyFunc = document.createElement('canvas')
new Lab2Rx(Lab2RxyFunc).drawFunction({
    f: getLab2RxyFunc, dotty: false,
    finishX: 31,
})
end.before(Lab2RxyFunc)

//Rxx
writeDescription('Rxx = ' + Rxx)
//Rxy
writeDescription('Rxy = ' + Rxy)

//getLab2OnRxx
writeDescription('Lab2 Rxx O(n)')
const Lab2OnRxx = document.createElement('canvas')
new LabOn(Lab2OnRxx).drawFunction({
    f: getLab2OnRxx, dotty: false,
    finishX: 89,
})
end.before(Lab2OnRxx)

//getLab2OnRxy
writeDescription('Lab2 Rxy O(n)')
const Lab2OnRxy = document.createElement('canvas')
new LabOn(Lab2OnRxy).drawFunction({
    f: getLab2OnRxy, dotty: false,
    finishX: 89,
})
end.before(Lab2OnRxy)

//Lab1 Additional (32 < N < 128) | (Mx * Dx * 10)
writeDescription('Lab1 Additional (32 < N < 128) | (Mx * Dx * 10)')
const Lab1Additional = document.createElement('canvas')
new MyContext(Lab1Additional, {
    width: 1300,
    height: 200,
    borderOptions: {
        before: (ctx) => ctx.strokeStyle = 'orange',
        after: (ctx) => ctx.strokeStyle = 'black',
    },
    withMarkup: {
        everyY: 40,
        everyX: 10,
    },
    shiftY: -2,
    shiftX: 31,
    arrowsOptions: {
        beforeArrows: (ctx) => ctx.strokeStyle = 'orange',
        afterArrows: (ctx) => ctx.strokeStyle = 'black',
    },
}).drawFunction({
    f: getLab1Additional, dotty: false,
    startX: 32,
    finishX: 128,
})
end.before(Lab1Additional)