import React from 'react';
import './editData.css';
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

class Editdata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      lableData: [originalLableData],
      lableIndex: 0,
    }
  }

  componentDidMount() {

  }

  switchLableIndex(idx) {
    if (idx !== this.state.lableIndex) {
      this.setState({
        lableIndex: idx,
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

  updateLableData(val, idx) {
    let lableData = JSON.parse(JSON.stringify(this.state.lableData));
    lableData[this.state.lableIndex][idx].value = val;
    this.setState({lableData});
  }

  deleteLable() {
    Utils.toast.modal({
      message: '确定删除此标签？',
      onOk: () => {
        let lableData = JSON.parse(JSON.stringify(this.state.lableData));
        lableData.splice(this.state.lableIndex, 1);
        let lableIndex = this.state.lableIndex > 0 ? this.state.lableIndex - 1 : 0;
        this.setState({ 
          lableData,
          lableIndex
        });
      },
    });
  }

  addLableData() {
    Utils.toast.modal({
      message: '<input class="add-lable-data" id="addLableData" placeholder="标签名称" /><div class="add-lable-data-tips">添加标签名称后不填写内容将不会展示</div>',
      onOk: () => {
        let name = document.getElementById('addLableData').value;
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

        this.setState({lableData});
      },
    });
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

  addLable() {
    let lableData = JSON.parse(JSON.stringify(this.state.lableData));
    lableData.push(originalLableData);
    let lableIndex = this.state.lableIndex + 1;
    this.setState({ lableData, lableIndex }, () => {
      // 如果增加的标签出了滚动条就滚动到最后
      let header = document.getElementById('eso-tab-header');
      let winWidth = window.innerWidth;
      let w = header.childNodes[0].clientWidth * header.childNodes.length
      if (w > winWidth) header.scrollTo(w, 0);
    });
  }

  stepOneView() {
    if (this.state.step !== 1) return null;

    return (
      <div className="ed-step-one">
        <img src={this.props.imgSrc} alt="img" className="eso-img-box_img" />
        <div className="eso-img-box">
          <img src={this.props.imgSrc} alt="img" className="eso-img-box_img" />
          <div className="eso-img-box_btn" onClick={() => this.addLable()}><span className="iconfont icon-tianjia"></span></div>
          <div className="eso-img-box_lablebox"></div>
        </div>
        {this.getTabHeader()}
        {this.getTabContent()}
        <div className="eso-btns">
          <div>保存草稿</div>
          <div onClick={() => this.handleNextStep()}>下一步</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="editData">
        {this.stepOneView()}
      </div>
    );
  }

  handleNextStep() {
    console.log(this.state.lableData)
  }

}

export default Editdata; 