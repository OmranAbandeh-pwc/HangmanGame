


export type ResponseObject = {
    msg:boolean;
    letterIndex:any;
    guessedLetter:string;
}

export type ResultObject = {
    showResult:boolean,
    failsNumber:number,
    successNumber:number,
    resultText:string
}

export type StartGameData = {
    wordLength:number,
    wordId:number,
    wordScore:number,
    loading:boolean,
    showGuessingPage:boolean
}