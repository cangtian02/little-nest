import React from 'react';
import './nestDetail.css';
import ImgBox from './imgBox/imgBox';
import Info from '../../viewComponents/info/info';
import Evaluate from '../../viewComponents/evaluate/evaluate';
import Itemmore from '../../viewComponents/itemMore/itemMore';
import Lableinfo from './lableInfo/lableInfo';
import { BotGoHomeBtn } from '../../components/componentList/componentList';

class NestDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleLableInfo: false,
      lableIndex: 0,
      lableData: [0,0],
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

  componentWillUnmount() {
    if (this.state.toggleLableInfo) this.hideLableInfo();
  }

  hideLableInfo() {
    this.setState({ toggleLableInfo: false });
    let root = document.getElementById('root');
    let className = root.getAttribute('class');
    className = className.split(' ');
    className = className.splice(0, className.length - 1);
    document.getElementById('root').setAttribute('class', className);
  }

  showLableInfo(i) {
    let root = document.getElementById('root');
    root.scrollTop = 0;
    document.getElementById('root').setAttribute('class', root.getAttribute('class') + ' hidden');
    this.setState({ toggleLableInfo: true, lableIndex: i });
  }

  handleLableIndex(i) {
    this.setState({
      lableIndex: i
    });
  }

  handleFunc(key, value) {
    let info = Object.assign({}, this.state.info);
    info[key] = value;
    this.setState({info});
  }

  render() {
    return (
      <div className="nestDetail">
        <ImgBox 
          toggleLableInfo={this.state.toggleLableInfo} 
          lableIndex={this.state.lableIndex} 
          showLableInfo={i => this.showLableInfo(i)}
          hideLableInfo={() => this.hideLableInfo()} 
          handleLableIndex={i => this.handleLableIndex(i)}
        />
        <Info 
          history={this.props.history} 
          info={this.state.info} 
          handleFunc={(key, value) => this.handleFunc(key, value)}
        />
        <div className="ned-line"></div>
        <Evaluate type={1} history={this.props.history} />
        <div className="ned-line"></div>
        <Itemmore history={this.props.history} type={1} />
        <Lableinfo 
          lableData={this.state.lableData}
          toggleLableInfo={this.state.toggleLableInfo} 
          lableIndex={this.state.lableIndex} 
          handleLableIndex={i => this.handleLableIndex(i)}
        />
        <BotGoHomeBtn history={this.props.history} />
      </div>
    );
  }
}

export default NestDetail; 