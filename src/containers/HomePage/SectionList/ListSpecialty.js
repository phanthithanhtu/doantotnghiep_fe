import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { getAllSpecialty } from "../../../services/userService";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  appBar: {
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
  menuItem: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  bgImageListSpecialty: {
    width: 100,
    height: 67,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  listSpecialtyName: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  paper: {
    width: "100%",
    height: "100%",
  },
}));

const ListSpecialty = () => {
  const classes = useStyles();
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAllSpecialty = async () => {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        setDataSpecialty(res.data || []);
      }
    };
    fetchAllSpecialty();
  }, []);

  const handleViewDetailSpecialty = (item) => {
    history.push(`/detail-specialty/${item.id}`);
  };

  const handleOnClickBackHome = () => {
    history.push(`/home`);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleOnClickBackHome}
              aria-label="menu"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h5" className={classes.menuTitle}>
              Chuyên khoa
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Paper className={classes.paper}>
        <MenuList id="long-menu">
          {dataSpecialty.map((item, index) => (
            <div key={index} onClick={() => handleViewDetailSpecialty(item)}>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <div
                    className={classes.bgImageListSpecialty}
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </ListItemIcon>
                <Typography
                  variant="inherit"
                  className={classes.listSpecialtyName}
                >
                  {item.name}
                </Typography>
              </MenuItem>
              <Divider />
            </div>
          ))}
        </MenuList>
      </Paper>
    </>
  );
};

export default ListSpecialty;
