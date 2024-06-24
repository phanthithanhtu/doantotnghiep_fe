import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import NotFound from "./System/NotFound";
import VerifyEmail from "./Patient/VerifyEmail";
import ForgotPassword from "./Auth/ForgotPassword";
import RetrievePassword from "./Auth/RetrievePassword";
import ListSpecialty from "./HomePage/SectionList/ListSpecialty";
import ListOutStandingDoctor from "./HomePage/SectionList/ListOutStandingDoctor";
import ListMedicalFacility from "./HomePage/SectionList/ListMedicalFacility";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import indexAdminDashboard from "./AdminDashboard/indexAdminDashboard";
import Profile from "./Patient/Profile";

import { CustomToastCloseButton } from "../components/CustomToast";

const browserHistory = createBrowserHistory();

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route path={path.SIGNUP} exact component={Signup} />
                  <Route
                    path={path.FORGOT_PASSWORD}
                    exact
                    component={ForgotPassword}
                  />
                  <Route
                    path={path.RETRIEVE_PASSWORD}
                    component={RetrievePassword}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                  <Route
                    path={path.LIST_SPECIALTY}
                    exact
                    component={ListSpecialty}
                  />
                  <Route
                    path={path.LIST_MEDICAL_FACILITY}
                    exact
                    component={ListMedicalFacility}
                  />
                  <Route
                    path={path.LIST_OUSTANDING_DOCTOR}
                    exact
                    component={ListOutStandingDoctor}
                  />
                  <Route path={path.PROFILE} component={Profile} />
                  <Route
                    path={path.ADMIN_DASHBOARD}
                    component={userIsAuthenticated(indexAdminDashboard)}
                  />
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              closeButton={<CustomToastCloseButton />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  started: state.app.started,
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
