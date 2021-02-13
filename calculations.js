const A = 0.690507 // random (maybe determined)
const fi = 0.730429 // random (maybe determined)
const maxW = 3000 // 1500
const n = 3 // 10
const W = []
for (let i = 1; i <= n; i++) W.push(maxW / n * i)
const N = 32 // 256 // 1000 for time test
const arrayW = []
for (let t = 0; t < N; t++) arrayW.push(W.map( w =>  A * Math.sin(w * t + fi) ))
const xT = []
for (let t = 0; t < N; t++) xT.push(arrayW[t].reduce((acc, cur) => acc + cur))

start = new Date()
const MX = xT.reduce((acc, cur) => acc + cur) / N
// arrayW.forEach((val, i) => console.log(`${i} - ${val[0]} ${val[1]} ${val[2]}`))
// xT.forEach((val, i) => console.log(`${i} - ${val}`))
const arrayDx = xT.map(x => (x - MX) ** 2)
const DX = arrayDx.reduce((acc, cur) => acc + cur) / (N - 1)
end = new Date()

// const Tau = 1
// const arrayRxx = xT.map((x, i) => (xT[i] - MX) * (xT[(i + Tau) % N] - MX))
const arrayRxx = xT.map((_, Tau) => xT.map((_, t) => (xT[t] - MX) * (xT[(t + Tau) % N] - MX)))
const Rxx = arrayRxx[1].reduce((acc, cur) => acc + cur) / (N - 1)

const getLab1Func = (f) => (t) => f[t]
const getLab1AllFunc = arrayW[0].map((v, i) => getLab1Func(arrayW.map((v1, newI) => arrayW[newI][i])))

let getLab1AverageFunc = (xT) => (t) => xT[t]
getLab1AverageFunc = getLab1AverageFunc(arrayW.map(val => val[1]))

let getLab2Rxx = (f) => (t) => f[t]
getLab2Rxx = getLab2Rxx(arrayRxx[1])

// console.log(arrayW)
// console.log(arrayW.map((v, newI) => arrayW[newI][0]))
console.log('Operation took ' + (end.getTime() - start.getTime()) + ' msec')
console.log(arrayRxx)
console.log(Rxx)