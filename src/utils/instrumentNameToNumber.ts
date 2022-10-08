export function instrumentNameToNumber(name:string) {
    //split the instrument name at - and use [0]. this will allow for voices to be labeld piano-1?
    if(name === "Clarinet") return 757;
    else return 4;
}