import React from 'react';
import './wo.css';
import Footer from '../../viewComponents/footer/footer';
import NestItem from '../../viewComponents/nestItem/nestItem';
import ArticleItem from '../../viewComponents/articleItem/articleItem';
import UserBlock from '../../viewComponents/userBlock/userBlock';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import SmallTab from './smallTab/smallTab';
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

class Wo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleTabIndex: 0,
      collectSmallTabIndex: 0,
      praiseSmallTabIndex: 0,
      nestItem: [nestItem],
      articleItem: [articleItem],
      collectNestItem: [nestItem],
      collectArticleItem: [articleItem],
      praiseNestItem: [nestItem],
      praiseArticleItem: [articleItem],
    }
  }

  componentDidMount() {

  }

  handleTabTitleClick(titleTabIndex) {
    this.setState({ titleTabIndex });
  }

  deleteItem(i, type) {
    let item = type === 'nest' ? this.state.nestItem : this.state.articleItem;
    item.splice(i , 1);
    type === 'nest' ? this.setState({ nestItem: item }) : this.setState({ articleItem: item });
  }

  getNolistContent(str) {
    return <div className="wo-item-nolist">{str}</div>;
  }

  getNestItemDom(item, str, toggleMe) {
    if (item.length === 0) return this.getNolistContent(str);
    
    let arr = [];
    item.forEach((val, i) => {
      arr.push(<NestItem val={val} key={i} toggleMe={toggleMe} history={this.props.history} index={i} deleteItem={i => this.deleteItem(i, 'nest')} />);
    });

    return arr;
  }

  getArticleItem(item, str, toggleMe) {
    if (item.length === 0) return this.getNolistContent(str);

    let arr = [];
    item.forEach((val, i) => {
      arr.push(<ArticleItem val={val} key={i} toggleMe={toggleMe} history={this.props.history} index={i} deleteItem={i => this.deleteItem(i, 'article')} />);
    });

    return arr;
  }

  getNestContent() {
    return this.getNestItemDom(this.state.nestItem, '还没有你的小窝，快上传分享吧~', true);
  }

  getArticleContent() {
    return this.getArticleItem(this.state.articleItem, '还没有你的文章，快上传分享吧~', true);
  }

  handleCollectSmallTabClick(collectSmallTabIndex) {
    this.setState({ collectSmallTabIndex });
  }

  handlePraiseSmallTabClick(praiseSmallTabIndex) {
    this.setState({ praiseSmallTabIndex });
  }

  getCollectContent() {
    return (
      <div>
        <SmallTab tabIndex={this.state.collectSmallTabIndex} click={i => this.handleCollectSmallTabClick(i)} />
        {
          this.state.collectSmallTabIndex === 0
          ?
            this.getNestItemDom(this.state.collectNestItem, '还没有收藏过小窝哦~', false)
          :
            this.getArticleItem(this.state.collectArticleItem, '还没有收藏过文章哦~', false)
        }
      </div>
    );
  }

  getPraiseContent() {
    return (
      <div>
        <SmallTab tabIndex={this.state.praiseSmallTabIndex} click={i => this.handlePraiseSmallTabClick(i)} />
        {
          this.state.praiseSmallTabIndex === 0
            ?
            this.getNestItemDom(this.state.praiseNestItem, '还没有点赞过小窝哦~', false)
            :
            this.getArticleItem(this.state.praiseArticleItem, '还没有点赞过文章哦~', false)
        }
      </div>
    );
  }

  render() {
    return (
      <div className="wo">
        <div className="wo-content">
          <UserBlock history={this.props.history} />
          <TabTitle style={{margin: '.6rem 0'}} list={['小窝', '文章', '收藏', '赞过']} click={i => this.handleTabTitleClick(i)} />
          <div className="wo-item">
            {
              this.state.titleTabIndex === 0
              ?
                this.getNestContent()
              :
                this.state.titleTabIndex === 1
              ?
                this.getArticleContent()
              :
                this.state.titleTabIndex === 2
              ?
                this.getCollectContent()
              :
                this.getPraiseContent()
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Wo; 