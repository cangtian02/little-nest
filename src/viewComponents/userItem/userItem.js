import React from 'react';
import './userItem.css';

class Useritem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  handleGoUserHome(i) {
    this.props.history.push('/userHome?userId=' + this.props.list[i].id);
  }

  handleFollow(i) {
    this.props.handleFollow && this.props.handleFollow(!this.props.list[i].follow, i);
  }

  getItem() {
    let arr = [];

    this.props.list.forEach((val, i) => {
      arr.push(
        <div className="userItem borderBottom" key={i}>
          <div className="l" onClick={() => this.handleGoUserHome(i)}>
            <img src={val.icon} alt={val.name} />
            <div className="l_r">
              <p>{val.name}</p>
              <span>{val.occupation}</span>
            </div>
          </div>
          <div className={'r' + (val.follow ? ' disable' : '')} onClick={() => this.handleFollow(i)}>{val.follow ? '取消关注' : '关注'}</div>
        </div>
      );
    });

    return arr;
  }

  render() {
    if (this.props.list.length === 0) return null;

    return (
      <div className="userItem-box">
        {this.getItem()}
      </div>
    );
  }
}

export default Useritem; 