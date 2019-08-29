import React from 'react';
import './wo.css';
import Footer from '../../viewComponents/footer/footer';
import NestItem from '../../viewComponents/nestItem/nestItem';
import ArticleItem from '../../viewComponents/articleItem/articleItem';
import UserBlock from '../../viewComponents/userBlock/userBlock';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
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
      tabIndex: 0,
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

  handleTabTitleClick(tabIndex) {
    this.setState({ tabIndex });
  }

  getItemDom() {
    if (this.state.nestItem.length === 0) return <div className="wo-item-nolist">还没有你的小窝，快上传分享吧~</div>
    
    let arr = [];
    this.state.nestItem.forEach((val, i) => {
      arr.push(<NestItem val={val} key={i} toggleMe history={this.props.history} />);
    });

    return arr;
  }

  getArticleItem() {
    if (this.state.articleItem.length === 0) return <div className="wo-item-nolist">还没有你的文章，快上传分享吧~</div>

    let arr = [];
    this.state.articleItem.forEach((val, i) => {
      arr.push(<ArticleItem val={val} key={i} toggleMe history={this.props.history} />);
    });

    return arr;
  }

  render() {
    return (
      <div className="wo">
        <div className="wo-content">
          <UserBlock history={this.props.history} />
          <TabTitle style={{margin: '.6rem 0'}} list={['小窝', '文章', '收藏', '赞过']} click={i => this.handleTabTitleClick(i)} />
          <div className="wo-item">
            {
              this.state.tabIndex === 0
              ?
              this.getItemDom()
              :
              this.state.tabIndex === 1
              ?
              this.getArticleItem()
              :
              null
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Wo; 