// import logo from "logo.svg";
import "App.css";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode } from "react";
import Sleep from "components/Sleep/Sleep";
import Navbar from "components/Navbar";
import { useState, useEffect } from "react";
import API from "services/API";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    plu();
  }, []);
  async function plu() {
    const tok = localStorage.getItem("life-tracker-jwt");
    const { data, error } = await API.getLocalUser(tok);
    if (data) {
      setUser(data.user);
      // console.log(data.user);
    }
  }

  return (
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Navbar user={user} setUser={setUser}></Navbar>
          <Routes>
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/register"
              element={<Register user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/sleep"
              element={<Sleep user={user} setUser={setUser} />}
            ></Route>
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit <code>src/App.js</code> and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </header>
  // </div>
}

export default App;
