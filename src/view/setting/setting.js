import React from 'react';
import './setting.css';

class Setting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="setting">
        <div className="set-item-box">
          <div className="set-item userIcon borderBottom">
            <div className="l">头像</div>
            <div className="r"><img src="./img/pic.jpg" alt="" /></div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">昵称</div>
            <div className="r">用户昵称</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">性别</div>
            <div className="r">男</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">职业</div>
            <div className="r">设计师</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">生日</div>
            <div className="r">1995-02-22</div>
          </div>
        </div>
        <div className="set-title">个人简介</div>
        <div className="set-info-box">
          <textarea placeholder="~太懒了，啥也不留，emmmm！！！！"></textarea>
        </div>
        <div className="set-title">个性标签</div>
      </div>
    );
  }
}

export default Setting; 