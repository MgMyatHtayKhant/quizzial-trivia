import "../styles/Questions.scss"


function Questions({elements}) {
    return (
       <div className="questions">
        {
            elements
        }
        <div className="q-btns">
            <button className="btn q-btn">Check answers</button>
        </div>
       </div>
    )
}

export default Questions;