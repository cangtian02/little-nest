import React from 'react';
import './userHome.css';
import UserBlock from '../../viewComponents/userBlock/userBlock';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import NestItem from '../../viewComponents/nestItem/nestItem';
import ArticleItem from '../../viewComponents/articleItem/articleItem';
import img from '../submitNest/1.jpg';

const nestItem = {
  id: 1,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  userIcon: img,
  userName: '小明设计师',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
};

const articleItem = {
  id: 1,
  img: [],
  name: '文章名字啊啊啊小窝名字啊啊啊',
  info: '文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊',
  praise: 30,
  userIcon: img,
  userName: '小明设计师',
};

class Userhome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleTabIndex: 0,
      nestItem: [nestItem],
      articleItem: [articleItem],
    }
  }

  componentDidMount() {

  }

  getNolistContent(str) {
    return <div className="uh-item-nolist">{str}</div>;
  }

  handleTabTitleClick(titleTabIndex) {
    this.setState({ titleTabIndex });
  }

  getNestItemDom(item, str) {
    if (item.length === 0) return this.getNolistContent(str);

    let arr = [];
    item.forEach((val, i) => {
      arr.push(<NestItem val={val} key={i} hiddenUser={true} history={this.props.history} index={i} />);
    });

    return arr;
  }

  getArticleItem(item, str) {
    if (item.length === 0) return this.getNolistContent(str);

    let arr = [];
    item.forEach((val, i) => {
      arr.push(<ArticleItem val={val} key={i} hiddenUser={true} history={this.props.history} index={i} />);
    });

    return arr;
  }

  getNestContent() {
    return this.getNestItemDom(this.state.nestItem, 'TA还没有分享小窝哦~');
  }

  getArticleContent() {
    return this.getArticleItem(this.state.articleItem, 'TA还没有分享文章哦~',);
  }

  render() {
    return (
      <div className="userHome">
        <UserBlock history={this.props.history} />
        <TabTitle style={{ margin: '.6rem 0' }} list={['小窝', '文章']} click={i => this.handleTabTitleClick(i)} />
        <div className="uh-item">
          {
            this.state.titleTabIndex === 0
            ?
              this.getNestContent()
            :
              this.getArticleContent()
          }
        </div>
      </div>
    );
  }
}

export default Userhome; 