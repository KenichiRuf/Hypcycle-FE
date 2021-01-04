import {factorial, erf, sqrt} from 'mathjs';

function binomialCDF(trials, successes, p) {
    
    if(trials>170) {
        const z = (successes - trials*p)/sqrt(trials*p*(1-p))
        return (1+erf(z/sqrt(2)))/2
    } else {
        let i = 0
        let confidence = 0
        while(i < successes) {
            confidence = confidence + factorial(trials)/(factorial(i)*factorial(trials-i))*(p**i)*((1-p)**(trials-i))
            i = i + 1
        }
        return confidence
    }
}

export default binomialCDF