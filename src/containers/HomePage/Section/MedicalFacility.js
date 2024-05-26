import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  sectionShare: {
    marginBottom: theme.spacing(4)
  },
  sectionContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleSection: {
    marginRight: theme.spacing(2)
  },
  btnSection: {
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    border: "none",
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  sectionBody: {
    marginTop: theme.spacing(2)
  },
  clinicChild: {
    cursor: "pointer",
    position: "relative",
    "&:hover $overlay": {
      opacity: 1
    }
  },
  bgImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0,
    transition: "opacity 0.3s ease"
  },
  clinicName: {
    position: "absolute",
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold"
  }
});

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: []
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.data) {
      this.setState({
        dataClinics: res.data ? res.data : []
      });
    }
  }

  handleViewDetailClinic = clinic => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  handleSeeMoreMedicalFacility = () => {
    if (this.props.history) {
      this.props.history.push(`/list-medical-facility`);
    }
  };

  render() {
    const { classes } = this.props;
    const { dataClinics } = this.state;

    return (
      <div className={classes.sectionShare}>
        <Paper elevation={3} className={classes.sectionContainer}>
          <div className={classes.sectionHeader}>
            <span className={classes.titleSection}> Danh sách chi nhánh phòng khám gia đình</span>
            <button
              className={classes.btnSection}
              onClick={this.handleSeeMoreMedicalFacility}
            >
              Xem thêm
            </button>
          </div>
          <div className={classes.sectionBody}>
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => (
                  <div
                    className={`${classes.sectionCustomize} ${classes.clinicChild}`}
                    key={index}
                    onClick={() => this.handleViewDetailClinic(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={classes.bgImage}
                    />
                    <div className={classes.overlay}></div>
                    <div className={classes.clinicName}>{item.name}</div>
                  </div>
                ))}
            </Slider>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility))
);
