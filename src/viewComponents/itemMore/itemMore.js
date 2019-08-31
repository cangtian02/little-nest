import React from 'react';
import './itemMore.css';
import { PublicTitle } from '../../components/componentList/componentList';
import NestItem from '../nestItem/nestItem';
import ArticleItem from '../articleItem/articleItem';
import img from '../../view/submitNest/1.jpg';

const nestItem = {
  id: 2,
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

class Itemmore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nestItem: [nestItem, nestItem, nestItem],
      articleItem: [articleItem, articleItem, articleItem],
    }
  }

  componentDidMount() {

  }

  getNestItemDom() {
    let arr = [];
    this.state.nestItem.forEach((val, i) => {
      arr.push(<NestItem val={val} key={i} history={this.props.history} />);
    });
    return arr;
  }

  getArticleItem() {
    let arr = [];
    this.state.articleItem.forEach((val, i) => {
      arr.push(<ArticleItem val={val} key={i} history={this.props.history} />);
    });
    return arr;
  }

  render() {
    return (
      <div className="dt-itemMore">
        <div className="dt-itemMore-title"><PublicTitle val={'更多' + (this.props.type === 1 ? '小窝' : '文章')} /></div>
        {
          this.props.type === 1
          ?
            this.getNestItemDom()
            :
            this.getArticleItem()
        }
      </div>
    );
  }
}

export default Itemmore; 