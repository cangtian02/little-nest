import React from 'react';
import Utils from '../../../common/Utils';
import './updateIcon.css';

class Updateicon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }


  changeSelectImg(evt) {
    this.props.click && this.props.click();

    let loading = Utils.toast.loading();
    let file = evt.target.files[0];

    if (['jpeg', 'png', 'jpg'].indexOf(file.type.split("/")[1]) < 0) {
      Utils.toast.info('文件类型仅支持 jpeg/png/jpg');
      loading.parentNode.removeChild(loading);
      return;
    }

    let img = new Image();
    let windowURL = window.URL || window.webkitURL;
    let imgMaxSize = 1024 * 1024 * 5;
    let imgMinWidth = 400;
    let imgMinHeight = 400;

    img.src = windowURL.createObjectURL(file);

    img.onload = () => {
      loading.parentNode.removeChild(loading);

      if (imgMinWidth && img.width < imgMinWidth) {
        Utils.toast.info('图片最小宽度' + imgMinWidth + '像素');
        return;
      }

      if (imgMinHeight && img.height < imgMinHeight) {
        Utils.toast.info('图片最小高度' + imgMinHeight + '像素');
        return;
      }

      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imgSrc = canvas.toDataURL(file.type, file.size > imgMaxSize ? imgMaxSize / file.size : 1);
      this.props.change && this.props.change(imgSrc);
    }
  }

  render() {
    if (!this.props.toggle) return null;

    return (
      <div className="set-updateIcon">
        修改头像
        <input type="file" accept="image/*" onChange={e => this.changeSelectImg(e)} />
      </div>
    );
  }
}

export default Updateicon; 