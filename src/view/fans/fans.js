import React from 'react';
import './fans.css';
import UserItem from '../../viewComponents/userItem/userItem';

class Fans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fansList: [{
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
    let fansList = [...this.state.fansList];
    fansList[i].follow = e;
    this.setState({ fansList });
  }

  render() {
    if (this.state.fansList.length === 0) return <div className="fans-item-nolist">还没有人关注你哦~</div>;

    return (
      <div className="fans">
        <div className="fans-title">我的粉丝</div>
        <UserItem list={this.state.fansList} history={this.props.history} handleFollow={(e, i) => this.handleFollow(e, i)} />
      </div>
    );
  }
}

export default Fans; 