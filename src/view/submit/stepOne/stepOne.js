import React from 'react';
import './stepOne.css';
import Utils from '../../../common/Utils';
import { Input, TextArea } from '../../../components/componentList/componentList';

const originalLableData = [
  {
    name: '名称',
    value: '',
    type: 'input',
    must: true,
  }, {
    name: '品牌',
    value: '',
    type: 'input',
    must: false,
  }, {
    name: '型号',
    type: 'input',
    value: '',
    must: false,
  }, {
    name: '简介',
    value: '',
    type: 'textarea',
    must: false,
  }
];

class Stepone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      load: false,
      lableData: [originalLableData],
      lableIndex: 0,
    }

    this.imgInfo = null;
  }

  componentDidMount() {
    let img = new Image();
    img.src = this.props.imgSrc;
    img.onload = () => {
      this.imgInfo = img;
      this.setState({
        load: true,
      }, () => {
        this.lableBoxAdd();
        // 监听全局点击事件，收回摇杆
        document.addEventListener("click", event => {
          let cDom = document.getElementById('eso-lable-btn-active');
          let tDom = event.target;
          if (cDom === tDom || (cDom && cDom.contains(tDom))) {
            
          } else {

          }
        });

        document.getElementById('eso-lable-box').addEventListener('touchstart', this.esoLableBoxFunc, false);
      });
    }
  }

  componentWillUnmount() {
    document.getElementById('eso-lable-box').removeEventListener('touchstart', this.esoLableBoxFunc, false);
    document.getElementById('eso-lable-btn-active').removeEventListener('touchmove', this.lableMove, false);
  }

  esoLableBoxFunc(e) {
    e.preventDefault();
  }

  lableBoxAdd() {
    let box = document.getElementById('eso-lable-box');

    if (box.children.length > 0) {
      document.getElementById('eso-lable-btn-active').removeEventListener('touchmove', this.lableMove, false);
      for (let i = 0; i < box.children.length; i++) {
        box.children[i].removeAttribute('class');
        box.children[i].removeAttribute('id');
      }
    }

    let div = document.createElement('div');
    div.setAttribute('class', 'active');
    div.setAttribute('id', 'eso-lable-btn-active');
    div.style.left = (window.innerWidth - 20) / 2  + 'px';
    div.style.top = (box.clientHeight - 20) / 2 + 'px';
    box.appendChild(div);

    div.addEventListener('touchmove', this.lableMove, false);

    for (let i = 0; i < box.children.length; i++) {
      box.children[i].addEventListener('click', () => {
        if (i !== this.lableIndex) this.switchLableIndex(i);
      });
    }
  }

  lableMove(e) {
    let id = document.getElementById('eso-lable-btn-active');
    let box = document.getElementById('eso-lable-box');
    let winWidth = window.innerWidth;
    let imgHeight = box.clientHeight;
    let labelWidth = id.clientWidth;
    let labelHeight = id.clientHeight;
    let touchOne = e.changedTouches[0];
    let iMoveX = touchOne.pageX - labelWidth / 2;
    let iMoveY = touchOne.pageY - labelHeight / 2;

    if (iMoveX > 0 && iMoveY > 0 && iMoveX < winWidth - labelWidth && iMoveY < imgHeight - labelHeight) {
      id.style.left = iMoveX + 'px';
      id.style.top = iMoveY + 'px';
    }
  }

  switchLableIndex(idx) {
    if (idx !== this.state.lableIndex) {
      this.setState({
        lableIndex: idx,
      }, () => {
        document.getElementById('eso-lable-btn-active').removeEventListener('touchmove', this.lableMove, false);
        let box = document.getElementById('eso-lable-box');
        for (let i = 0; i < box.children.length; i++) {
          box.children[i].removeAttribute('class');
          box.children[i].removeAttribute('id');
        }
        box.children[idx].setAttribute('class', 'active');
        box.children[idx].setAttribute('id', 'eso-lable-btn-active');
        document.getElementById('eso-lable-btn-active').addEventListener('touchmove', this.lableMove, false);
      });
    }
  }

  getTabHeader() {
    let arr = [];
    this.state.lableData.forEach((val, idx) => {
      arr.push(<div key={idx} className={idx === this.state.lableIndex ? 'active' : ''} onClick={() => this.switchLableIndex(idx)}>标签{Utils.numberToZh(idx + 1)}</div>);
    });
    return <div className="eso-tab-header" id="eso-tab-header">{arr}</div>;
  }

  getTabContent() {
    let arr = [];

    this.state.lableData[this.state.lableIndex].forEach((val, idx) => {
      if (val.type === 'input') {
        arr.push(<Input key={idx} placeholder={val.name + (val.must ? '（必填项）' : '')} val={val.value} value={e => this.updateLableData(e, idx)} />);
      }
      if (val.type === 'textarea') {
        arr.push(<TextArea key={idx} placeholder={val.name + (val.must ? '（必填项）' : '')} val={val.value} value={e => this.updateLableData(e, idx)} />);
      }
    });

    return (
      <div className="eso-tab-content">
        {arr}
        <div className="eso-tab-content-btns">
          {
            this.state.lableData.length > 1
              ?
              <div onClick={() => this.deleteLable()}>删除此标签</div>
              :
              null
          }
          <div onClick={() => this.addLableData()}>添加更多信息</div>
        </div>
      </div>
    );
  }

  addLableData() {
    Utils.toast.modal({
      message: '<input class="eso-add-lable-input" id="esoAddLableData" placeholder="标签名称" /><div class="eso-add-lable-tips">添加标签名称后不填写内容将不会展示</div>',
      onOk: () => {
        let name = document.getElementById('esoAddLableData').value;
        if (name === '') {
          Utils.toast.info('请输入标签名称');
          return;
        }
        let lableData = JSON.parse(JSON.stringify(this.state.lableData));

        lableData[this.state.lableIndex].splice(lableData[this.state.lableIndex].length - 1, 0, {
          name: name,
          value: '',
          type: 'input',
          must: false,
        });

        this.setState({ lableData });
      },
    });
  }

  updateLableData(val, idx) {
    let lableData = JSON.parse(JSON.stringify(this.state.lableData));
    lableData[this.state.lableIndex][idx].value = val;
    this.setState({ lableData });
  }

  deleteLable() {
    Utils.toast.modal({
      message: '确定删除此标签？',
      onOk: () => {
        let lableData = JSON.parse(JSON.stringify(this.state.lableData));
        lableData.splice(this.state.lableIndex, 1);
        let lableIndex = this.state.lableIndex > 0 ? this.state.lableIndex - 1 : 0;
        let box = document.getElementById('eso-lable-box');

        document.getElementById('eso-lable-btn-active').removeEventListener('touchmove', this.lableMove, false);
        for (let i = 0; i < box.children.length; i++) {
          box.children[i].removeAttribute('class');
          box.children[i].removeAttribute('id');
          if (i === this.state.lableIndex) box.removeChild(box.children[i]);
        }
        box.children[lableIndex].setAttribute('class', 'active');
        box.children[lableIndex].setAttribute('id', 'eso-lable-btn-active');
        document.getElementById('eso-lable-btn-active').addEventListener('touchmove', this.lableMove, false);

        this.setState({
          lableData,
          lableIndex
        });
      },
    });
  }

  addLable() {
    let lableData = JSON.parse(JSON.stringify(this.state.lableData));
    lableData.push(originalLableData);
    let lableIndex = lableData.length - 1;
    this.setState({ lableData, lableIndex }, () => {
      // 如果增加的标签出了滚动条就滚动到最后
      let header = document.getElementById('eso-tab-header');
      let winWidth = window.innerWidth;
      let w = header.childNodes[0].clientWidth * header.childNodes.length;
      if (w > winWidth) header.scrollTo(w, 0);
      this.lableBoxAdd();
    });
  }

  handleNextStep() {
    this.resetLableData().then(lableData => {
      this.props.nextStep && this.props.nextStep(lableData);
    });
  }

  handleSaveDraft() {
    this.resetLableData().then(lableData => {
      // console.log(this.props.info)
      // console.log(lableData)
    });
  }

  resetLableData() {
    return new Promise((resolve, reject) => {
      let lableData = JSON.parse(JSON.stringify(this.state.lableData));
      let box = document.getElementById('eso-lable-box');
      for (let i = 0; i < box.children.length; i++) {
        let div = box.children[i];
        let scale = this.imgInfo.width / box.clientWidth;
        let pos = {
          x: parseInt(div.offsetLeft * scale),
          y: parseInt(div.offsetTop * scale),
        }
        lableData[i].push({ pos: pos });
      }
      resolve(lableData);
    });
  }

  render() {
    return (
      <div className={'ed-step-one' + (this.props.step !== 1 && this.state.load ? ' hidden' : '')}>
        <img src={this.props.imgSrc} alt="img" className="eso-img-box_img" />
        <div className="eso-img-box">
          <img src={this.props.imgSrc} alt="img" className="eso-img-box_img" />
          <div className="eso-img-box_btn" onClick={() => this.addLable()}><span className="iconfont icon-tianjia"></span></div>
          <div className="eso-img-box_lablebox" id="eso-lable-box"></div>
        </div>
        {this.getTabHeader()}
        {this.getTabContent()}
        <div className="eso-btns">
          <div onClick={() => this.handleSaveDraft()}>保存草稿</div>
          <div onClick={() => this.handleNextStep()}>下一步</div>
        </div>
      </div>
    );
  }
  
}

export default Stepone; 