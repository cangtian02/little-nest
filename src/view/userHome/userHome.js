import React from 'react';
import './userHome.css';
import UserBlock from '../../viewComponents/userBlock/userBlock';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import NestList from './nestList/nestList';
import ArticleList from './articleList/articleList';

class Userhome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      userInfo: {
        id: 1,
        name: '名字啦啦啦',
        occupation: '程序狗',
        gender: 1,
        follow: false,
        followNum: 20,
        fansNum: 98,
        praiseAndCollectionNum: 77,
        lable: ['简约', '90后'],
        info: ''
      },
    }
  }

  componentDidMount() {

  }

  handleTabTitleClick(tabIndex) {
    this.setState({ tabIndex });
  }

  handleFollow(e) {
    let userInfo = Object.assign({}, this.state.userInfo);
    userInfo.follow = e;
    this.setState({ userInfo });
  }

  render() {
    return (
      <div className="userHome" id="userHome">
        <UserBlock history={this.props.history} userInfo={this.state.userInfo} handleFollow={e => this.handleFollow(e)}/>
        <TabTitle style={{ margin: '.6rem 0' }} list={['小窝', '文章']} click={i => this.handleTabTitleClick(i)} />
        <NestList toggle={this.state.tabIndex === 0} />
        <ArticleList toggle={this.state.tabIndex === 1} />
      </div>
    );
  }
}

export default Userhome; 