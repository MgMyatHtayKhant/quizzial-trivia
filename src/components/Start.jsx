import "../styles/Start.scss"

function Start(props) {
    return (
      <div className="start-page">
        <h1 className="title">Quizzical</h1>
        <p className="description">
        Some description if needed
        </p>
        <button onClick={() => props.dispatch({loading: true, start: true})} className="btn start-btn">Start quiz</button>
      </div>
    )
}

export default Start;