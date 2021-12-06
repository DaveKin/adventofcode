let day1_1 = () => {
    return document.body.textContent.split(/\n/)
        .map((a, i, c) => (parseInt(a) > parseInt(c[i - 1]) ? 1 : 0))
        .reduce((a, b) => (a + b))
}

let day1_2 = () => {
    return document.body.textContent.split(/\n/)
        .map((a, i, c) => (parseInt(c[i - 1]) + parseInt(a) + parseInt(c[i + 1])))
        .map((a, i, c) => (parseInt(a) > parseInt(c[i - 1]) ? 1 : 0))
        .reduce((a, b) => (a + b))
}

let day2_1 = () => {
    const position = document.body.textContent.split(/\n/)
        .map(a => {
            const c = a.split(' ')
            switch (c[0]) {
                case 'forward':
                    return [parseInt(c[1]), 0]
                case 'up':
                    return [0, parseInt(c[1]) * -1]
                case 'down':
                    return [0, parseInt(c[1])]
            }
        })
        .reduce((a, b) => (Array.isArray(b) ? a = [a[0] + b[0], a[1] + b[1]] : a), [0, 0])
    return position[0] * position[1]
}

let day2_2 = () => {
    const position = document.body.textContent.split(/\n/)
        .map(a => {
            const c = a.split(' ')
            switch (c[0]) {
                case 'forward':
                    return [parseInt(c[1]), 0]
                case 'up':
                    return [0, parseInt(c[1]) * -1]
                case 'down':
                    return [0, parseInt(c[1])]
            }
        })
        .reduce((a, b) => (Array.isArray(b) ? a = [a[0] + b[0], a[1] + b[1], a[2] + (b[0] * (a[1] + b[1]))] : a), [0, 0, 0])
    return position[0] * position[2]
}

let day3_1 = () => {
    const data = document.body.textContent.split(/\n/).filter(d => d.length > 0).map(d => (d.split('').map(d => parseInt(d))))
    const sum = []
    data.forEach(d => {
        d.forEach((d, i) => {
            sum[i] = (sum[i] || 0) + d
        })
    })
    const gamma = sum.map(d => (d > data.length / 2 ? 1 : 0)).join('')
    const epsilon = sum.map(d => (d > data.length / 2 ? 0 : 1)).join('')
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

let day3_2 = () => {
    const data = document.body.textContent.split(/\n/).filter(d => d.length > 0).map(d => (d.split('').map(d => parseInt(d))))
    const population = (data) => {
        const sum = []
        data.forEach(d => {
            d.forEach((d, i) => {
                sum[i] = (sum[i] || 0) + d
            })
        })
        return sum.map(d => (d === data.length / 2 ? '-' : d > data.length / 2 ? 1 : 0))
    }
    const filterdata = (data, bitCriteria) => {
        const bitlength = data[0].length
        let bitPopulation
        for (i = 0; i < bitlength; i++) {
            bitPopulation = population(data)
            data = data.filter(d => (bitPopulation[i] === '-' ? d[i] === bitCriteria : bitCriteria === 1 ? d[i] === bitPopulation[i] : d[i] !== bitPopulation[i]))
            if (data.length === 1) break
        }
        return parseInt(data[0].join(''), 2)
    }
    return filterdata(data, 1) * filterdata(data, 0)
}

let day4_1 = () => {
    const input = document.body.textContent.split(/\n\n/).filter(i => i.length > 0)
    const numbers = input.splice(0, 1)[0].split(',').filter(i => i.length > 0).map(i => parseInt(i, 10))
    const boards = input.map(b => {
        return b.split('\n').filter(i => i.length > 0).map(d => (d.match(/.{1,3}/g).map(i => parseInt(i, 10))))
    })
    let haveWinner = false
    let result
    const markNumber = (number) => {
        boards.forEach(board => {
            if (!haveWinner) {
                board.forEach(row => {
                    row.forEach((cell, index) => {
                        if (cell === number) {
                            row[index] = 'X'
                        }
                    })
                })
                if (checkForWin(board)) {
                    haveWinner = true
                    result = getResult(board, number)
                }
            }
        })
    }
    const checkForWin = (board) => {
        const pivotboard = board.map((_, colIndex) => board.map(row => row[colIndex]))
        const checklines = [...board, ...pivotboard]
        return checklines.some(line => {
            return line.every(cell => (cell === 'X'))
        })
    }
    const getResult = (board, lastnumber) => {
        const remainingsum = board.map(row => row.filter(cell => !isNaN(cell)).reduce((a, b) => a + b)).reduce((a, b) => a + b)
        return lastnumber * remainingsum
    }
    numbers.forEach(markNumber)
    return result
}

let day4_2 = () => {
    const input = document.body.textContent.split(/\n\n/).filter(i => i.length > 0)
    const numbers = input.splice(0, 1)[0].split(',').filter(i => i.length > 0).map(i => parseInt(i, 10))
    const boards = input.map(b => {
        return b.split('\n').filter(i => i.length > 0).map(d => (d.match(/.{1,3}/g).map(i => parseInt(i, 10))))
    })
    let wincount = 0
    let result
    const markNumber = (number) => {
        boards.forEach(board => {
            if (!board.won) {
                board.forEach(row => {
                    row.forEach((cell, index) => {
                        if (cell === number) {
                            row[index] = 'X'
                        }
                    })
                })
                if (checkForWin(board)) {
                    board.won = true
                    wincount++
                    if (wincount === boards.length) {
                        result = getResult(board, number)
                    }
                }
            }
        })
    }
    const checkForWin = (board) => {
        const pivotboard = board.map((_, colIndex) => board.map(row => row[colIndex]))
        const checklines = [...board, ...pivotboard]
        return checklines.some(line => {
            return line.every(cell => (cell === 'X'))
        })
    }
    const getResult = (board, lastnumber) => {
        const remainingsum = board.filter(row => Array.isArray(row)).map(row => row.filter(cell => !isNaN(cell)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
        return lastnumber * remainingsum
    }
    numbers.forEach(markNumber)
    return result
}

let day5_1 = () => {
    const input = document.body.textContent.split(/\n/)
        .filter(i => i.length > 0)
        .map(c => c.split(' -> ')
            .map(xy => xy.split(',')
                .map(i => parseInt(i))
            )
        )
    const map = []
    let increment = (map, x, y) => {
        if (!Array.isArray(map[x])) {
            map[x] = []
        }
        if (isNaN(map[x][y])) {
            map[x][y] = 0
        }
        map[x][y]++
    }
    const drawline = (map, coords) => {
        if (coords[0][0] === coords[1][0] || coords[0][1] === coords[1][1]) {
            for (x = Math.min(coords[0][0], coords[1][0]); x <= Math.max(coords[0][0], coords[1][0]); x++) {
                for (y = Math.min(coords[0][1], coords[1][1]); y <= Math.max(coords[0][1], coords[1][1]); y++) {
                    increment(map, x, y)
                }
            }
        }
    }
    input.forEach(coords => {
        drawline(map, coords)
    })
    const result = map.map(row => row.filter(cell => !isNaN(cell) && cell > 1)).reduce((a, b) => a + b.length, 0)
    return result
}

let day5_2 = () => {
    const input = document.body.textContent.split(/\n/)
        .filter(i => i.length > 0)
        .map(c => c.split(' -> ')
            .map(xy => xy.split(',')
                .map(i => parseInt(i))
            )
        )
    const map = []
    let increment = (map, x, y) => {
        if (!Array.isArray(map[x])) {
            map[x] = []
        }
        if (isNaN(map[x][y])) {
            map[x][y] = 0
        }
        map[x][y]++
    }
    const drawline = (map, coords) => {
        let pointer = coords[0]
        while (pointer[0] !== coords[1][0] || pointer[1] !== coords[1][1]) {
            increment(map, pointer[0], pointer[1])
            pointer[0] += (coords[0][0] === coords[1][0] ? 0 : coords[0][0] < coords[1][0] ? 1 : -1)
            pointer[1] += (coords[0][1] === coords[1][1] ? 0 : coords[0][1] < coords[1][1] ? 1 : -1)
        }
        increment(map, pointer[0], pointer[1])
    }
    input.forEach(coords => {
        drawline(map, coords)
    })
    const result = map.map(row => row.filter(cell => !isNaN(cell) && cell > 1)).reduce((a, b) => a + b.length, 0)
    return result
}

let day6_1 = () => {
    const input = document.body.textContent.replace(/\n/,'').split(',').map(i => parseInt(i, 10))
    const days = 80
    for (let i = 0; i < days; i++) {
        input.forEach((value, index) => {
            if (value === 0) {
                input[index] = 6
                input.push(8)
            } else {
                input[index] = value - 1
            }
        })
    }
    return input.length
}

let day6_2 = () => {
    const input = document.body.textContent.replace(/\n/, '').split(',').map(i => parseInt(i, 10))
    const days = 256
    const counts = []
    for(let c = 0; c <= 9; c++) {
        counts[c] = input.filter(i => i === c).length
    }
    for (let i = 0; i < days; i++) {
        const zeroes = counts[0]
        for(let c = 0; c <= 8; c++) {
            counts[c] = counts[c+1]
        }
        counts[6] += zeroes
        counts[8] += zeroes
    }
    return counts.reduce((a, b) => a + b, 0)
}
