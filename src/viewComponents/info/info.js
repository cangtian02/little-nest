import React from 'react';
import './info.css';

class Info extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  handleGoUserHome() {
    this.props.history.push('/userHome?userId=');
  }
  
  render() {
    return (
      <div className="dt-info">
        <div className="dti-user">
          <div className="l" onClick={() => this.handleGoUserHome()}>
            <img src="./img/1.jpg" alt="" />
            <div className="i">
              <p>小窝主名称</p>
              <span>设计师</span>
            </div>
          </div>
          <div className="r">关注</div>
        </div>
        <div className="dti-name">小窝名称粉红色空间分布进口设备</div>
        <div className="dti-time">发布于09-07&nbsp;&nbsp;浏览20k</div>
        <div className="dti-lable"><em>简约</em><em>极客范</em><em>简约</em></div>
        <div className="dti-info">小窝简介给你脸色看哪里可能给你脸色看哪里可能给你脸色看哪里可能给你脸色看哪里可能给你脸色看哪里可能...</div>
        <div className="dti-num">
          <div><span className="iconfont icon--dianzan"></span><em>30</em></div>
          <div><span className="iconfont icon--shoucang"></span><em>30</em></div>
          <div><span className="iconfont icon-pinglun1"></span><em>&nbsp;30</em></div>
        </div>
      </div>
    );
  }
}

export default Info; 