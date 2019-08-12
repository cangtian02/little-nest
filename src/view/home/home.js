import React from 'react';
import './home.css';
import { NavLink } from 'react-router-dom';
import Slide  from '../../components/slide/slide';
import img from '../submit/1.jpg';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      data: '',
      banner: []
    }
  }

  componentDidMount() {
    this.setState({
      data: '222',
      banner: [img, img, img]
    });
  }

  render() {
    if (!this.state.data) return null;
    
    return (
      <div className="home">
        <div className="home-slide">
          <Slide data={this.state.banner} />
          <p>分享你的小窝<br/>来认识与你一样也不一样的人</p>
          <NavLink className="home-go-submit" activeClassName="active" to="/submit">我要分享</NavLink>
        </div>
      </div>
    );
  }
}

export default Home;
