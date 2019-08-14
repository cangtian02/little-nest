import React from 'react';
import './imgBox.css';

class Imgbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleCourse: localStorage.getItem('dt-imgBox-course')
    }
  }

  componentDidMount() {

  }

  handleLableIndex(i) {
    if (!this.props.toggleLableInfo) {
      this.props.showLableInfo && this.props.showLableInfo(i);
    } else {
      this.props.handleLableIndex && this.props.handleLableIndex(i);
    }
  }

  getLableDom() {
    let arr = [];
    let data = [
      { x: 100, y: 90 },
      { x: 150, y: 120 },
    ];

    data.forEach((val, i) => {
      arr.push(
        <div className={'dt-imgBox-lable' + (this.props.toggleLableInfo && this.props.lableIndex === i ? ' active' : '')} style={{ left: val.x + 'px', top: val.y + 'px' }} key={i} onClick={() => this.handleLableIndex(i)}></div>
      );
    });

    return arr;
  }

  handleHideLableInfo() {
    if (this.props.toggleLableInfo) {
      this.props.hideLableInfo && this.props.hideLableInfo();
    }
  }

  render() {
    return (
      <div className="dt-imgBox" id="dt-imgBox" style={{ height: window.innerWidth / 4 * 3 + 'px' }}>
        <img src='./img/1.jpg' alt="" className="dt-imgBox-img" onClick={() => this.handleHideLableInfo()} />
        {this.getLableDom()}
      </div>
    );
  }
}

export default Imgbox; 