import React from 'react';
import { Row, Col } from 'antd';
import NavLeft from '../src/components/NavLeft';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Home from '../src/pages/Home';
import './style/common.less';
export default class Admin extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
            <NavLeft />
        </Col>
        <Col span={21} className="main">
            <Header/>
            <Row className="content">
                <Home></Home>
            </Row>
            <Footer/>
        </Col>
      </Row>
    )
  }
}