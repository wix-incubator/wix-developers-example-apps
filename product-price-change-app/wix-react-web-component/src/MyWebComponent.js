import React, { Component } from "react";
//import { hot } from 'react-hot-loader/root';
import { isEqual } from 'lodash';

import './sass/app.scss';
import PropTypes from 'prop-types';

class MyWebComponent extends Component {
    state = {
        counter: 0,
        buyersCount: undefined,
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
        this.baseURI = `http://localhost:8080/api/buyers-count-delta`
        this.state = {
            counter: 0,
            wixconfig: JSON.parse(props.wixconfig || "{}"),
            wixsettings: JSON.parse(props.wixsettings || "{}"),
            fetchingData: JSON.parse(props.wixconfig || "{}")?.viewMode === "Site"
        };
    }

    registerListener = async () => {
        window.wixDevelopersAnalytics.register('head',
            async (eventName, eventParams) => {
                if (eventName === "productPageLoaded") {
                    const res = await this.getProductBuyersCount(eventParams.productId)
                    const json = await res.json()
                    console.log(json.buyersCount)
                    this.setState({ ...this.state, buyersCount: String(json.buyersCount) })
                }
            })

    }

    async getProductBuyersCount(productId) {
        return await fetch(`${this.baseURI}?instanceId=${this.state.wixconfig.instanceId}&productId=${productId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/jsons' }
        });

    }

    async componentDidMount() {
        if (window.wixDevelopersAnalytics) {
            this.registerListener();
        } else {
            window.addEventListener('wixDevelopersAnalyticsReady', this.registerListener);
        }
    }

    componentDidUpdate(prevProps) {
        let wixconfig = JSON.parse(this.props?.wixconfig)
        if (!isEqual(JSON.parse(prevProps.wixconfig), wixconfig)) {
            this.setState({ wixconfig });
        }
    }

    render() {
        return (
            ((!this.state.fetchingData && (this.state.buyersCount)) || this.state.wixconfig.viewMode == "Editor") &&
            <div className="App" style={{ backgroundColor: this.state.wixsettings.colorKey }}>
                <h1> #{this.state.buyersCount} People Loved and bought this product! </h1>
            </div>
        );
    }
}

export default MyWebComponent;

MyWebComponent.propTypes = {
    wixconfig: PropTypes.string.isRequired,
    wixsettings: PropTypes.string.isRequired
};