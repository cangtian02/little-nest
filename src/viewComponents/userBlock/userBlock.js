import React from 'react';
import './userBlock.css';

class Userblock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="userBlock">
        <div className="userBlock-top">
          <img src="./img/pic.jpg" className="l" alt="" />
          <div className="c">
            <div className="t">用户昵称霹雳巴拉</div>
            <div className="b"><i>设计师</i>&nbsp;&nbsp;<span className="iconfont icon-xingbienan"></span>&nbsp;&nbsp;</div>
          </div>
          <span className="iconfont icon--shezhi r"></span>
        </div>
      </div>
    );
  }
}

export default Userblock; 