

import "./OutStandingDoctor.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import Slider from "react-slick";
import { Box, Button, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorList: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        doctorList: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDoctorDetail = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  handleSeeMoreDoctors = () => {
    if (this.props.history) {
      this.props.history.push(`/list-outstanding-doctor`);
    }
  };

  render() {
    let { doctorList } = this.state;
    let { language } = this.props;

    return (
      <Box className="outstanding-doctor-section">
        <Box className="outstanding-doctor-container">
          <Box className="outstanding-doctor-header">
            <Typography variant="h4" className="outstanding-doctor-title">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </Typography>
            <Button
              variant="contained"
              className="outstanding-doctor-btn"
              onClick={this.handleSeeMoreDoctors}
            >
              <FormattedMessage id="homepage.more-infor" />
            </Button>
          </Box>
          <Box className="outstanding-doctor-body">
            <Slider {...this.props.settings}>
              {doctorList &&
                doctorList.length > 0 &&
                doctorList.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <Box
                      className="outstanding-doctor-item"
                      key={index}
                      onClick={() => this.handleViewDoctorDetail(item)}
                    >
                      <Box className="outstanding-doctor-item-border">
                        <Box className="outstanding-doctor-item-bg">
                          <Box
                            className="outstanding-doctor-bg-image"
                            sx={{
                              backgroundImage: `url(${imageBase64})`,
                              '&:hover': {
                                transform: 'scale(4.05)',
                                transition: 'transform 0.5s ease-in-out',
                              },
                            }}
                          ></Box>
                            <Box className="outstanding-doctor-overlay">
                            <CalendarTodayIcon className="outstanding-doctor-icon" />
                          </Box>
                        </Box>
                        <Box className="outstanding-doctor-position text-center">
                          <Typography>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </Typography>
                          <Typography>
                            {item.Doctor_Infor &&
                            item.Doctor_Infor.specialtyData &&
                            item.Doctor_Infor.specialtyData.name
                              ? item.Doctor_Infor.specialtyData.name
                              : ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Slider>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);

