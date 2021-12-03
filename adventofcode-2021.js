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
    const data = document.body.textContent.split(/\n/).filter(d=>d.length > 0).map(d=>(d.split('').map(d=>parseInt(d))))
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
    const data = document.body.textContent.split(/\n/).filter(d=>d.length > 0).map(d=>(d.split('').map(d=>parseInt(d))))
    const population = (data) => {
        const sum = []
        data.forEach(d => {
            d.forEach((d, i) => {
                sum[i] = (sum[i] || 0) + d
            })
        })
        return sum.map(d => (d===data.length / 2 ? '-' : d > data.length / 2 ? 1 : 0 ))
    }
    const filterdata = (data, bitCriteria) => {
        const bitlength = data[0].length
        let bitPopulation
        for (i = 0; i < bitlength; i++) {
            bitPopulation = population(data)
            data = data.filter(d => (bitPopulation[i]==='-' ? d[i]===bitCriteria : bitCriteria === 1 ? d[i] === bitPopulation[i] : d[i] !== bitPopulation[i]))
            if(data.length === 1) break
        }
        return parseInt(data[0].join(''), 2)
    }
    return filterdata(data, 1) * filterdata(data,0)
}