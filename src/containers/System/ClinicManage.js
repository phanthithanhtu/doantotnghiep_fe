import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ClinicManage.scss";
import {
    createNewClinic,
    getAllClinic,
    editClinicService,
    deleteClinicService,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";
import ModalClinic from "./ModalClinic";
import ModalEditClinic from "./ModalEditClinic";

class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinics: [],
      isOpenModalClinic: false,
      isOpenModalEditClinic: false,
      clinicEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllClinicsFromReact();
  }

  getAllClinicsFromReact = async () => {
    let response = await getAllClinic("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrClinics: response.clinics,
      });
    }
  };

  handleAddNewClinic = () => {
    this.setState({
      isOpenModalClinic: true,
    });
  };

  toggleClinicModal = () => {
    this.setState({
      isOpenModalClinic: !this.state.isOpenModalClinic,
    });
  };

  toggleClinicEditModal = () => {
    this.setState({
      isOpenModalEditClinic: !this.state.isOpenModalEditClinic,
    });
  };

  createNewClinic = async (data) => {
    try {
      let response = await createNewClinic(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllClinicsFromReact();
        this.setState({
          isOpenModalClinic: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteClinic = async (clinic) => {
    try {
      let res = await deleteClinicService(clinic.id);
      if (res && res.errCode === 0) {
        await this.getAllClinicsFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditClinic = (clinic) => {
    this.setState({
      isOpenModalEditClinic: true,
      clinicEdit: clinic,
    });
  };

  doEditClinic = async (clinic) => {
    try {
      let res = await editClinicService(clinic);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditClinic: false,
        });
        await this.getAllClinicsFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrClinics = this.state.arrClinics;
    return (
      <div className="clinics-container">
        <ModalClinic
          isOpen={this.state.isOpenModalClinic}
          toggleFromParent={this.toggleClinicModal}
          createNewClinic={this.createNewClinic}
        />
        {this.state.isOpenModalEditClinic && (
          <ModalEditClinic
            isOpen={this.state.isOpenModalEditClinic}
            toggleFromParent={this.toggleClinicEditModal}
            currentClinic={this.state.clinicEdit}
            editClinic={this.doEditClinic}
          />
        )}
        <div className="title text-center">MANAGE CLINICS</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={this.handleAddNewClinic}
          >
            <i className="fas fa-plus"></i> Add New Clinic
          </button>
        </div>
        <div className="clinics-table mt-4 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>

              {arrClinics &&
                arrClinics.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditClinic(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteClinic(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
