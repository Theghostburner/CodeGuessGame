const GuessLine=({numberArray,onButtonClick})=>{
    return(
        <div>
        {
            numberArray.map((item,index)=>{return(
                <button className="guessButtons" onClick={()=>onButtonClick(index)}>{item}</button>
            )
            })
        }
        </div>
    )
}
export default GuessLine;