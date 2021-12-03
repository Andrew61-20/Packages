import React, {Component} from "react";
import * as API from "../services/api.js";
import FormFilterAddModal from "./FormFilterAddModal";
export default class RemChanAdd extends Component {

state = {
   isOpenFilterModal: false,
   isOpenAddModal: false
}
  
openFilterModal = () => this.setState({ isOpenFilterModal: true, isOpenAddModal: false});

openAddModal = () => {
    const {load} = this.props;
    load();
    this.setState({ isOpenAddModal: true, isOpenFilterModal: false});
}

closeModal = () => {
    const {load} = this.props;
    load();
    this.setState({ isOpenAddModal: false, isOpenFilterModal: false });
}

rem = (active) => {
    const {data, update} = this.props
    const ind = data.find(item => item.id === active.id)
    if (ind) {
        API.deletePckgItem(active.id).then(isOk => {
            if (!isOk) return;
            update ({
                data: data.filter(pckg => pckg.id !== active.id),
                active: null
            });
        });
    };
};

render() {
    const { isOpenFilterModal, isOpenAddModal } = this.state;
    const { data, active, load, update } = this.props;
    return (
        <div className="toolbar">
            {active !== null ? <button className="btn btn-default" onClick={() => this.rem(data[active])}> 
                Удалить
            </button> :
            <button disabled className="btn btn-default">
                Удалить
            </button>}
            <button className="btn btn-default" onClick={() => this.openFilterModal()}>
                Фильтрация
            </button>
            <button className="btn btn-default" onClick={() => this.openAddModal()}>
                Добавление
            </button>
                {(isOpenFilterModal || isOpenAddModal) && 
                (<FormFilterAddModal
                   isOpenFilterModal={isOpenFilterModal}
                   isOpenAddModal={isOpenAddModal}
                   closeModal={this.closeModal}
                   data={data}
                   update={update}
                   load={load}
                />)}
        </div>
    )
}}