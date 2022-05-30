import React, { Component } from "react";
//import { hot } from 'react-hot-loader/root';
import {isEqual} from 'lodash';

import './sass/app.scss';
import PropTypes from 'prop-types';

class MyWebComponent extends Component {
    state = {
        counter: 0,
        wixconfig: {},
        wixsettings: {}
    };

    onClick = () => {
        this.setState(prevState => {
            return { counter: prevState.counter + 1 };
        });
    };

    constructor(props) {
        super(props);
        this.state = {
          counter: 0,
          wixconfig: JSON.parse(props.wixconfig ||"{}"),
          wixsettings: JSON.parse(props.wixsettings ||"{}"),
          fetchingData: JSON.parse(props.wixconfig||"{}")?.viewMode === "Site"
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(nextProps){
        let newWixConfig = {}
        try{ 
            newWixConfig = JSON.parse(nextProps?.wixconfig ?? '{}') ;
            if(!isEqual(newWixConfig ,this.state.wixconfig)){
                const newProps = {...this.state.wixconfig, ...newWixConfig,}
                this.setState({ ...this.state, wixconfig: newProps, fetchingData : false});
            }else{
                this.setState({ ...this.state, fetchingData : false });
            }
        } catch(error){}
    }
    
    render() {
        return (
            !this.state.fetchingData && 
            <div className="App" style={{backgroundColor: this.state.wixsettings.colorKey}}>
                <h1>This is my web component</h1>
                <p>{`wixconfig instanceId is: ${JSON.stringify(this.state.wixconfig.instanceId)}`}</p>
                <p>{`wixsettings is: ${JSON.stringify(this.state.wixsettings)}`}</p>
                <p>{`wixconfig viewMode is: ${JSON.stringify(this.state.wixconfig.viewMode)}`}</p>
                <p>{`The count now is: ${this.state.counter}`}</p>
                <button onClick={this.onClick}>Click me</button>
            </div>
        );
    }
}

//export default hot(module)(App);
export default MyWebComponent;

MyWebComponent.propTypes = {
    wixconfig: PropTypes.string.isRequired,
    wixsettings: PropTypes.string.isRequired
};