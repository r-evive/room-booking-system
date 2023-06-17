import React from 'react'
import {Col, Container, Row} from 'react-bootstrap';
import LoginPage from '../LoginPage/LoginPage';
import {BrowserRouter as Router,Routes,Route,Link, Navigate} from "react-router-dom";
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import Dashboard from '../Dashboard/Dashboard';
import { Wrapper } from './Main.styled';
import GlobalStyle from '../GlobalStyles';
import Rooms from '../Rooms/Rooms';
import Resources from '../Resources/Resources';
import AddResource from '../Resources/AddResource/AddResource';
import Reservations from '../Reservations/Reservations';
import Settings from '../Settings/Settings';

const Main = () => {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <Wrapper>
        <Router>
            <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route exact path="/" element={<PrivateRoute><Rooms/></PrivateRoute>}/>
              <Route exact path="/reservations" element={<PrivateRoute><Reservations/></PrivateRoute>}/>
              <Route exact path="/resources" element={<PrivateRoute><Resources/></PrivateRoute>}/>
              <Route exact path="/resources/add" element={<PrivateRoute><AddResource/></PrivateRoute>}/>
              <Route exact path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>
              <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>

      </Wrapper>
    </React.Fragment>

  )
}

export default Main