import React from 'react';
import './stepTwo.css';
import Utils from '../../../common/Utils';
import { Input, TextArea } from '../../../components/componentList/componentList';

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
},{
  id: 4,
  name: '懒窝',
  select: false,
}];

class Steptwo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
      lable: [...slable],
    }
  }

  componentDidMount() {
    this.init();
  }

  init() {
    let itemId = Number(Utils.getUrlParams('itemId')) || null;
    let isDraft = Utils.getUrlParams('isDraft') || null;

    if (isDraft) {
      let store = localStorage.getItem('nest_draft');
      store = store ? JSON.parse(store) : [];
      let idx = store.findIndex(item => item.id === itemId);

      if (idx > -1) {
        store = store[idx];

        this.setState({
          name: store.info.name,
          info: store.info.info,
        });
      }
    }
  }

  componentWillUnmount() {
    this.removeModal(this.addLableModal);
  }

  removeModal(node) {
    node && node.parentNode && node.parentNode.removeChild(node);
  }

  selectLable(idx) {
    let lable = JSON.parse(JSON.stringify(this.state.lable));
    lable[idx].select = !lable[idx].select;
    this.setState({ lable});
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
    setTimeout(() => {
      document.getElementById('slbAddLable').focus();
    }, 300);
  }

  getLable() {
    let arr = [];

    this.state.lable.forEach((val, idx) => {
      arr.push(<div key={idx} className={val.select ? 'active' : ''} onClick={() => this.selectLable(idx)}>{val.name}</div>);
    });

    return(
      <div className="stepTwo-lable-box">
        <div className="slb-title">小窝标签</div>
        <div className="slb-tips">选择合适你的小窝标签，标签能快速让人发现一样的你，你还可以自定义标签</div>
        <div className="slb-lable-box">{arr}</div>
        <div className="slb-add-lable" onClick={() => this.addLable()}>+自定义</div>
      </div>
    );
  }

  handlePrevStep() {
    this.resetLableData().then(info => {
      this.props.prevStep && this.props.prevStep(info);
    });
  }

  handleSaveDraft() {
    this.resetLableData().then(info => {
      this.props.saveDraft && this.props.saveDraft(info);
    });
  }

  handleShare() {

  }

  resetLableData() {
    return new Promise((resolve, reject) => {
      let info = {
        name: this.state.name,
        info: this.state.info,
        lable: this.state.lable.filter(item => item.select),
      }
      resolve(info);
    });
  }

  render() {
    return (
      <div className={'stepTwo' + (this.props.step !== 2 ? ' hidden' : '')}>
        <div className="stepTwo-input-box">
          <Input placeholder='小窝名称（必填项）' val={this.state.name} value={e => this.setState({ name: e })} />
          <TextArea placeholder='小窝简介' val={this.state.info} value={e => this.setState({ info: e })} />
        </div>
        {this.getLable()}
        <div className="eso-btns">
          <div onClick={() => this.handlePrevStep()}>上一步</div>
          <div onClick={() => this.handleSaveDraft()}>保存草稿</div>
          <div onClick={() => this.handleShare()}>分享</div>
        </div>
      </div>
    );
  }

}

export default Steptwo; 