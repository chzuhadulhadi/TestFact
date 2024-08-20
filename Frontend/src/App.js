import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
      />
      <Router />
    </BrowserRouter>
  );
}

export default App;
