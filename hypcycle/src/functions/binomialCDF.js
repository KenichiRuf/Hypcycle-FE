import factorial from './factorial';

function binomialCDF(trials, successes, p) {
    
    let confidence = 0

    if(successes/trials <= .5) {
        let i = 0
        while(i < successes) {
            let combos = factorial(trials)/(factorial(i)*factorial(trials-i))
            confidence = confidence + combos*(p**i)*((1-p)**(trials-i))
            i++
        }
        return confidence
    } else {
        let i = successes
        while(i <= trials) {
            let combos = factorial(trials)/(factorial(i)*factorial(trials-i))
            confidence = confidence + combos*(p**i)*((1-p)**(trials-i))
            i++
        }
        return (1-confidence)
    }
}

export default binomialCDF