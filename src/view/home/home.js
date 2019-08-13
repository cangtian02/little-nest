import React from 'react';
import './home.css';
import { NavLink } from 'react-router-dom';
import Slide  from '../../components/slide/slide';
import Item from '../../viewComponents/item/item';
import Footer from '../../viewComponents/footer/footer';
import img from '../submit/1.jpg';

const item = {
  id: 1,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  userIcon: img,
  userName: '小明设计师',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
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
      banner: [img, img, img]
    });
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

  render() {
    if (!this.state.data) return null;
    
    return (
      <div className="home">
        <div className="home-content">
          <div className="home-slide">
            <Slide data={this.state.banner} />
            <p>分享你的小窝<br/>来认识与你一样也不一样的人</p>
            <NavLink className="home-go-submit" activeClassName="active" to="/submit">我要分享</NavLink>
          </div>
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
