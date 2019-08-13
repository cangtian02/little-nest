import React from 'react';
import './detail.css';
import ImgBox from './imgBox/imgBox';
import Info from './info/info';
import Evaluate from './evaluate/evaluate';
import { PublicTitle } from '../../components/componentList/componentList';
import Item from '../../viewComponents/item/item';
import img from '../submit/1.jpg';

const item = {
  id: 2,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  userIcon: img,
  userName: '小明设计师',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
};

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [item, item, item],
      toggleLableInfo: false,
    }
  }

  componentDidMount() {

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

  doubletapImgBox() {
    setTimeout(() => {
      let root = document.getElementById('root');
      root.scrollTop = 0;
      document.getElementById('root').setAttribute('class', root.getAttribute('class') + ' hidden');
      this.setState({ toggleLableInfo: true });
    }, 100);
  }

  hideLableInfo() {
    let root = document.getElementById('root');
    let className = root.getAttribute('class');
    className = className.split(' ');
    className = className.splice(0, className.length - 1);
    document.getElementById('root').setAttribute('class', className);
    this.setState({ toggleLableInfo: false });
  }

  getLableInfoDom() {
    if (!this.state.toggleLableInfo) return null;

    let top = document.getElementById('dt-imgBox').clientHeight;

    return (
      <div className="dt-lableInfo">
        <div className="bg" onClick={() => this.hideLableInfo()}></div>
        <div className="box" style={{top: top + 'px'}}>

        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="detail">
        <ImgBox doubletapImgBox={() => this.doubletapImgBox()} />
        <Info />
        <Evaluate />
        <div className="detail-more">
          <PublicTitle val={'更多小窝'} />
          <div className="detail-more-block"></div>
          {this.getItemDom()}
        </div>
        {this.getLableInfoDom()}
      </div>
    );
  }
}

export default Detail; 