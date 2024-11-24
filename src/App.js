import "./App.css";
import Main from "./Pages/Main";

function App() {
  console.log(process.env.REACT_APP_BASE_URL, "<==");
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
