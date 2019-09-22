import React from 'react';
import './follow.css';
import UserItem from '../../viewComponents/userItem/userItem';

class Follow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      followList: [{
        id: 1,
        name: '帕拉毕鹏',
        occupation: '设计师',
        icon: 'https://avatars1.githubusercontent.com/u/28089159?s=460&v=4',
        follow: true,
      }],
    }
  }

  componentDidMount() {

  }

  handleFollow(e, i) {
    let followList = [...this.state.followList];
    followList[i].follow = e;
    this.setState({ followList });
  }

  render() {
    if (this.state.followList.length === 0) return <div className="follow-item-nolist">你还没有关注任何人哦~</div>;

    return (
      <div className="follow">
        <div className="follow-title">我的关注</div>
        <UserItem list={this.state.followList} history={this.props.history} handleFollow={(e, i) => this.handleFollow(e, i)} />
      </div>
    );
  }
}

export default Follow; 