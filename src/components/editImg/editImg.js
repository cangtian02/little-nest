import React from 'react';
import './editImg.css';
import Hammer from 'hammerjs';
import Utils from '../../common/Utils';

class Editimg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgSrc: props.imgSrc,
      proportion: props.proportion,
      winWidth: 0,
      winHeight: 0,
      imgWidth: 0,
      imgHeight: 0,
      trackerWidth: 0,
      trackerHeight: 0,
    }
  }

  componentDidMount() {
    if (this.state.imgSrc) this.initData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imgSrc !== this.state.imgSrc) {
      this.setState({
        imgSrc: nextProps.imgSrc,
        proportion: nextProps.proportion,
      }, () => {
        this.initData();
      });
    }
  }

  initData() {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let imgWidth = 0;
    let imgHeight = 0;
    let trackerWidth = 0;
    let trackerHeight = 0;
    let proportion_1 = this.state.proportion.split(':')[0];
    let proportion_2 = this.state.proportion.split(':')[1];

    if (!proportion_1 || !proportion_2) return Utils.toast.info('缺少参数');

    let img = new window.Image();
    img.src = this.state.imgSrc;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // 正方形
      if (proportion_1 === proportion_2) {
        trackerWidth = winWidth / 2;
        trackerHeight = trackerWidth;
      }

      // 横向
      if (proportion_1 > proportion_2) {
        trackerWidth = winWidth * 0.96;
        trackerHeight = trackerWidth / proportion_1 * proportion_2;
      }

      imgWidth = winWidth;
      imgHeight = winWidth / width * height;

      this.setState({
        winWidth,
        winHeight,
        imgWidth,
        imgHeight,
        trackerWidth,
        trackerHeight,
      }, () => {
        this.initHammer();
      });
    }
  }

  initHammer() {
    let tracker = document.getElementById('editImg-tracker');
    let img = document.getElementById('editImg-img');
    if (!tracker || !img) return;

    this.hammertime = new Hammer(tracker, { domEvents: true });
    this.hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    let starX = 0;
    let starY = 0;
    let imgWidth = 0;
    let imgHeight = 0;
    let trackerLeft = tracker.offsetLeft;
    let trackerTop = tracker.offsetTop;
    let trackerWidth = this.state.trackerWidth;
    let trackerHeight = this.state.trackerHeight;

    // 平移
    this.hammertime.on("panstart", () => {
      starX = img.offsetLeft;
      starY = img.offsetTop;
      imgWidth = img.width;
      imgHeight = img.height;
    });

    this.hammertime.on("panmove", e => {
      img.style.left = starX + e.deltaX + 'px';
      img.style.top = starY + e.deltaY + 'px';
    });

    this.hammertime.on("panend", e => {
      let imgLeft = img.offsetLeft;
      let imgTop = img.offsetTop;
      
      if (imgLeft > trackerLeft) {
        img.style.left = trackerLeft + 'px';
      }
      if (imgTop > trackerTop) {
        img.style.top = trackerTop + 'px';
      }
      if (this.state.winWidth - imgWidth - imgLeft > trackerLeft) {
        img.style.left = -(trackerLeft - (this.state.winWidth - imgWidth)) + 'px';
      }
      if (this.state.winHeight - imgHeight - imgTop > trackerTop) {
        img.style.top = - (trackerTop - (this.state.winHeight - imgHeight)) + 'px';
      }  
    });

    // 缩放
    this.hammertime.get('pinch').set({ enable: true });

    this.hammertime.on("pinchstart",  e => {
      imgWidth = img.width;
      imgHeight = img.height;
    });

    let setImgStyle = (w, h) => {
      img.style.width = w + 'px';
      img.style.height = h + 'px';
      img.style.left = (this.state.winWidth - w) / 2 + 'px';
      img.style.top = (this.state.winHeight - h) / 2 + 'px';
    }

    this.hammertime.on("pinchmove", e => {
      let w = imgWidth * e.scale;
      let h = imgHeight * e.scale;
      setImgStyle(w, h);
    });

    this.hammertime.on("pinchend", e => {
      imgWidth = imgWidth * e.scale;
      imgHeight = imgHeight * e.scale;
      let scale = imgWidth / imgHeight;
      if (imgWidth < trackerWidth) {
        imgWidth = trackerWidth;
        imgHeight = imgWidth / scale;
        setImgStyle(imgWidth, imgHeight);
      }
      if (imgHeight < trackerHeight) {
        imgHeight = trackerHeight;
        imgWidth = imgWidth * scale;
        setImgStyle(imgWidth, imgHeight);
      }  
    });
  }

  // 裁剪图片
  handleImg() {
    let tracker = document.getElementById('editImg-tracker');
    let img = document.getElementById('editImg-img');
    let naturalWidth = img.naturalWidth;
    let naturalHeight = img.naturalHeight;
    let imgWidth = img.clientWidth;
    let scale = naturalWidth / imgWidth;

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = tracker.clientWidth * scale;
    canvas.height = tracker.clientHeight * scale;

    let x = (tracker.offsetLeft - img.offsetLeft) * scale;
    let y = (tracker.offsetTop - img.offsetTop) * scale;

    let newImg = new Image();
    newImg.src = this.state.imgSrc;
    newImg.onload = () => {
      ctx.drawImage(newImg, x, y, naturalWidth, naturalHeight, 0, 0, naturalWidth, naturalHeight);
      this.props.emitImg && this.props.emitImg(canvas.toDataURL("image/jpeg"));
    }
  }

  render() {
    if (!this.props.imgSrc && !this.state.imgWidth) return null;

    return (
      <div className="editImg">
        <div className="editImg-mask"></div>
        <img src={this.state.imgSrc} className="editImg-img" id="editImg-img" style={{ width: this.state.imgWidth + 'px', height: + this.state.imgHeight + 'px', left: 0, top: (this.state.winHeight - this.state.imgHeight) / 2 + 'px'}} alt="图片" />
        <div className="editImg-tracker" id="editImg-tracker" style={{ width: this.state.trackerWidth + 'px', height: + this.state.trackerHeight + 'px', left: (this.state.winWidth - this.state.trackerWidth) / 2 + 'px', top: (this.state.winHeight - this.state.trackerHeight) / 2 + 'px'}}></div>
        <div className="editImg-btn" onClick={() => this.handleImg()}>确定</div>
      </div>
    );
  }
}

export default Editimg; 