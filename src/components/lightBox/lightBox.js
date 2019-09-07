import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './lightBox.css';

class Lightbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgStyle: [],
      currentPageIndex: props.activeIndex,
      group_style: {},
    }
  }

  componentDidMount() {
    if (this.props.list.length > 0) {
      this.loadImg();
      this.setSlideWidth();
    }
  }

  setSlideWidth() {
    if (this.props.list.length === 1) {
      this.setState({
        group_style: {
          width: this.refs.slide.clientWidth
        }
      });
      return;
    }

    let slideWidth = this.refs.slide.clientWidth;
    let width = this.props.list.length * slideWidth;
    this.setState({
      group_style: {
        width: width
      }
    }, () => {
      this.initSlide();
    });
  }

  initSlide() {
    if (this.slide) this.slide.destroy(); this.slide = null;

    this.slide = new BScroll(this.refs.slide, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: false,
        threshold: 0.3,
        speed: 400
      },
      bounce: false,
      click: true
    });

    this.slide.on('scrollEnd', () => {
      this.setState({
        currentPageIndex: this.slide.getCurrentPage().pageX
      }, () => {
        this.loadImg();
      });
    });

    this.slide.goToPage(this.state.currentPageIndex);
  }

  handleHide() {
    this.removeDom();
    this.props.handleCloseFunc && this.props.handleCloseFunc();
  }

  removeDom() {
    if (this.props.element) document.body.removeChild(this.props.element);
  }

  loadImg() {
    if (this.state.imgStyle[this.state.currentPageIndex]) return;

    let img = new Image();
    img.src = this.props.list[this.state.currentPageIndex];

    img.onload = () => {
      let imgStyle = JSON.parse(JSON.stringify(this.state.imgStyle));
      let winW = window.innerWidth;
      let winH = window.innerHeight;
      let imgW = img.naturalWidth;
      let imgH = img.naturalHeight;
      let scale = Math.min(winW / imgW, winH / imgH, 1);

      imgStyle[this.state.currentPageIndex] = {
        width: imgW * scale,
        height: imgH * scale
      };

      this.setState({
        imgStyle: imgStyle,
      });
    }
  }

  getItem() {
    let arr = [];

    this.props.list.forEach((val, i) => {
      arr.push(
        <li key={i}>
          <em onClick={() => this.handleHide()}></em>
          {
            this.state.imgStyle[i]
            ?
              <img src={val} alt="" style={this.state.imgStyle[i]} />
            :
            <span className="iconfont icon-Loading"></span>
          }
        </li>
      );
    });

    return arr;
  }

  render() {
    if (this.props.list.length === 0) return null;

    let dom = <div className="m-lightBox">
      <div className="m-lightBox-mask" onClick={() => this.handleHide()}></div>
      <div className="m-lightBox-body">
        <div className="m-lightBox-index">{this.state.currentPageIndex + 1} / {this.props.list.length}</div>
        <div className="m-lightBox-content" ref="slide">
          <div className="m-lightBox-group" style={this.state.group_style}>
            {this.getItem()}
          </div>
        </div>
      </div>
    </div>;

    return ReactDOM.createPortal(dom, this.props.element);
  }
}

Lightbox.propTypes = {
  list: PropTypes.array,
  activeIndex: PropTypes.number,
  handleCloseFunc: PropTypes.func,
};

Lightbox.defaultProps = {
  list: [],
  activeIndex: 0,
  handleCloseFunc: () => { },
};

const show = props => {
  let element = document.createElement('div');
  document.body.appendChild(element);
  ReactDOM.render(
    React.createElement(Lightbox, { ...props, element: element }),
    element
  );

  return element;
}

export default show;