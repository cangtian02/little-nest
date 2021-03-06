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
    if (this.props.val.isDraft) {
      this.props.history.push('/submitNest?itemId=' + this.props.val.id + '&isDraft=1');
    } else {
      this.props.history.push('/nestDetail?itemId=' + this.props.val.id);
    }
  }

  handleCommentBtn() {
    this.props.history.push('/itemEvaluate?itemId=' + this.props.val.id);
  }

  handleEditBtn() {
    this.props.history.push('/submitNest?itemId=' + this.props.val.id);
  }

  handleDeleteBtn(isDraft) {
    this.deleteItemModal = Utils.toast.modal({
      message: '确定删除此' + (isDraft ? '草稿' : '小窝') + '，删除后不可回复？',
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
          {val.isDraft ? <em>草稿</em> : null}
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
                {
                  !val.isDraft
                  ?
                    <span className="iconfont icon-pinglun1" onClick={() => this.handleCommentBtn()}></span>
                    :
                    null
                }
                {
                  !val.isDraft
                  ?
                    <span className="iconfont icon-icon_edit" onClick={() => this.handleEditBtn()}></span>
                    :
                    null
                }
                <span className="iconfont icon--shanchu" onClick={() => this.handleDeleteBtn(val.isDraft)}></span>
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