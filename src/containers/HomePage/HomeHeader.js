import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

import MenuHomeHeader from "./MenuHomeHeader";
import HomeMenuSearchSpecialty from "./HomeMenuSearchSpecialty";
import { emitter } from "../../utils/emitter";
import { Alert } from "reactstrap";
import Search from "./Search";
import Slide from "./slide";
class HomeHeader extends Component {
  constructor() {
    super();

    this.state = {
      showMenuSearchSpecialty: false,
    };
  }
  handleClickShowHomeMenuSearchSpecialty = () => {
    this.setState({
      showMenuSearchSpecialty: !this.state.showMenuSearchSpecialty,
    });
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event: action
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let language = this.props.language;
    const popularMovies = [
      {
        backgroundURL:
"https://medlatec.vn/Landing/58/assets/images/banner-desktop.png" ,
       title: "ảnh1",
      },
      {
        backgroundURL:
"https://medlatec.vn/media/40680/catalog/banner+web+KSK+TQ-01+1+(2).png?size=2048"   ,
     title: "ảnh2",
      },
      {
        backgroundURL:
"https://medlatec.vn/media/24749/catalog/Website+banner.png?size=2048",      title: "ảnh3",
      },
    ];


    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              {/* <i className="fas fa-bars"></i> */}
              <div className="menu-home-header">
                <MenuHomeHeader />
              </div>
              <div
                className="header-logo"
                onClick={() => {
                  this.returnToHome();
                }}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div
                  className="search"
                  onClick={() => this.handleClickShowHomeMenuSearchSpecialty()}
                >
                  <i className="fas fa-search"></i>
                  <FormattedMessage id="banner.search">
                    {(placeholder) => (
                      <input type="text" placeholder={placeholder} />
                    )}
                  </FormattedMessage>

                  {this.state.showMenuSearchSpecialty && (
                    <HomeMenuSearchSpecialty
                      showMenuSearchSpecialty={this.state.showMenuSearchSpecialty}
                    />
                  )}
                </div>
              </div>

            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN //bien language duoc khai bao ben tren
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
         <Slide popularMovies={popularMovies} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
