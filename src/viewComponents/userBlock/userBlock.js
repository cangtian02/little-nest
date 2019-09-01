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

  handleRouter(url) {
    this.props.history.push('/' + url);
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
          {
            this.props.isMe
            ?
              <span className="iconfont icon--shezhi r" onClick={() => this.handleRouter('setting')}></span>
            :
              <div className="follow-btn">关注</div>
          }
        </div>
        <div className="userBlock-numlist">
          <li onClick={() => this.handleRouter('follow')}><p>23</p><span>关注</span></li>
          <li onClick={() => this.handleRouter('fans')}><p>4</p><span>粉丝</span></li>
          <li><p>56</p><span>获赞与收藏</span></li>
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