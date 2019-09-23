import React, { lnConst } from 'react';
import './userBlock.css';
import Utils from '../../common/Utils';

class Userblock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    
  }

  handleRouter(url) {
    this.props.history.push('/' + url + (this.props.isMe ? '' : '?userId=' + this.props.userInfo.id));
  }

  handleFollow() {
    this.props.handleFollow && this.props.handleFollow(!this.props.userInfo.follow);
  }


  getLable(lable) {
    let arr = [];
    lable.forEach((val, i) => {
      arr.push(<li key={i}>{val}</li>);
    });
    return arr;
  }

  render() {
    let userInfo = this.props.userInfo;
    if (!userInfo || !userInfo.id) return null;

    return (
      <div className="userBlock">
        <div className="userBlock-top">
          <img src="./img/pic.jpg" className="l" alt="" />
          <div className="c">
            <div className="t">{userInfo.name}</div>
            <div className="b"><i>{userInfo.occupation}</i><span className={'iconfont ' + (userInfo.gender ? 'icon-xingbienan' : 'icon-xingbienv')}></span></div>
          </div>
          {
            this.props.isMe
            ?
              <span className="iconfont icon--shezhi r" onClick={() => this.handleRouter('setting')}></span>
            :
              <div className={'follow-btn' + (userInfo.follow ? ' disable' : '')} onClick={() => this.handleFollow()}>{userInfo.follow ? '取消关注' : '关注'}</div>
          }
        </div>
        <div className="userBlock-numlist">
          <li onClick={() => this.handleRouter('follow')}><p>{Utils.resetNum(userInfo.followNum)}</p><span>关注</span></li>
          <li onClick={() => this.handleRouter('fans')}><p>{Utils.resetNum(userInfo.fansNum)}</p><span>粉丝</span></li>
          <li><p>{Utils.resetNum(userInfo.praiseAndCollectionNum)}</p><span>获赞与收藏</span></li>
        </div>
        <div className="userBlock-lable">
          {this.getLable(userInfo.lable)}
        </div>
        <div className="userBlock-info">{userInfo.info || lnConst.DEFAULT_USERINFO}</div>
      </div>
    );
  }
}

export default Userblock; 