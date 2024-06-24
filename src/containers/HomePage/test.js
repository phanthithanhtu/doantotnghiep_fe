import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../store/actions/appActions";
import { LANGUAGES } from "../../utils";
import MenuHomeHeader from "./MenuHomeHeader";
import HomeMenuSearchSpecialty from "./HomeMenuSearchSpecialty";
import Slide from "./slide";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import "./HomeHeader.scss";

const HomeHeader = ({ language, isShowBanner, popularMovies, changeLanguageAppRedux }) => {
  const [showMenuSearchSpecialty, setShowMenuSearchSpecialty] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickShowHomeMenuSearchSpecialty = () => {
    setShowMenuSearchSpecialty(!showMenuSearchSpecialty);
  };

  const changeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };

  const returnToHome = () => {
    navigate("/home");
    window.location.reload();
  };

  return (
    <div className={`home-header-container ${isScrolled ? "black-bg" : ""}`}>
      <div className="home-header-content">
        <div className="left-content">
          <a href="/home" className="logo-link">
            <div className="menu-home-header">
              <MenuHomeHeader />
            </div>
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
      {isShowBanner && <Slide popularMovies={popularMovies} />}
    </div>
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
