import "../styles/Loading.scss"

const Loading = (props) => {

  const styles = {
    display: props.loading ? "flex" : "none",
  }

  return (
    <div style={styles} className="loading">
         <div className="loader"></div>
    </div>
  )
}

export default Loading