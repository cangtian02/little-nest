import React from 'react';
import './selectImg.css';
import Utils from '../../common/Utils';

class Selectimg extends React.Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {

  }

  changeSelectImg(evt) {
    let loading = Utils.toast.loading();
    let file = evt.target.files[0];

    if (['jpeg', 'png', 'jpg'].indexOf(file.type.split("/")[1]) < 0) {
      Utils.toast.info('文件类型仅支持 jpeg/png/jpg');
      loading.parentNode.removeChild(loading);
      return;
    }

    let img = new window.Image();
    let windowURL = window.URL || window.webkitURL;
    let imgMaxSize = 1024 * 1024 * this.props.imgMaxSize;
    img.src = windowURL.createObjectURL(file);

    img.onload = () => {
      loading.parentNode.removeChild(loading);

      if (this.props.imgMinWidth && img.width < this.props.imgMinWidth) {
        Utils.toast.info('图片最小宽度' + this.props.imgMinWidth + '像素');
        return;
      } 

      if (this.props.imgMinHeight && img.height < this.props.imgMinHeight) {
        Utils.toast.info('图片最小高度' + this.props.imgMinHeight + '像素');
        return;
      } 

      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      this.props.imgSrc && this.props.imgSrc(canvas.toDataURL(file.type, file.size > imgMaxSize ? imgMaxSize / file.size : 1));
    }
  }

  render() {
    return (
      <div className="select-img-box">
        <span className="iconfont icon--tupian"></span>
        <p>点击上传图片</p>
        <em>{this.props.tips}</em>
        <input type="file" id="select-img-input" accept="image/*" onChange={e => this.changeSelectImg(e)} />
      </div>
    );
  }
}

export default Selectimg; 