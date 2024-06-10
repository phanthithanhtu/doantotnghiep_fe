import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../../../containers/AdminDashboard/components/Page";
import Label from "../../../containers/AdminDashboard/components/Label";
import Scrollbar from "../../../containers/AdminDashboard/components/Scrollbar";
import Iconify from "../../../containers/AdminDashboard/components/Iconify";
import SearchNotFound from "../../../containers/AdminDashboard/components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../../containers/AdminDashboard/sections/@dashboard/user";

import { USER_ROLE, USER_POSITION } from "../../../utils";
import { sentenceCase } from "change-case";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "academicDegree", label: "Academic Degree", alignRight: false },
  { id: "" },
];
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <React.Fragment>


        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead     
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                  {arrUsers.map((row) => {
                    const {
                      address,
                      email,
                      firstName,
                      gender,
                      id,
                      image,
                      lastName,
                      phonenumber,
                      positionId,
                      roleId,
                      createdAt,
                    } = row;
                    let imageBase64 = "";
                    if (image) {
                      imageBase64 = new Buffer(image, "base64").toString(
                        "binary"
                      );
                    }
                    let name = "";
                    if (lastName !== null && firstName != null) {
                      name = `${lastName} ${firstName}`;
                    }
                    if (lastName !== null && firstName == null) {
                      name = `${lastName}`;
                    }
                    if (lastName == null && firstName !== null) {
                      name = `${firstName}`;
                    }

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={firstName} src={imageBase64} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">
                          {roleId === USER_ROLE.ADMIN ? (
                            <Label variant="ghost" color={"success"}>
                              {sentenceCase("ADMIN")}
                            </Label>
                          ) : roleId === USER_ROLE.DOCTOR ? (
                            <Label variant="ghost" color={"info"}>
                              {sentenceCase("DOCTOR")}
                            </Label>
                          ) : roleId === USER_ROLE.PATIENT ? (
                            <Label variant="ghost" color={"warning"}>
                              {sentenceCase("PATIENT")}
                            </Label>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left">
                          {positionId === USER_POSITION.BACHELOR
                            ? "Cử nhân"
                            : positionId === USER_POSITION.MASTER
                            ? "Thạc sĩ"
                            : positionId === USER_POSITION.DOCTOR
                            ? "Tiến sĩ"
                            : positionId === USER_POSITION.ASSOCIATE_PROFESSOR
                            ? "Phó giáo sư"
                            : positionId === USER_POSITION.PROFESSOR
                            ? "Giáo sư"
                            : "None"}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(row)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(row)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
