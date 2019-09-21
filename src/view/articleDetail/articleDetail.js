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
      imgs: [{
        src: img
      }, {
        src: img
      }],
      info: {
        id: 1,
        nestName: '小窝名称粉红色空间分布进口设备',
        userIcon: 'https://avatars1.githubusercontent.com/u/28089159?s=460&v=4',
        userName: '小窝主名称',
        userOccupation: '设计师',
        follow: true,
        date: 1568989783000,
        lable: ['简约', '90后'],
        readNum: 2000,
        praiseNum: 32,
        collectionNum: 35,
        evaluateNum: 37,
        praise: false,
        collection: true,
        info: '小窝简介给你脸色看哪里可能给你脸色看哪里可能给你脸色看哪里',
      },
    }
  }

  componentDidMount() {

  }

  handleSlideClick(i) {

  }

  handleFunc(key, value) {
    let info = Object.assign({}, this.state.info);
    info[key] = value;
    this.setState({ info });
  }
  
  render() {
    return (
      <div className="articleDetail">
        <Slide data={this.state.imgs} proportion={[4, 3]} click={i => this.handleSlideClick(i)} />
        <Info 
          history={this.props.history}
          info={this.state.info}
          handleFunc={(key, value) => this.handleFunc(key, value)}
         />
        <div className="ard-line"></div>
        <Evaluate type={2} history={this.props.history} />
        <div className="ard-line"></div>
        <Itemmore history={this.props.history} type={2} />
      </div>
    );
  }
}

export default Articledetail; 