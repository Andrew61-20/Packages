import React, { Component } from 'react';
import * as API from "../services/api.js";
import "./FormFilterAddModal.css";

const INITIAL_STATE = {
  number: "",
  status: "in process",
  location: "",
  count: 0
 }

export default class FormFilterAddModal extends Component {
  
  state = { ...INITIAL_STATE   };
   
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  };

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.closeModal();
  };

  handleSearch = (status, number, e) => {
    const {data, update, load} = this.props;
    if (number === "") {load()};
    const filter = data.filter(pckg => {
        return pckg.number.includes(number.trim()) &&
              pckg.status.includes(status)
      });
    update ({
      data: filter,
      active: null
    })
  }

  addItem = (newData) => {
    const {load} = this.props;
    API.addPckgItem(newData).then(responseNewData => {
      load()
    })
  }

  handleSubmit = (newData, e) => {
    const { closeModal} = this.props;
    closeModal();
    e.preventDefault();
    if(newData.number.length < 1) {alert("Есть незаполненные поля !"); return} else
    if(newData.location.length < 1) {alert("Есть незаполненные поля !"); return} else this.addItem(newData);
  }

  handleChangeNumber = (e) => {
    const {load} = this.props;
    const pattern = /.{0,10}/
    this.setState({number: String(e.target.value.match(pattern))});
    load();
  }

  handleAddStatus = () => {
    const {load} = this.props;
    const sel = document.getElementById("status");
    this.setState({status: sel.options[sel.selectedIndex].text});
    load();
  }

  handleChangeLocation = (e) => {
    const pattern = /.{0,30}/
    this.setState({location: String(e.target.value.match(pattern))})
  }

  handleChangeCount = (e) => {
    const pattern = /\d{1,3}/
    this.setState({count: Number(e.target.value.match(pattern))})
  }

  render() {
    const { isOpenAddModal, closeModal, isOpenFilterModal } = this.props;
    const {number, status, location, count } = this.state;
    return ( 
      <div>
        <form className="formcl" onSubmit={e => this.handleSubmit({number, status, location, count}, e)}>   
          <input
            type="text"
            name="number"
            value={number}
            onChange={e => this.handleChangeNumber(e)}
            placeholder="Number"
          />
          <br/>
          <span>Status</span>
          <select id="status" size="1" onChange={this.handleAddStatus}>
            <option value={status} defaultValue="selected">in process</option>
            <option value={status}>success</option>
            <option value={status}>failed</option>
          </select>
          <br/>
          {isOpenAddModal && <input
            type="text"
            name="location"
            value={location}
            onChange={e => this.handleChangeLocation(e)}
            placeholder="Location"
          />}
          <br/>
          {isOpenAddModal && <input
            type="number"
            name="count"
            min="1"
            max="100"
            value={count}
            onChange={e => this.handleChangeCount(e)}
            placeholder="Count"
          />}
          <br/>
          <button className="btcl" type="button" onClick={closeModal}>
            Закрыть
          </button>
          {isOpenAddModal && <button className="btcl" type="submit">
            Добавить
          </button>}
          {isOpenFilterModal && <button className="btcl" type="button" onClick={e => this.handleSearch(status, number, e)}>
            Фильтровать
          </button>}
        </form>
      </div>
    );
  };
}