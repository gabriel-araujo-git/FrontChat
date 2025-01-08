import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import App from '../molecules/ChatExterno/App';


const AppRouter = () => { 
    return (
        <Router>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/chat-externo" element={<App />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
