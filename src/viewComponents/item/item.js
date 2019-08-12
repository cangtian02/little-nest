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

  render() {
    if (!this.props.val) return null;
    let val = this.props.val;
    return (
      <div className="item-box">
        <div className="ib-img">
          <img src={val.img} alt={val.name} />
          {this.getLableDom(val.lable)}
        </div>
        <div className="ib-name clamp2">{val.name}</div>
        <div className="ib-info">
          <div className="ib-user">
            <img src={val.userIcon} alt={val.userName} />
            <p className="ellipsis">{val.userName}</p>
          </div>
          <div className="ib-praise">
            <span className="iconfont icon--dianzan"></span>
            <p>{val.praise || 0}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Item; 