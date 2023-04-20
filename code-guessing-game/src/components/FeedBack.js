const FeedBack = ({feedBackArray})=>{
    return(
        <div>
            {
                feedBackArray.map((item,index)=>{
                    return(
                        <p>{item}</p>
                    )
                })
            }
        </div>
    )
}
export default FeedBack;