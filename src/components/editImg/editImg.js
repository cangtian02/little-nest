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

    this.imgRealWidth = 0;
    this.imgRealHeight = 0;
    this.img = null;
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

    this.img = new window.Image();
    this.img.src = this.state.imgSrc;
    this.img.onload = () => {
      let width = this.img.width;
      let height = this.img.height;

      this.imgRealWidth = width;
      this.imgRealHeight = height;

      // 正方形
      if (proportion_1 === proportion_2) {
        trackerWidth = winWidth / 1.2 > imgHeight ? imgHeight : winWidth / 1.2;
        trackerHeight = trackerWidth;
      }

      // 横向
      if (proportion_1 > proportion_2) {
        trackerWidth = winWidth * 0.96;
        trackerHeight = trackerWidth / proportion_1 * proportion_2;
      }

      if (winWidth / width * height >= trackerHeight) {
        imgWidth = winWidth;
        imgHeight = winWidth / width * height;
      } else {
        imgHeight = trackerHeight;
        imgWidth = width / (height / imgHeight);
      }

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
    if (this.hammertime) this.hammertime = null;

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
      this.imgPanend(img, trackerLeft, trackerTop, imgWidth, imgHeight);
    });

    // 缩放
    this.hammertime.get('pinch').set({ enable: true });

    this.hammertime.on("pinchstart",  e => {
      imgWidth = img.width;
      imgHeight = img.height;
    });

    let setImgStyle = (w, h, f) => {
      img.style.width = w + 'px';
      img.style.height = h + 'px';
      img.style.left = (this.state.winWidth - w) / 2 + 'px';
      img.style.top = (this.state.winHeight - h) / 2 + 'px';
      if (f) this.imgPanend(img, trackerLeft, trackerTop, imgWidth, imgHeight);
    }

    this.hammertime.on("pinchmove", e => {
      let w = imgWidth * e.scale;
      let h = imgHeight * e.scale;
      setImgStyle(w, h, false);
    });

    this.hammertime.on("pinchend", e => {
      imgWidth = imgWidth * e.scale;
      imgHeight = imgHeight * e.scale;
      if (imgWidth < trackerWidth || imgHeight < trackerHeight) {
        setImgStyle(this.state.imgWidth, this.state.imgHeight, true);
      } else {
        setImgStyle(imgWidth, imgHeight, true);
      }
    });
  }

  imgPanend(img, trackerLeft, trackerTop, imgWidth, imgHeight) {
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
  }

  handleRotateImg() {
    if (this.imgRealWidth < this.props.imgMinHeight || this.imgRealHeight < this.props.imgMinWidth) {
      return Utils.toast.info('图片宽高最小' + this.props.imgMinWidth + ' * ' + this.props.imgMinHeight); 
    }

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = this.imgRealHeight;
    canvas.height = this.imgRealWidth;
    ctx.translate(this.imgRealHeight, 0);
    ctx.rotate(90 * Math.PI / 180);
    ctx.drawImage(this.img, 0, 0);
    let src = canvas.toDataURL("image/jpeg");
    this.setState({
      imgSrc: src
    }, () => {
      this.initData();
    });
  }

  // 裁剪图片
  handleSavaImg() {
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

    ctx.drawImage(this.img, x, y, naturalWidth, naturalHeight, 0, 0, naturalWidth, naturalHeight);
    if (naturalWidth > this.props.emitImgWidth && naturalHeight > this.props.emitImgHeight) {
      this.cropImg(canvas.toDataURL("image/jpeg"), naturalWidth, naturalHeight);
    } else {
      this.props.emitImg && this.props.emitImg(canvas.toDataURL("image/jpeg"), this.props.quality || 1);
    }
  }

  cropImg(src) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    
    canvas.width = this.props.emitImgWidth;
    canvas.height = this.props.emitImgHeight;

    let img = new Image();
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.props.emitImgWidth, this.props.emitImgHeight);
      this.props.emitImg && this.props.emitImg(canvas.toDataURL("image/jpeg"), this.props.quality || 1);
    }
  }

  render() {
    if (!this.props.imgSrc && !this.state.imgWidth) return null;

    return (
      <div className="editImg">
        <div className="editImg-mask"></div>
        <img src={this.state.imgSrc} className="editImg-img" id="editImg-img" style={{ width: this.state.imgWidth + 'px', height: + this.state.imgHeight + 'px', left: 0, top: (this.state.winHeight - this.state.imgHeight) / 2 + 'px'}} alt="图片" />
        <div className="editImg-tracker" id="editImg-tracker" style={{ width: this.state.trackerWidth + 'px', height: + this.state.trackerHeight + 'px', left: (this.state.winWidth - this.state.trackerWidth) / 2 + 'px', top: (this.state.winHeight - this.state.trackerHeight) / 2 + 'px'}}></div>
        <div className="editImg-btns">
          <div className="r" onClick={() => this.handleRotateImg()}>旋转</div>
          <div className="r" onClick={() => this.handleSavaImg()}>确定</div>
        </div>
      </div>
    );
  }
}

export default Editimg; 