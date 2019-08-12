import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="footer">
        <ul>
          <NavLink activeClassName="active" to="/home">首页</NavLink>
          <NavLink activeClassName="active" to="/submit">我的</NavLink>
        </ul>
        <NavLink className="footer-submit" to="/submit"><span className="iconfont icon-tianjia"></span></NavLink>
      </div>
    );
  }
}

export default Footer;