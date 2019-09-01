import React from 'react';
import './nestItem.css';
import Utils from '../../common/Utils';

class NestItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.removeModal(this.deleteItemModal);
  }

  removeModal(node) {
    node && node.parentNode && node.parentNode.removeChild(node);
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
    this.props.history.push('/nestDetail?itemId=' + this.props.val.id);
  }

  handleCommentBtn() {
    this.props.history.push('/itemEvaluate?itemId=' + this.props.val.id);
  }

  handleEditBtn() {
    this.props.history.push('/submitNest?itemId=' + this.props.val.id);
  }

  handleDeleteBtn() {
    this.deleteItemModal = Utils.toast.modal({
      message: '确定删除此小窝，删除后不可回复？',
      onOk: () => {
        setTimeout(() => {
          this.props.deleteItem && this.props.deleteItem(this.props.index);
        }, 300);
      },
    });
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
            this.props.showUser
            ?
            <div className="nib-user" onClick={() => this.handleItem()}>
              <img src={val.userIcon} alt={val.userName} />
              <p className="ellipsis">{val.userName}</p>
            </div>
            :
            null
          }
          <div className="nib-nums" style={!this.props.showUser ? {flex: 1} : {}} onClick={() => this.handleItem()}>
            {val.look || 0}&nbsp;浏览&nbsp;&nbsp;{val.evaluate || 0}&nbsp;评论&nbsp;&nbsp;{val.praise || 0}&nbsp;点赞
          </div>
          {
            this.props.showHandle
            ?
              <div className="nib-icons">
                <span className="iconfont icon-pinglun1" onClick={() => this.handleCommentBtn()}></span>
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