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
            <div className="b"><i>设计师</i><span className="iconfont icon-xingbienan"></span></div>
          </div>
          <span className="iconfont icon--shezhi r"></span>
        </div>
        <div className="userBlock-numlist">
          <li><p>23</p><span>关注</span></li>
          <li><p>4</p><span>粉丝</span></li>
          <li><p>56</p><span>收藏</span></li>
          <li><p>67</p><span>获赞</span></li>
        </div>
        <div className="userBlock-lable">
          <li>简约</li><li>极客范</li><li>90后</li><li>设计师</li>
        </div>
        <div className="userBlock-info">~太懒了，啥也不留，emmmm！！！！</div>
      </div>
    );
  }
}

export default Userblock; 