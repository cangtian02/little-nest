import React from 'react';
import './wo.css';
import Footer from '../../viewComponents/footer/footer';
import NestItem from '../../viewComponents/nestItem/nestItem';
import ArticleItem from '../../viewComponents/articleItem/articleItem';
import UserBlock from '../../viewComponents/userBlock/userBlock';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import SmallTab from './smallTab/smallTab';
import img from '../submitNest/1.jpg';

const item = {
  id: 1,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
};

class Wo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleTabIndex: 0,
      collectSmallTabIndex: 0,
      praiseSmallTabIndex: 0,
      nestItem: [item],
      articleItem: [
        {
          id: 1,
          img: [],
          name: '文章名字啊啊啊小窝名字啊啊啊',
          info: '文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊',
          praise: 30,
        }
      ]
    }
  }

  componentDidMount() {

  }

  handleTabTitleClick(titleTabIndex) {
    this.setState({ titleTabIndex });
  }

  getNolistContent(str) {
    return <div className="wo-item-nolist">{str}</div>;
  }

  getNestItemDom(item, str) {
    if (item.length === 0) return this.getNolistContent(str);
    
    let arr = [];
    item.forEach((val, i) => {
      arr.push(<NestItem val={val} key={i} toggleMe history={this.props.history} />);
    });

    return arr;
  }

  getArticleItem(item, str) {
    if (item.length === 0) return this.getNolistContent(str);

    let arr = [];
    item.forEach((val, i) => {
      arr.push(<ArticleItem val={val} key={i} toggleMe history={this.props.history} />);
    });

    return arr;
  }

  getNestContent() {
    return this.getNestItemDom(this.state.nestItem, '还没有你的小窝，快上传分享吧~');
  }

  getArticleContent() {
    return this.getArticleItem(this.state.articleItem, '还没有你的文章，快上传分享吧~');
  }

  handleCollectSmallTabClick(collectSmallTabIndex) {
    this.setState({ collectSmallTabIndex });
  }

  getCollectContent() {
    return (
      <div>
        <SmallTab tabIndex={this.state.collectSmallTabIndex} click={i => this.handleCollectSmallTabClick(i)} />
        {
          this.state.collectSmallTabIndex === 0
          ?
          this.getNestItemDom(this.state.nestItem, '还没有你的小窝，快上传分享吧~')
          :
          this.getArticleItem(this.state.articleItem, '还没有你的文章，快上传分享吧~')
        }
      </div>
    );
  }

  handlePraiseSmallTabClick(praiseSmallTabIndex) {
    this.setState({ praiseSmallTabIndex });
  }

  getPraiseContent() {
    return (
      <div>
        <SmallTab tabIndex={this.state.praiseSmallTabIndex} click={i => this.handlePraiseSmallTabClick(i)} />
        {
          this.state.praiseSmallTabIndex === 0
            ?
            this.getNestItemDom(this.state.nestItem, '还没有你的小窝，快上传分享吧~')
            :
            this.getArticleItem(this.state.articleItem, '还没有你的文章，快上传分享吧~')
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