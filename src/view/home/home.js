import React from 'react';
import './home.css';
import Slide  from '../../components/slide/slide';
import Item from '../../viewComponents/item/item';
import Footer from '../../viewComponents/footer/footer';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import img from '../submit/1.jpg';

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
      data: '',
      item: [item, item, item],
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

  handleItem(id) {
    this.props.history.push('/detail?itemId=' + id);
  }

  getItemDom() {
    let arr = [];
    this.state.item.forEach((val, i) => {
      arr.push(<Item val={val} key={i} handleItem={id => this.handleItem(id)} />);
    });
    return arr;
  }

  handleTabTitleClick(i) {
    console.log(i);
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
            {this.getItemDom()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
