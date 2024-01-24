import "../styles/Questions.scss"


function Questions(props) {
    return (
       <div className="questions">
        {
            props.elements
        }
        <div className="q-btns" style={{justifyContent: props.check ? "flex-end" : null}}>
           {
            props.check ? (
                <>
                <p className="score-description">You score {props.score}/5 correct answers</p>
                <button className="btn q-btn"
                onClick={() => {
                    props.setPlayTimes(prevTimes => prevTimes + 1);
                    props.dispatch({check: false});
                }}
                >Play again</button>
                </>
            ) :  <button 
            className="btn q-btn"
            onClick={() => props.dispatch({check: true})}
            >Check answers</button>
           }
        </div>
       </div>
    )
}

export default Questions;