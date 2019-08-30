import React from 'react';
import './home.css';
import Slide  from '../../components/slide/slide';
import NestItem from '../../viewComponents/nestItem/nestItem';
import ArticleItem from '../../viewComponents/articleItem/articleItem';
import Footer from '../../viewComponents/footer/footer';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import img from '../submitNest/1.jpg';

const item = {
  id: 1,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  userIcon: img,
  userName: '小明设计师',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
  look: 40,
  evaluate: 20
};

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      tabIndex: 0,
      data: '',
      nestItem: [item],
      articleItem: [
        {
          id: 1,
          img: [],
          userIcon: img,
          userName: '小明设计师',
          name: '文章名字啊啊啊小窝名字啊啊啊',
          info: '文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊',
          praise: 30,
        }, {
          id: 1,
          img: [img],
          userIcon: img,
          userName: '小明设计师',
          name: '文章名字啊啊啊小窝名字啊啊啊',
          info: '文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊',
          praise: 30,
        }, {
          id: 1,
          img: [img, img],
          userIcon: img,
          userName: '小明设计师',
          name: '文章名字啊啊啊小窝名字啊啊啊',
          info: '文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊文章内容啊啊啊小窝名字啊啊啊',
          praise: 30,
        },
      ],
      banner: []
    }
  }

  componentDidMount() {
    this.setState({
      data: '222',
      banner: [{
        src: img,
        id: 1,
        type: 1,
      }, {
          src: img,
          id: 1,
          type: 2,
        }]
    });

    window.sessionStorage.setItem('goHomeHistory', 'Y');
  }

  getItemDom() {
    if (this.state.nestItem.length === 0) return <div className="home-item-nolist">还没有小窝，快上传分享吧~</div>;
    
    let arr = [];
    this.state.nestItem.forEach((val, i) => {
      arr.push(<NestItem val={val} key={i} history={this.props.history} />);
    });
    return arr;
  }


  getArticleItem() {
    if (this.state.articleItem.length === 0) return <div className="home-item-nolist">还没有文章，快上传分享吧~</div>

    let arr = [];
    this.state.articleItem.forEach((val, i) => {
      arr.push(<ArticleItem val={val} key={i} history={this.props.history} />);
    });

    return arr;
  }

  handleTabTitleClick(tabIndex) {
    this.setState({ tabIndex });
  }

  render() {
    if (!this.state.data) return null;
    
    return (
      <div className="home">
        <div className="home-content">
          <div className="home-slide">
            <Slide data={this.state.banner} />
          </div>
          <TabTitle style={{ margin: '.6rem 0' }} list={['小窝', '文章']} click={i => this.handleTabTitleClick(i)} />
          <div className="home-item">
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

export default Home;
