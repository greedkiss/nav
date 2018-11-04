import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import style from './wrapper.scss';

import { BackTop } from 'antd';
import { Popover } from 'antd';

import routes from '@/routes';

class Wrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            scroll: this.props.match.path != '/'
        }
        this.hide = this.hide.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.changeScroll = this.changeScroll.bind(this);
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.scrollEvent());
    }

    changeScroll() {
        if (this.props.match.path != '/' || (this.refs.main && this.refs.main.getBoundingClientRect().top < 0)) {
            this.setState({
                scroll: true
            })
        }else {
            this.setState({
                scroll: false
            })
        }
    }

    scrollEvent() {
        // var timer = null;
        return () => {
            this.changeScroll();
            // clearTimeout(timer)
            // timer = setTimeout(this.changeScroll, 30);
        }  
    }

    hide() {
        this.setState({
            visible: false
        })
    }

    handleVisibleChange(visible) {
        this.setState({ visible });
    }
    
    
    render() {
        const nav = routes.map((nav, index) => {
            if(!nav.meta.hide) {
                return <Link to={nav.path} key={index} onClick={this.hide}><li>{nav.meta.title}</li></Link>
            }
        });       
        const mobileNav = (
            <ul className="mobile-nav"> {nav} </ul>
        )


        return (
            <div id="wrapper">
                <div className={this.state.scroll ? "header" : "header transparent"}>
                    <div className="container">
                        <div className="logo">
                            <Link to="/">
                                <img src={require('@/images/logo.png')} />
                                <font>沸点工作室</font>
                            </Link>
                        </div>
                        <div className="header-nav">
                            <Popover 
                                content={mobileNav} 
                                visible={this.state.visible} 
                                onVisibleChange={this.handleVisibleChange}
                                trigger="click" placement="bottomRight">
                                <i className="iconfont icon-menu2 mobile-button"></i>
                            </Popover>
                            <ul className="normal-nav"> {nav} </ul>
                        </div>
                    </div>
                </div>

                <div id="main" ref="main">
                    {this.props.children}
                </div>

                <div id="footer">
                    <div className="container">
                        <p>Copyright © 2018 沸点工作室 All rights reserved.</p>
                        
                    </div>
                </div>
                {/* <i className="iconfont icon-arrow-up backtotop"></i> */}
                <BackTop>
                    <i className="iconfont icon-arrow-up backtotop"></i>
                </BackTop>
            </div>
        )
    }
};

export default withRouter(Wrapper);
