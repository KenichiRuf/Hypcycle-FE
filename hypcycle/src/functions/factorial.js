function factorial(n) {
    let product = 1
    let i = 1

    if(n === 0) {
        return 1
    } else if (n < 0) {
        return undefined
    } else {
        while(i <= n) {
            product = product * i
            i++
        }
    
        return product
    }
}

export default factorial