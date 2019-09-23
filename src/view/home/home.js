import React from 'react';
import './home.css';
import Slide  from '../../components/slide/slide';
import NestList from './nestList/nestList';
import ArticleList from './articleList/articleList';
import Footer from '../../viewComponents/footer/footer';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import img from '../submitNest/1.jpg';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      load: false,
      banner: [],
      tabIndex: 0,
    }
  }

  componentDidMount() {
    // 记录进入过首页
    window.sessionStorage.setItem('goHomeHistory', 'Y');

    this.getSlideData();
  }

  getSlideData() {
    this.setState({
      load: true,
      banner: [{
        src: img,
        id: 1,
        type: 1,
        tag: '小窝',
        tagBg: '#E87424'
      }, {
        src: img,
        id: 1,
        type: 2,
        tag: '文章',
        tagBg: '#3BB9D8'
      }]
    });
  }

  handleTabTitleClick(tabIndex) {
    this.setState({ tabIndex });
  }

  handleSlideClick(i) {
    switch (this.state.banner[i].type) {
      case 1:
        this.props.history.push('/nestDetail?itemId=' + this.state.banner[i].id);
        break;
      case 2:
        this.props.history.push('/articleDetail?itemId=' + this.state.banner[i].id);
        break;
      default:
        break;
    }
  }

  render() {
    if (!this.state.load) return null;
    
    return (
      <div className="home">
        <div className="home-content" id="home-content">
          <div className="home-slide">
            <Slide autoPlay data={this.state.banner} proportion={[2, 1]} click={i => this.handleSlideClick(i)} />
          </div>
          <TabTitle style={{ margin: '.6rem 0' }} list={['小窝', '文章']} click={i => this.handleTabTitleClick(i)} />
          <NestList toggle={this.state.tabIndex === 0} />
          <ArticleList toggle={this.state.tabIndex === 1} />
        </div>
        <Footer history={this.props.history} />
      </div>
    );
  }
}

export default Home;
