import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

class Specialty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data.slice(0, 12) : [], // Limiting to 10 items
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  handleClickSeeMoreSpecialty = () => {
    this.props.history.push(`/list-specialty`);
  };

  render() {
    let { dataSpecialty } = this.state;

    return (
      <Box className="custom-section-share custom-section-specialty">
        <Box className="custom-section-container">
          <Box className="custom-section-header">
            <Typography variant="h4" className="custom-title-section">
              <FormattedMessage id="homepage.specialty-popular" />
            </Typography>
            <Button
              variant="contained"
              className="custom-btn-section"
              onClick={this.handleClickSeeMoreSpecialty}
            >
              <FormattedMessage id="homepage.more-infor" />
            </Button>
          </Box>
          <Box className="custom-section-body">
            <Grid container spacing={1}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <Card
                      className="custom-specialty-card"
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <Box className="custom-image-container">
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          className="custom-specialty-image"
                        />
                        <Box className="custom-overlay"></Box>
                      </Box>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {item.name}
                        </Typography>
                      </CardContent>
                      <div class="custom-view-icon">
  <VisibilityIcon />
</div>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
