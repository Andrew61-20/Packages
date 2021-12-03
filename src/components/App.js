import React, { Component } from "react";
import * as API from "../services/api.js";
import PackageList from './PackageList';
import RemAdd from './RemAdd';

export default class App extends Component {

    state = {
	    data: null,
        active: null
    };

    componentDidMount () {
        this.loadData()
    };
 
    loadData() {
        API.getAllPackagesItems().then(packages => {
            this.initialData = packages;
            this.setState({
                data: this.initialData
            })
        });
        this.setState({active: null})
    };

    updateData(config) {
        this.setState(config)
    };

    render() {
        return (
            <div className="app container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <RemAdd 
                            data={this.state.data}
                            active={this.state.active}
                            update={this.updateData.bind(this)}
                            load={this.loadData.bind(this)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8 col-md-9 col-lg-10">
                        <PackageList data={this.state.data} active={this.state.active} update={this.updateData.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}
