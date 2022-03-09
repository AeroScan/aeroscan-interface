import React from 'react';
import { BrowserRouter as Router, Route , Routes, Navigate} from "react-router-dom";
import Login from '../pages/login';
import MainContent from '../pages/main';
import { RetrieveToken } from '../services/util';

const PrivateRoute = ({ children }) => {  
    return RetrieveToken() ? children : <Navigate to="login"/>
}

const ProjectRoutes = () => {
    return(
     
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<PrivateRoute> <MainContent/> </PrivateRoute>}/>                
            </Routes>
        </Router>

    );
}

export default ProjectRoutes;