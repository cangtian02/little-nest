import React from 'react';
import './item.css';

class Item extends React.Component {

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
    return <div className="ib-lable">{arr}</div>;
  }

  handleItem() {
    this.props.handleItem && this.props.handleItem(this.props.val.id);
  }

  handleCommentBtn() {
    this.props.handleCommentBtn && this.props.handleCommentBtn(this.props.val.id);
  }

  handleDeleteBtn() {
    this.props.handleDeleteBtn && this.props.handleDeleteBtn(this.props.val.id);
  }

  render() {
    if (!this.props.val) return null;
    let val = this.props.val;
    return (
      <div className="item-box">
        <div className="ib-img" onClick={() => this.handleItem()}>
          <img src={val.img} alt={val.name} />
          {this.getLableDom(val.lable)}
        </div>
        <div className="ib-name clamp2" onClick={() => this.handleItem()}>{val.name}</div>
        <div className="ib-info">
          {
            !this.props.toggleMe
            ?
            <div className="ib-user" onClick={() => this.handleItem()}>
              <img src={val.userIcon} alt={val.userName} />
              <p className="ellipsis">{val.userName}</p>
            </div>
            :
            null
          }
          <div className="ib-nums" style={this.props.toggleMe ? {flex: 1} : {}} onClick={() => this.handleItem()}>
            {val.look || 0}&nbsp;浏览&nbsp;&nbsp;{val.evaluate || 0}&nbsp;评论&nbsp;&nbsp;{val.praise || 0}&nbsp;点赞
          </div>
          {
            this.props.toggleMe
            ?
              <div className="ib-icons">
                <span className="iconfont icon-xinbaniconshangchuan-" onClick={() => this.handleCommentBtn()}></span>
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

export default Item; 