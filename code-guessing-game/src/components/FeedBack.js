const FeedBack = ({feedBackArray})=>{
    return(
        <div>
            {
                feedBackArray.map((item,index)=>{
                    return(
                        <button>{item}</button>
                    )
                })
            }
        </div>
    )
}
export default FeedBack;