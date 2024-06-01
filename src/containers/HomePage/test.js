import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions/appActions";
import { LANGUAGES } from "../../utils";
import MenuHomeHeader from "./MenuHomeHeader";
import HomeMenuSearchSpecialty from "./HomeMenuSearchSpecialty";
import Slide from "./slide";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  constructor() {
    super();

    this.state = {
      showMenuSearchSpecialty: false,
      isScrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    const isScrolled = scrollTop > 50;

    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }
  };

  handleClickShowHomeMenuSearchSpecialty = () => {
    this.setState({
      showMenuSearchSpecialty: !this.state.showMenuSearchSpecialty,
    });
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
      window.location.reload();
    }
  };

  render() {
    const { language, isShowBanner } = this.props;
    const { isScrolled, showMenuSearchSpecialty } = this.state;

    const popularMovies = [
      {
        backgroundURL:
          "https://t3.ftcdn.net/jpg/01/43/71/22/240_F_143712208_CWBM4PQpcIuxC3XnlSWn52ILR0YXUrWW.jpg",
        title: "ảnh1",
      },
      {
        backgroundURL:
          "https://t4.ftcdn.net/jpg/06/52/05/07/240_F_652050743_AzwU88c7oKphrC4gj1Rm1KN5Iq3apPAm.jpg",
        title: "ảnh2",
      },
      {
        backgroundURL:
          "https://t3.ftcdn.net/jpg/03/01/96/40/240_F_301964016_dqEfQrVE4rlqaI6aSNxBFUCASzJBu6nN.jpg",
        title: "ảnh3",
      },
    ];

    return (
      <div>
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
                <div
                  className="search"
                  onClick={this.handleClickShowHomeMenuSearchSpecialty}
                >
                  <i className="fas fa-search"></i>
                  <FormattedMessage id="banner.search">
                    {(placeholder) => (
                      <input
                        type="text"
                        placeholder={placeholder}
                      />
                    )}
                  </FormattedMessage>

                  {showMenuSearchSpecialty && (
                    <HomeMenuSearchSpecialty
                      showMenuSearchSpecialty={showMenuSearchSpecialty}
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
                  language === LANGUAGES.EN
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
        {isShowBanner && <Slide popularMovies={popularMovies} />}
      </div>
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
