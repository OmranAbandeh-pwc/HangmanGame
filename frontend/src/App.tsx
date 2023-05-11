import GameResult from "./components/GameResult";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage"
import GuessingPage from "./pages/GuessingPage";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";



function App() {
  return (

    <>
    <Routes>
      <Route path="/" element={localStorage.getItem("userToken")? <Home/> :<LoginPage/>}/>
      <Route path="/signuppage" element={<SignupPage/>}/>
      
    </Routes>
    </>
  );
}

export default App;
