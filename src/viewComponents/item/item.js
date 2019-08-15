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
            !this.props.showCommentBtn
            ?
            <div className="ib-user" onClick={() => this.handleItem()}>
              <img src={val.userIcon} alt={val.userName} />
              <p className="ellipsis">{val.userName}</p>
            </div>
            :
            null
          }
          <div className="ib-praise" style={this.props.showCommentBtn ? {flex: 1} : {}} onClick={() => this.handleItem()}>
            <span className="iconfont icon--dianzan"></span>
            <p>{val.praise || 0}</p>
          </div>
          {
            this.props.showCommentBtn
            ?
              <div className="ib-commentBtn" onClick={() => this.handleCommentBtn()}>查看评论</div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default Item; 