import React from 'react';
import './follow.css';
import UserItem from '../../viewComponents/userItem/userItem';

class Follow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      followList: [0, 0, 0],
    }
  }

  componentDidMount() {

  }

  render() {
    if (this.state.followList.length === 0) return <div className="follow-item-nolist">你还没有关注任何人哦~</div>;

    return (
      <div className="follow">
        <div className="follow-title">我的关注</div>
        <UserItem list={this.state.followList} history={this.props.history} />
      </div>
    );
  }
}

export default Follow; 