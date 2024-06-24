import React, { Component } from "react";
import { Navigate  } from "react-router-dom";
import { connect } from "react-redux";
import { LANGUAGES, USER_ROLE } from "../utils";

class Home extends Component {
  render() {
    const { isLoggedIn, userInfo } = this.props;
    let linkToRedirect =
      isLoggedIn && userInfo.roleId !== USER_ROLE.PATIENT
        ? "/admin-dashboard"
        : "/home";

    return <Navigate  to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
