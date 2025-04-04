import Dashboard from "./Pages/dashboard";
import "./App.css"
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/SignIn";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
 function App(){

  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/signup" element={<SignUp/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;