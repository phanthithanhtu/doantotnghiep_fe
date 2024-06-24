import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { fetchAllDoctors } from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  root2: {
    width: "100vw",
    height: "100vh",
  },
  menu: {
    backgroundColor: "#ffffff",
    color: "#3c3c3c",
    boxShadow: "none",
  },
  menuTitle: {
    flex: 1,
    fontSize: 20,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  bgImageListSpecialty: {
    width: 100,
    height: 67,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  listSpecialtyName: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));

const ListOutStandingDoctor = () => {
  const classes = useStyles();
  const [arrDoctors, setArrDoctors] = useState([]);

  const allDoctors = useSelector((state) => state.admin.allDoctors);
  const language = useSelector((state) => state.app.language);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  useEffect(() => {
    setArrDoctors(allDoctors);
  }, [allDoctors]);

  const handleViewDetailDoctor = (doctor) => {
    history.push(`/detail-doctor/${doctor.id}`);
  };

  const handleOnClickBackHome = () => {
    history.goBack();
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.menu}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleOnClickBackHome}
              aria-label="menu"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h6" className={classes.menuTitle}>
              Bác sĩ
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Paper className={classes.root2}>
        <MenuList id="long-menu">
          {arrDoctors.map((item, index) => {
            let imageBase64 = item.image ? Buffer.from(item.image, "base64").toString("binary") : "";
            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
            let specialtyName = item.Doctor_Infor?.specialtyData?.name || "";

            return (
              <div key={index} onClick={() => handleViewDetailDoctor(item)}>
                <MenuItem>
                  <ListItemIcon>
                    <div
                      className={classes.bgImageListSpecialty}
                      style={{ backgroundImage: `url(${imageBase64})` }}
                    ></div>
                  </ListItemIcon>
                  <div className={classes.content}>
                    <Typography variant="inherit" className={classes.listSpecialtyName}>
                      {language === LANGUAGES.VI ? nameVi : nameEn}
                    </Typography>
                    <Typography variant="inherit" className={classes.listSpecialtyName}>
                      {specialtyName}
                    </Typography>
                  </div>
                </MenuItem>
                <Divider />
              </div>
            );
          })}
        </MenuList>
      </Paper>
    </>
  );
};

export default ListOutStandingDoctor;
