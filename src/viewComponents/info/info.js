import React from 'react';
import './info.css';
import Utils from '../../common/Utils';

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

  handleFollow() {
    this.handleFunc('follow', !this.props.info.follow);
  }

  handlePraise() {
    let n = this.props.info.praise ? this.props.info.praiseNum - 1 : this.props.info.praiseNum + 1;
    this.handleFunc('praiseNum', n);
    setTimeout(() => {
      this.handleFunc('praise', !this.props.info.praise);
    }, 20);
  }

  handleCollection() {
    let n = this.props.info.collection ? this.props.info.collectionNum - 1 : this.props.info.collectionNum + 1;
    this.handleFunc('collectionNum', n);
    setTimeout(() => {
      this.handleFunc('collection', !this.props.info.collection);
    }, 20);
  }

  handleFunc(key, value) {
    this.props.handleFunc && this.props.handleFunc(key, value);
  }

  handleEvaluate() {
    this.props.history.push('/itemEvaluate?itemId=');
  }

  getLable(lable) {
    let arr = [];
    lable.forEach((val, i) => {
      arr.push(<em key={i}>{val}</em>);
    });
    return arr;
  }
  
  render() {
    let info = this.props.info;
    if (!info || !info.id) return null;

    return (
      <div className="dt-info">
        <div className="dti-user">
          <div className="l" onClick={() => this.handleGoUserHome()}>
            <img src={info.userIcon} alt="" />
            <div className="i">
              <p>{info.userName}</p>
              <span>{info.userOccupation}</span>
            </div>
          </div>
          <div className={'r' + (info.follow ? ' disable' : '')} onClick={() => this.handleFollow()}>{info.follow ? '取消关注' : '关注'}</div>
        </div>
        <div className="dti-name">{info.nestName}</div>
        <div className="dti-time">发布于{Utils.resetTime(info.date)}&nbsp;&nbsp;浏览{Utils.resetNum(info.readNum)}</div>
        <div className="dti-lable">{this.getLable(info.lable)}</div>
        <div className="dti-info">{info.info}</div>
        <div className="dti-num">
          <div className={info.praise ? 'active' : ''} onClick={() => this.handlePraise()}>
            <span className="iconfont icon--dianzan"></span><em>{Utils.resetNum(info.praiseNum)}</em>
          </div>
          <div className={info.collection ? 'active' : ''} onClick={() => this.handleCollection()}>
            <span className="iconfont icon--shoucang"></span><em>{Utils.resetNum(info.collectionNum)}</em>
          </div>
          <div onClick={() => this.handleEvaluate()}><span className="iconfont icon-pinglun1"></span><em>&nbsp;{Utils.resetNum(info.evaluateNum)}</em></div>
        </div>
      </div>
    );
  }
}

export default Info; 