import React from 'react';
import './nestItem.css';

class NestItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  getLableDom(lable) {
    if (lable.length === 0) return null;
    let arr = [];
    if (lable.length > 3) lable.splice(3, lable.length);
    lable.forEach((val, i) => {
      arr.push(<div key={i}>{val}</div>);
    });
    return <div className="nib-lable">{arr}</div>;
  }

  handleItem() {
    this.props.history.push('/detail?itemId=' + this.props.val.id);
  }

  handleCommentBtn() {
    
  }

  handleEditBtn() {
    
  }

  handleDeleteBtn() {
    
  }

  render() {
    if (!this.props.val) return null;
    let val = this.props.val;
    return (
      <div className="nestItem-box">
        <div className="nib-img" onClick={() => this.handleItem()}>
          <img src={val.img} alt={val.name} />
          {this.getLableDom(val.lable)}
        </div>
        <div className="nib-name clamp2" onClick={() => this.handleItem()}>{val.name}</div>
        <div className="nib-info">
          {
            !this.props.toggleMe
            ?
            <div className="nib-user" onClick={() => this.handleItem()}>
              <img src={val.userIcon} alt={val.userName} />
              <p className="ellipsis">{val.userName}</p>
            </div>
            :
            null
          }
          <div className="nib-nums" style={this.props.toggleMe ? {flex: 1} : {}} onClick={() => this.handleItem()}>
            {val.look || 0}&nbsp;浏览&nbsp;&nbsp;{val.evaluate || 0}&nbsp;评论&nbsp;&nbsp;{val.praise || 0}&nbsp;点赞
          </div>
          {
            this.props.toggleMe
            ?
              <div className="nib-icons">
                <span className="iconfont icon-xinbaniconshangchuan-" onClick={() => this.handleCommentBtn()}></span>
                <span className="iconfont icon-icon_edit" onClick={() => this.handleEditBtn()}></span>
                <span className="iconfont icon--shanchu" onClick={() => this.handleDeleteBtn()}></span>
              </div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default NestItem; 