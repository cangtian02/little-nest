import React from 'react';
import './setting.css';
import Utils from '../../common/Utils';
import Picker from '../../components/picker/picker';
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

class Setting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {
        name: '昵称',
      },
      lable: [...slable, ...slable, ...slable],
    }

    this.components = [];
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.components.forEach(val => this.removeModal(val));
  }

  removeModal(node) {
    node && node.parentNode && node.parentNode.removeChild(node);
  }

  selectLable(idx) {
    let lable = JSON.parse(JSON.stringify(this.state.lable));
    lable[idx].select = !lable[idx].select;
    this.setState({ lable });
  }

  addLable() {
    let modal = Utils.toast.modal({
      message: '<input class="set-add-lable-input" id="setAddLable" placeholder="标签名称" />',
      onOk: () => {
        let name = document.getElementById('setAddLable').value;
        if (name === '') {
          Utils.toast.info('请输入标签名称');
          return;
        }
        let lable = JSON.parse(JSON.stringify(this.state.lable));

        lable.unshift({
          id: 4,
          name: name,
          select: true,
        });

        this.setState({ lable });
      },
    });
    this.components.push(modal);
    setTimeout(() => {
      document.getElementById('setAddLable').focus();
    }, 300);
  }
  
  getLable() {
    let arr = [];

    this.state.lable.forEach((val, idx) => {
      arr.push(<div key={idx} className={val.select ? 'active' : ''} onClick={() => this.selectLable(idx)}>{val.name}</div>);
    });

    return (
      <div className="set-lable-content">
        <div className="set-lable-box">{arr}</div>
        <div className="set-add-lable" onClick={() => this.addLable()}>+自定义</div>
      </div>
    );
  }

  render() {
    return (
      <div className="setting">
        <div className="set-item-box">
          <div className="set-item userIcon borderBottom">
            <div className="l">头像</div>
            <div className="r" onClick={() => this.handleIcon()}><img src="./img/pic.jpg" alt="" /></div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">昵称</div>
            <div className="r">
              <input placeholder={'昵称'} value={this.state.info.name} onChange={e => this.updateData('name', e.target.value)} />
            </div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">性别</div>
            <div className="r" onClick={() => this.handlePicker('gender')}>男</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">职业</div>
            <div className="r">
              <input placeholder={'职业'} value={'设计师'} onChange={e => this.updateData('name', e.target.value)} />
            </div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">生日</div>
            <div className="r" onClick={() => this.handlePicker('date')}>1995-02-22</div>
          </div>
        </div>
        <div className="set-title">个人简介</div>
        <div className="set-info-box">
          <textarea placeholder="~太懒了，啥也不留，emmmm！！！！"></textarea>
        </div>
        <div className="set-title">个性标签</div>
        <div className="set-lable-tips">选择属于你的标签，让更多人欣赏你的小窝~</div>
        {this.getLable()}
        <div className="set-save-btns">
          <div onClick={() => this.handleSave()}>保存</div>
        </div>
      </div>
    );
  }

  handleIcon() {
    let lightBox = new LightBox({
      imgUrl: 'https://avatars1.githubusercontent.com/u/28089159?s=460&v=4',
    });

    this.components.push(lightBox);
  }

  updateData(key, val) {
    let info = this.state.info;
    info[key] = val;
    this.setState({ info });
  }

  handlePicker(type) {
    let defaultIndex = [];
    let defaultDate = '';

    if (type === 'gender') defaultIndex = [1];
    if (type === 'date') defaultDate = '2019-08-21';
    
    let picker = Picker({
      type: type,
      defaultIndex: defaultIndex,
      defaultDate: defaultDate,
      onOk: (val, indx) => {
        console.log(val)
        console.log(indx)
      }
    });

    this.components.push(picker);
  }

  handleSave() {

  }

}

export default Setting; 