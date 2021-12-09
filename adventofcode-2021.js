let day1_1 = () => {
    // map the values to 1 when value increases or 0 when not
    // sum the array values to get the number of increases
    return document.body.textContent.split(/\n/)
        .map((a, i, c) => (parseInt(a) > parseInt(c[i - 1]) ? 1 : 0))
        .reduce((a, b) => (a + b))
}

let day1_2 = () => {
    // map the values to the sum of three values per entry
    // map the values to 1 when value increases or 0 when not
    // sum the array values to get the number of increases
    return document.body.textContent.split(/\n/)
        .map((a, i, c) => (parseInt(c[i - 1]) + parseInt(a) + parseInt(c[i + 1])))
        .map((a, i, c) => (parseInt(a) > parseInt(c[i - 1]) ? 1 : 0))
        .reduce((a, b) => (a + b))
}

let day2_1 = () => {
    // map the commands to coordinate changes
    // reduce the changes to final positions
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
    // map the commands to coordinate changes
    // reduce the changes to final positions using 3rd value for 'aim'
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
    // sum the number of 1s in each column
    const sum = []
    data.forEach(d => {
        d.forEach((d, i) => {
            sum[i] = (sum[i] || 0) + d
        })
    })
    // compare the sum to the data length / 2 to find the most popular bit
    const gamma = sum.map(d => (d > data.length / 2 ? 1 : 0)).join('')
    const epsilon = sum.map(d => (d > data.length / 2 ? 0 : 1)).join('')
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

let day3_2 = () => {
    const data = document.body.textContent.split(/\n/).filter(d => d.length > 0).map(d => (d.split('').map(d => parseInt(d))))
    // sum the number of 1s in each column
    const population = (data) => {
        const sum = []
        data.forEach(d => {
            d.forEach((d, i) => {
                sum[i] = (sum[i] || 0) + d
            })
        })
        return sum.map(d => (d === data.length / 2 ? '-' : d > data.length / 2 ? 1 : 0))
    }
    // filter by bitcriteria
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
    // split the input into the numbers array and the boards array
    // each board is an array of number arrays representing the rows
    const input = document.body.textContent.split(/\n\n/).filter(i => i.length > 0)
    const numbers = input.splice(0, 1)[0].split(',').filter(i => i.length > 0).map(i => parseInt(i, 10))
    const boards = input.map(b => {
        return b.split('\n').filter(i => i.length > 0).map(d => (d.match(/.{1,3}/g).map(i => parseInt(i, 10))))
    })
    let haveWinner = false
    let result
    // for each board, replace the matched number with 'X'
    // check for if the board has won, then stop processing and retrun the result
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
    // create an array with the board rows and the columns by pivoting the board
    // check each line - return true if any line has all Xs
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
    // this time set a 'won' flag to avoid processing a board which has already won
    // keep a count of the number of winners - when the count is equal to the number of boards, return the result
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
    // increment the value of the map at the coordinates
    // if there is no value, set to 0 prior to incrementing
    let increment = (map, x, y) => {
        if (!Array.isArray(map[x])) {
            map[x] = []
        }
        if (isNaN(map[x][y])) {
            map[x][y] = 0
        }
        map[x][y]++
    }
    // check if the line is vertical or horizontal
    // increment the map for each point on the line
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
    // re-written drawline function to handle diagonal lines
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
    // use the input array and update each value per iteration and add new values
    const input = document.body.textContent.replace(/\n/, '').split(',').map(i => parseInt(i, 10))
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
    // calculate the counts of each value in the input array
    // update the counts per iteration to avoid excessive memory usage
    const input = document.body.textContent.replace(/\n/, '').split(',').map(i => parseInt(i, 10))
    const days = 256
    const counts = []
    for (let c = 0; c <= 9; c++) {
        counts[c] = input.filter(i => i === c).length
    }
    for (let i = 0; i < days; i++) {
        const zeroes = counts[0]
        for (let c = 0; c <= 8; c++) {
            counts[c] = counts[c + 1]
        }
        counts[6] += zeroes
        counts[8] += zeroes
    }
    return counts.reduce((a, b) => a + b, 0)
}

let day7_1 = () => {
    const input = document.body.textContent.split(',').filter(i => i.length > 0).map(i => parseInt(i))
    const getTotalFuel = (position, input) => {
        return input.map(p => Math.abs(p - position)).reduce((a, b) => a + b, 0)
    }
    const fuelCosts = []
    // loop through positions and calculate the total fuel cost for each
    for (position = Math.min(...input); position <= Math.max(...input); position++) {
        fuelCosts.push(getTotalFuel(position, input))
    }
    // return the lowest fuel cost
    return Math.min(...fuelCosts)
}

let day7_2 = () => {
    const input = document.body.textContent.split(',').filter(i => i.length > 0).map(i => parseInt(i))
    const getTotalFuel = (position, input) => {
        return input.map(p => {
            const moves = Math.abs(p - position)
            // calculate triangle number for fuel cost
            return (moves * (moves + 1)) / 2
        }).reduce((a, b) => a + b, 0)
    }
    const fuelCosts = []
    for (position = Math.min(...input); position <= Math.max(...input); position++) {
        fuelCosts.push(getTotalFuel(position, input))
    }
    return Math.min(...fuelCosts)
}

let day8_1 = () => {
    // reduce the second part of the inputs to an array of strings
    const input = document.body.textContent.split(/\n/).map(d => d.split(' | ')[1]).reduce((a, b) => `${a} ${b}`).split(' ')
    // map to an array of string lengths
    const lengths = input.map(i => i.length)
    // return the number of entries with specific values
    return lengths.filter(l => [2, 3, 4, 7].includes(l)).length
}

let day8_2 = () => {
    const data = document.body.textContent.split(/\n/).filter(d => d.length > 0)
    // reduce the inputs to an array of strings for signals and values
    const input = data.map(d => {
        const line = d.split(' | ')
        return {
            signals: line[0].split(' '),
            values: line[1].split(' ')
        }
    })
    // return the number of matching characters in two strings
    const countIntersects = (a, b) => { return a.split('').filter(i => b.split('').includes(i)).length }
    // deduce the signal key by analysing the length and intersections of each signal
    const getSignalKey = (signals) => {
        const key = {}
        const one = signals.find(s => s.length == 2)
        key[one] = '1'
        const four = signals.find(s => s.length == 4)
        key[four] = '4'
        const seven = signals.find(s => s.length == 3)
        key[seven] = '7'
        const eight = signals.find(s => s.length == 7)
        key[eight] = '8'
        const six = signals.find(s => s.length == 6 && countIntersects(s, seven) === 2)
        key[six] = '6'
        const nine = signals.find(s => s.length == 6 && countIntersects(s, four) === 4)
        key[nine] = '9'
        const zero = signals.find(s => s.length == 6 && ![nine, six].includes(s))
        key[zero] = '0'
        const three = signals.find(s => s.length == 5 && countIntersects(s, one) === 2)
        key[three] = '3'
        const five = signals.find(s => s.length == 5 && countIntersects(s, six) === 5)
        key[five] = '5'
        const two = signals.find(s => s.length == 5 && countIntersects(s, nine) === 4)
        key[two] = '2'
        return key
    }
    // use the key to transform the values to a single integer
    const decodeValues = (values, key) => {
        const findValue = (value, key) => {
            return key[Object.keys(key).filter(k => k.length === value.length).find(k => countIntersects(k, value) === value.length)]
        }
        return parseInt(values.map(v => findValue(v, key)).join(''))
    }
    return input.map(i => decodeValues(i.values, getSignalKey(i.signals))).reduce((a, b) => a + b, 0)
}

let day9_1 = () => {
    const input = document.body.textContent
    const data = input.split('\n').filter(i=>i.length>0).map(d => d.split('').map(i => parseInt(i, 10)))
    let totalRisk = 0
    const getRisk = (data, x, y) => {
        // test each of the surrounding cells
        const testCoords = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
        const tests = []
        testCoords.forEach(i => {
            if (i[0] >= 0 && i[0] < data[0].length && i[1] >= 0 && i[1] < data.length) {
                if (data[i[1]][i[0]] <= data[y][x]) {
                    //not a low spot
                    tests.push(false)
                } else {
                    //could be a low spot
                    tests.push(true)
                }
            }
        })
        return tests.every(t=>t) ? data[y][x] + 1 : 0
    }
    for (y = 0; y < data.length; y++) {
        for (x = 0; x < data[0].length; x++) {
            totalRisk += getRisk(data, x, y)
        }
    }
    return totalRisk
}

let day9_2 = () => {
    const input = document.body.textContent
    const data = input.split('\n').filter(i => i.length > 0).map(d => d.split('').map(i => parseInt(i, 10)))
    const getTestCoords = (data, x, y) => {
        const testCoords = []
        testCoords.push([x - 1, y])
        testCoords.push([x + 1, y])
        testCoords.push([x, y - 1])
        testCoords.push([x, y + 1])
        return testCoords.filter(i => i[0] >= 0 && i[0] < data[0].length && i[1] >= 0 && i[1] < data.length)
    }
    const isLowPoint = (data, x, y) => {
        // test each of the surrounding cells
        const tests = []
        getTestCoords(data, x, y).forEach(i => {
            if (data[i[1]][i[0]] <= data[y][x]) {
                //not a low spot
                tests.push(false)
            } else {
                //could be a low spot
                tests.push(true)
            }
        })
        return tests.every(t=>t)
    }
    const growBasin = (data, set, x, y) => {
        // if the set already has this cell, return
        if (set.has(`${x}-${y}`)) {
            return set
        }
        //add the point to the set
        set.add(`${x}-${y}`)
        //test each of the surrounding cells
        getTestCoords(data, x, y).forEach(i => {
            if (data[i[1]][i[0]] !== 9) {
                //if not a high point, add to the set
                set = growBasin(data, set, i[0], i[1])
            }
        })
        //return the set
        return set
    }
    const results = []
    let basin;
    for (y = 0; y < data.length; y++) {
        for (x = 0; x < data[0].length; x++) {
            if (isLowPoint(data, x, y)) {
                //grow basin from lowpoint
                basin = growBasin(data, new Set(), x, y)
                //push basin size to results
                results.push(basin.size)
            }
        }
    }
    return results.sort((a, b) => b - a).splice(0,3).reduce((a, b) => a * b)
}
