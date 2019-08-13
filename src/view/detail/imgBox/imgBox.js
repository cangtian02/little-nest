import React from 'react';
import './imgBox.css';
import Hammer from 'hammerjs';

class Imgbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleCourse: localStorage.getItem('dt-imgBox-course')
    }
  }

  componentDidMount() {
    let btn = document.getElementById('dt-imgBox');
    let hammertime = new Hammer(btn);

    hammertime.on("doubletap", e => {
      localStorage.setItem('dt-imgBox-course', 1);
      this.setState({ toggleCourse: true });
      this.props.doubletapImgBox && this.props.doubletapImgBox();
    });
  }

  getCourseDom() {
    if (this.state.toggleCourse) return null;

    return (
      <div className="dt-imgBox-course">
        <span className="iconfont icon-Double-Tap"></span>
        <p>双击发现更多~</p>
      </div>
    );
  }

  render() {
    return (
      <div className="dt-imgBox" id="dt-imgBox">
        <img src='./img/1.jpg' alt="" className="dt-imgBox-img" />
        <div className="dt-imgBox-lable" style={{left: '100px', top: '90px'}}></div>
        <div className="dt-imgBox-lable" style={{ left: '170px', top: '140px' }}></div>
        {this.getCourseDom()}
      </div>
    );
  }
}

export default Imgbox; 