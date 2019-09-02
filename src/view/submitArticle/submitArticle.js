import React from 'react';
import './submitArticle.css';
import Utils from '../../common/Utils';
import EditImg from '../../components/editImg/editImg';

class Submitarticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgs: [0],
      emitImg: ''
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
    let imgMaxSize = 1024 * 1024 * 10;
    let imgMinWidth = 900;
    let imgMinHeight = 675;
    img.src = windowURL.createObjectURL(file);

    img.onload = () => {
      loading.parentNode.removeChild(loading);

      if (img.width < imgMinWidth) {
        Utils.toast.info('图片最小宽度' + imgMinWidth + '像素');
        return;
      }

      if (img.height < imgMinHeight) {
        Utils.toast.info('图片最小高度' + imgMinHeight + '像素');
        return;
      }

      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      this.setState({
        emitImg: canvas.toDataURL(file.type, file.size > imgMaxSize ? imgMaxSize / file.size : 1)
      });
    }
  }

  getImgList() {
    let arr = [];
    
    this.state.imgs.forEach((val, i) => {
      arr.push(
        <div className="i" key={i}><img src="./img/1.jpg" alt="" /></div>
      );
    });

    return (
      <div className="sba-imgs">
        {arr}
        <div className="i span">
          <span className="iconfont icon-tianjia"></span>
          <input type="file" id="sba-img-input" accept="image/*" onChange={e => this.changeSelectImg(e)} />
        </div>
      </div>
    );
  }

  handleEmitImg(src) {
    console.log(src);
    let imgs = this.state.imgs;
    imgs.push(src);
    this.setState({ imgs });
  }

  render() {
    return (
      <div className="submitArticle">
        {
          this.state.emitImg
          ?
            <EditImg imgSrc={this.state.emitImg} proportion={'4:3'} emitImgWidth={1920} emitImgHeight={1440} quality={0.7} emitImg={src => this.handleEmitImg(src)} />
          :
            null
        }
        <div className="sba-title">选择图片</div>
        {this.getImgList()}
      </div>
    );
  }
}

export default Submitarticle; 