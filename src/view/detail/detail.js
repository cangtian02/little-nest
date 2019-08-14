import React from 'react';
import './detail.css';
import ImgBox from './imgBox/imgBox';
import Info from './info/info';
import Evaluate from './evaluate/evaluate';
import Itemmore from './itemMore/itemMore';
import Lableinfo from './lableInfo/lableInfo';
import { BotGoHomeBtn } from '../../components/componentList/componentList';

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleLableInfo: false,
      lableIndex: 0,
      lableData: [0,0]
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

  render() {
    return (
      <div className="detail">
        <ImgBox 
          toggleLableInfo={this.state.toggleLableInfo} 
          lableIndex={this.state.lableIndex} 
          showLableInfo={i => this.showLableInfo(i)}
          hideLableInfo={() => this.hideLableInfo()} 
          handleLableIndex={i => this.handleLableIndex(i)}
        />
        <Info />
        <Evaluate />
        <Itemmore history={this.props.history} />
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

export default Detail; 