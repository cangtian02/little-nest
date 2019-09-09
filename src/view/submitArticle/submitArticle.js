import React from 'react';
import './submitArticle.css';
import Utils from '../../common/Utils';
import EditImg from '../../components/editImg/editImg';
import LightBox from '../../components/lightBox/lightBox';

const slable = [{
  id: 1,
  name: '简约',
  select: false,
}, {
  id: 2,
  name: '暖色',
  select: false,
}, {
  id: 3,
  name: '极客范',
  select: false,
}, {
  id: 4,
  name: '懒窝',
  select: false,
}];

class Submitarticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      img: [],
      emitImg: '',
      name: '',
      info: '',
      lable: [...slable],
    }

    this.imgMinWidth = 760;
    this.imgMinHeight = 570;
    this.components = [];

    this.itemId = null;
    this.isDraft = null;
    this.draftId = null;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.components.forEach(val => this.removeModal(val));
  }

  removeModal(node) {
    node && node.parentNode && node.parentNode.removeChild(node);
  }

  init() {
    this.itemId = Number(Utils.getUrlParams('itemId')) || null;
    this.isDraft = Utils.getUrlParams('isDraft') || null;

    if (this.isDraft) {
      this.draftId = this.itemId;

      let store = localStorage.getItem('article_draft');
      store = store ? JSON.parse(store) : [];
      let idx = store.findIndex(item => item.id === this.draftId);
      
      if (idx > -1) {
        let img = store[idx].img;
        let name = store[idx].name;
        let info = store[idx].info;

        this.draftLable = store[idx].lable;

        this.resetDraft();

        this.setState({
          img, name, info
        });
      }
    }
  }

  resetDraft() {
    if (this.isDraft) {
      let arr1 = [];
      let lable = JSON.parse(JSON.stringify(this.state.lable));

      this.draftLable.forEach(val => {
        if (val.isCustom) {
          arr1.push(val);
        } else {
          let idx = lable.findIndex(item => item.id === val.id);
          if (idx > -1) lable[idx].select = true;
        }
      });

      lable = [...arr1, ...lable];
      this.setState({ lable });
    }
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
    img.src = windowURL.createObjectURL(file);

    img.onload = () => {
      loading.parentNode.removeChild(loading);

      if (img.width < this.imgMinWidth) {
        Utils.toast.info('图片最小宽度' + this.imgMinWidth + '像素');
        return;
      }

      if (img.height < this.imgMinHeight) {
        Utils.toast.info('图片最小高度' + this.imgMinHeight + '像素');
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

  handleImg(i) {
    this.lightBox = new LightBox({
      list: this.state.img,
      activeIndex: i,
    });
    this.components.push(this.lightBox);
  }

  handleDelImg(i) {
    let img = JSON.parse(JSON.stringify(this.state.img));
    img.splice(i, 1);
    this.setState({ img });
  }

  getImgList() {
    let arr = [];
    
    this.state.img.forEach((val, i) => {
      arr.push(
        <div className="i" key={i}>
          <span className="iconfont icon-delete-s del-span" onClick={() => this.handleDelImg(i)}></span>
          <img src={val} alt="" onClick={() => this.handleImg(i)} />
        </div>
      );
    });

    return (
      <div className="sba-imgs">
        {arr}
        <div className="i span">
          <span className="iconfont icon-tianjia add-span"></span>
          <input type="file" id="sba-img-input" accept="image/*" onChange={e => this.changeSelectImg(e)} />
        </div>
      </div>
    );
  }

  handleEmitImg(src) {
    let img = this.state.img;
    img.push(src);
    this.setState({ 
      img: img,
      emitImg: ''
    });
  }

  handleName(name) {
    this.setState({ name });
  }

  handleInfo(info) {
    this.setState({ info });
  }

  selectLable(idx) {
    let lable = JSON.parse(JSON.stringify(this.state.lable));
    lable[idx].select = !lable[idx].select;
    this.setState({ lable });
  }

  addLable() {
    this.addLableModal = Utils.toast.modal({
      message: '<input class="slb-add-lable-input" id="slbAddLable" placeholder="标签名称" />',
      onOk: () => {
        let name = document.getElementById('slbAddLable').value;
        if (name === '') {
          Utils.toast.info('请输入标签名称');
          return;
        }
        let lable = JSON.parse(JSON.stringify(this.state.lable));

        lable.unshift({
          id: 4,
          name: name,
          select: true,
          isCustom: true,
        });

        this.setState({ lable });
      },
    });
    this.components.push(this.addLableModal);
    setTimeout(() => {
      document.getElementById('slbAddLable').focus();
    }, 300);
  }

  getLable() {
    let arr = [];

    this.state.lable.forEach((val, idx) => {
      arr.push(<div key={idx} className={val.select ? 'active' : ''} onClick={() => this.selectLable(idx)}>{val.name}</div>);
    });

    return (
      <div className="stepTwo-lable-box">
        <div className="slb-title">文章标签</div>
        <div className="slb-tips">选择合适你的文章标签，标签能快速让人发现一样的你，你还可以自定义标签</div>
        <div className="slb-lable-box">{arr}</div>
        <div className="slb-add-lable" onClick={() => this.addLable()}>+自定义</div>
      </div>
    );
  }

  render() {
    return (
      <div className="submitArticle">
        {
          this.state.emitImg
          ?
            <EditImg imgSrc={this.state.emitImg} proportion={'4:3'} imgMinWidth={this.imgMinWidth} imgMinHeight={this.imgMinHeight} emitImgWidth={1920} emitImgHeight={1440} quality={0.7} emitImg={src => this.handleEmitImg(src)} />
          :
            null
        }
        <div className="sba-title">选择图片</div>
        {this.getImgList()}
        <input className="sba-title-input" placeholder='请输入文章标题' value={this.state.name} onChange={e => this.handleName(e.target.value)} />
        <textarea className="sba-title-textarea" placeholder='请输入文章内容' value={this.state.info} onChange={e => this.handleInfo(e.target.value)}></textarea>
        {this.getLable()}
        <div className="sba-btns">
          <div onClick={() => this.handleSaveDraft()}>保存草稿</div>
          <div onClick={() => this.handleShare()}>发布</div>
        </div>
      </div>
    );
  }

  handleSaveDraft() {
    if (this.state.name === '') return Utils.toast.info('请输入标题');

    let store = localStorage.getItem('article_draft');
    store = store ? JSON.parse(store) : [];

    if (store.length >= 5) return Utils.toast.info('文章草稿最多保存5个');

    let lable = JSON.parse(JSON.stringify(this.state.lable));
    lable = lable.filter(item => item.select);

    if (!this.draftId) this.draftId = new Date().getTime();

    let obj = {
      id: this.draftId,
      img: this.state.img,
      name: this.state.name,
      info: this.state.info,
      lable: lable,
    };

    let idx = store.findIndex(item => item.id === this.draftId);
    if (idx > -1) {
      store[idx] = obj;
    } else {
      store.unshift(obj);
    }

    localStorage.setItem('article_draft', JSON.stringify(store));
    Utils.toast.info('保存成功');
  }

  handleShare() {

  }
  
}

export default Submitarticle;