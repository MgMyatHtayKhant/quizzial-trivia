import Start from "./components/Start";
import Questions from "./components/Questions";
import Loading from "./components/Loading";
import "./App.scss";

function App() {

  return (
    <>
      <div className="container">
      <Questions />
      </div>
      {/* <Loading /> */}
    </>
  );
}

export default App;
