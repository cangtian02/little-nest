import React from 'react';
import './lableInfo.css';
import BScroll from 'better-scroll';

function SlideDots(props) {
  let dom = [];
  props.data.forEach((val, i) => {
    dom.push(<li key={i} className={props.currentIndex === i ? 'active' : ''}></li>);
  });
  return (dom);
}

class Lableinfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    if (this.props.lableData.length > 0) this.init();
  }

  componentWillUnmount() {
    if (this.slide) {
      this.slide.destroy();
      this.slide = null;
    }
  }

  componentDidUpdate() {
    if (this.slide) this.slide.goToPage(this.props.lableIndex);
  }

  init() {
    let slideWidth = this.refs.slide.clientWidth;
    let width = (this.props.lableData.length + 2) * slideWidth;
    this.refs.content.style.width = width + 'px';

    this.slide = new BScroll(this.refs.slide, {
      scrollX: true,
      scrollY: false,
      eventPassthrough: 'vertical',
      momentum: false,
      snap: {
        loop: true,
        threshold: 0.3,
        speed: 400
      },
      bounce: true
    });

    this.slide.on('scrollEnd', () => {
      this.props.handleLableIndex && this.props.handleLableIndex(this.slide.getCurrentPage().pageX);
    });
  }

  getLableSlide() {
    let arr = [];
    this.props.lableData.forEach((val, i) => {
      arr.push(
        <div className="dtl-slide-item" key={i}>
          <div className="dtl-slide-item_title">{i}xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比</div>
          <div className="dtl-slide-item_list"><div className="l">品牌：</div><div className="r">放沙发了两年</div></div>
          <div className="dtl-slide-item_list"><div className="l">品牌发：</div><div className="r">放沙发了两年</div></div>
          <div className="dtl-slide-item_list"><div className="l">品牌：</div><div className="r">放沙发了两年</div></div>
          <div className="dtl-slide-item_list"><div className="l">品牌发：</div><div className="r">放沙发了两年</div></div>
          <div className="dtl-slide-item_info">xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比xxxx键盘，64键，青轴，富士康解碑卡iu吧v科比</div>
        </div>
      );
    });

    return(
      <div className="dtl-slide" ref="slide">
        <div className="dtl-slide-content" ref="content">
          {arr}
        </div>
        <div className="dtl-slide-dots">
          <SlideDots data={this.props.lableData} currentIndex={this.props.lableIndex} />
        </div>
      </div>
    );
  }

  render() {
    let top = window.innerWidth / 4 * 3;

    return (
      <div className={'dt-lableInfo' + (this.props.toggleLableInfo ? ' active' : '')} style={{ top: top + 'px' }}>
        <div className="box">
          {this.getLableSlide()}
        </div>

      </div>
    );
  }
}

export default Lableinfo; 