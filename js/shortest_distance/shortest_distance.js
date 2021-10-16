// create random associated cities
const fs = require('fs')

let f = fs.readFileSync("../../data/cities_array.json", "utf8")
let d = JSON.parse(f)
let dist = {}
let els = randomizeElementsIntoGraphWithNeighbors(d, 3, 6, dist)
console.log(dist)
console.log(JSON.stringify(els))


function randomizeElementsIntoGraphWithNeighbors(arr, minN, maxN, dist) {
    let al = arr.length
    if (minN > maxN) {
        minN = maxN
    }
    arr.forEach((v, i) => {
        dist[i] = 0
    })
    let arrRes = arr.map(v => {
        let safetyCounter = 0
        let taken = {}
        let related = []
        let n = getRandomInt(minN, maxN)
        // console.log("n", n)
        while (related.length < n) {
            let r = Math.floor(Math.random() * al)
            // console.log(r)
            if (taken[r] === undefined && arr[r] !== v) {
                taken[r] = true
                dist[r]++
                related.push(arr[r])
            }
            safetyCounter++
            if (safetyCounter > al) {
                break
            }
        }
        return { id: v, rel: related }
    })
    return arrRes
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
