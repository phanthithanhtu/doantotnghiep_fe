import React, { useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import MenuHomeHeader from "./MenuHomeHeader";
import HomeMenuSearchSpecialty from "./HomeMenuSearchSpecialty";
import Slide from "./slide";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

import "./HomeHeader.scss";

const HomeHeader = ({ language, changeLanguageAppRedux, isShowBanner, popularMovies }) => {
  const [showMenuSearchSpecialty, setShowMenuSearchSpecialty] = useState(false);
  const navigate = useNavigate();

  const handleClickShowHomeMenuSearchSpecialty = () => {
    setShowMenuSearchSpecialty(!showMenuSearchSpecialty);
  };

  const changeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };

  return (
    <>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <div className="menu-home-header">
              <MenuHomeHeader />
            </div>
            <a href="/home" className="logo-link">
              <div className="header-logo"></div>
            </a>
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
              <div className="search" onClick={handleClickShowHomeMenuSearchSpecialty}>
                <i className="fas fa-search"></i>
                <FormattedMessage id="banner.search">
                  {(placeholder) => <input type="text" placeholder={placeholder} />}
                </FormattedMessage>
                {showMenuSearchSpecialty && (
                  <HomeMenuSearchSpecialty showMenuSearchSpecialty={showMenuSearchSpecialty} />
                )}
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="support">
              <i className="fas fa-question-circle"></i>
              <FormattedMessage id="homeheader.support" />
            </div>
            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
              <span onClick={() => changeLanguage(LANGUAGES.VI)}>VN</span>
            </div>
            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
              <span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span>
            </div>
          </div>
        </div>
      </div>
      {isShowBanner && <Slide popularMovies={popularMovies} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  userInfo: state.user.userInfo,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
