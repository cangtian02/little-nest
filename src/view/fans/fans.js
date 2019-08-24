import React from 'react';
import './fans.css';
import UserItem from '../../viewComponents/userItem/userItem';

class Fans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fansList: [0, 0, 0, 0],
    }
  }

  componentDidMount() {

  }

  render() {
    if (this.state.fansList.length === 0) return <div className="fans-item-nolist">还没有人关注你哦~</div>;

    return (
      <div className="fans">
        <div className="fans-title">我的粉丝</div>
        <UserItem list={this.state.fansList} />
      </div>
    );
  }
}

export default Fans; 