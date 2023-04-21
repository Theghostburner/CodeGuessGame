const GuessLine=({numberArray,onButtonClick})=>{
    const colorChoose=(item)=>{
        switch(item) {
            case 1:
                return 'red';
            case 2:
                return 'yellow';
            case 3:
                return 'blue';
            case 4:
                return 'green';
            case 5:
                return 'orange';
            case 6:
                return 'violet';
            default:
              return 'white';
          }
    }
    return(
        <div>
        {
            numberArray.map((item,index)=>{return(

                <button style={{ backgroundColor: colorChoose(item) }} className="guessButtons" onClick={()=>onButtonClick(index)}>{""}</button>
            )
            })
        }
        </div>
    )
}
export default GuessLine;