import React from 'react';
import './articleDetail.css';
import Slide from '../../components/slide/slide';
import Info from '../../viewComponents/info/info';
import Evaluate from '../../viewComponents/evaluate/evaluate';
import Itemmore from '../../viewComponents/itemMore/itemMore';
import img from '../submitNest/1.jpg';

class Articledetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {
        imgs: [{
          src: img
        }, {
          src: img
        }]
      }
    }
  }

  componentDidMount() {

  }

  handleSlideClick(i) {

  }

  render() {
    return (
      <div className="articleDetail">
        <Slide data={this.state.info.imgs} proportion={[4, 3]} click={i => this.handleSlideClick(i)} />
        <Info history={this.props.history} />
        <div className="ard-line"></div>
        <Evaluate type={2} history={this.props.history} />
        <div className="ard-line"></div>
        <Itemmore history={this.props.history} type={2} />
      </div>
    );
  }
}

export default Articledetail; 