export function evalFraction(fraction:string) {
    const [numerator, denominator] = fraction.split("/");
    return Number(numerator) / Number(denominator);
}