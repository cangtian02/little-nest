import React from 'react';
import './setting.css';
import Utils from '../../common/Utils';
import Picker from '../../components/picker/picker';

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
      lable: [...slable, ...slable, ...slable],
    }
  }

  componentDidMount() {

  }

  selectLable(idx) {
    let lable = JSON.parse(JSON.stringify(this.state.lable));
    lable[idx].select = !lable[idx].select;
    this.setState({ lable });
  }

  addLable() {
    Utils.toast.modal({
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
    setTimeout(() => {
      document.getElementById('setAddLable').focus();
    }, 20);
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
            <div className="r"><img src="./img/pic.jpg" alt="" /></div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">昵称</div>
            <div className="r">用户昵称</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">性别</div>
            <div className="r">男</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">职业</div>
            <div className="r">设计师</div>
          </div>
          <div className="set-item borderBottom">
            <div className="l">生日</div>
            <div className="r" onClick={() => this.handlePicker('day')}>1995-02-22</div>
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
          <div onClick={() => this.handleCancel()}>取消</div>
          <div onClick={() => this.handleSave()}>保存</div>
        </div>
      </div>
    );
  }

  handlePicker(type) {
    Picker();
  }

  handleCancel() {

  }

  handleSave() {

  }

}

export default Setting; 