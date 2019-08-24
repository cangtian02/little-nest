import React from 'react';
import './setting.css';
import Utils from '../../common/Utils';
import Picker from '../../components/picker/picker';
import LightBox from '../../components/lightBox/lightBox';
import UpdateIcon from './updateIcon/updateIcon';
import EditImg from '../../components/editImg/editImg';

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
        icon: 'https://avatars1.githubusercontent.com/u/28089159?s=460&v=4',
        name: '昵称',
        occupation: '设计师',
      },
      lable: [...slable, ...slable, ...slable],
      toggleUpateIconBtn: false,
      changeIconSrc: '',
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
            <div className="r" onClick={() => this.handleIcon()}><img src={this.state.info.icon} alt="" /></div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">昵称</div>
            <div className="r" onClick={() => this.handleModal('name')}>
              {this.state.info.name}
            </div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">性别</div>
            <div className="r" onClick={() => this.handlePicker('gender')}>男</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">职业</div>
            <div className="r" onClick={() => this.handleModal('occupation')}>
              {this.state.info.occupation}
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
        <UpdateIcon toggle={this.state.toggleUpateIconBtn} click={() => this.handleUpdateIconClick()} change={src => this.handleUpdateIconChange(src)} />
        {
          this.state.changeIconSrc
          ?
            <EditImg imgSrc={this.state.changeIconSrc} proportion={'1:1'} emitImgWidth={800} emitImgHeight={800} quality={0.7} emitImg={src => this.updateIconFunc(src)} />
            :
            null
        }
      </div>
    );
  }

  updateIconFunc(src) {
    this.updateData('icon', src);
    this.setState({ changeIconSrc: '' });
  }

  handleUpdateIconClick() {
    this.lightBox && this.lightBox.parentNode && this.lightBox.parentNode.removeChild(this.lightBox);
    this.setState({
      toggleUpateIconBtn: false,
    });
  }

  handleUpdateIconChange(src) {
    this.setState({ changeIconSrc: src });
  }

  handleIcon() {
    this.lightBox = new LightBox({
      imgUrl: this.state.info.icon,
      handleCloseFunc: () => {
        this.handleUpdateIconClick();
      }
    });

    this.components.push(this.lightBox);

    this.setState({ toggleUpateIconBtn: true });
  }

  updateData(key, val) {
    let info = this.state.info;
    info[key] = val;
    this.setState({ info });
  }

  handleModal(key) {
    let placeholder = key === 'name' ? '昵称' : '职业';
    let modal = Utils.toast.modal({
      message: '<input class="set-info-type-input" id="setInfoType" placeholder=' + placeholder + ' value=' + this.state.info[key] + ' />',
      onOk: () => {
        let value = document.getElementById('setInfoType').value;
        if (value === '') {
          Utils.toast.info('请输入' + placeholder);
          return;
        }

        this.updateData(key, value);
      },
    });
    this.components.push(modal);
    setTimeout(() => {
      let input = document.getElementById('setInfoType');
      input.focus();
      Utils.focusToLast(input);
    }, 300);
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