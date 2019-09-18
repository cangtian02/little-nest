import React from 'react';
import './editData.css';
import StepOne from '../stepOne/stepOne';
import StepTwo from '../stepTwo/stepTwo';
import Utils from '../../../common/Utils';

class Editdata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      lableData: null,
      info: null,
    }

    this.itemId = null;
    this.isDraft = null;
    this.draftId = null;
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.itemId = Number(Utils.getUrlParams('itemId')) || null;
    this.isDraft = Utils.getUrlParams('isDraft') || null;

    if (this.isDraft) {
      this.draftId = this.itemId;

      let store = localStorage.getItem('nest_draft');
      store = store ? JSON.parse(store) : [];
      let idx = store.findIndex(item => item.id === this.draftId);

      if (idx > -1) {
        this.setState({
          lableData: store[idx].lableData,
          info: store[idx].info,
        });
      }
    }
  }

  nextStep(lableData) {
    this.setState({
      step: 2,
      lableData: lableData,
    });
  }

  prevStep(info) {
    this.setState({
      step: 1,
      info: info,
    });
  }

  saveDraft(type, val) {
    if (type === 'one') {
      if (!this.state.info || this.state.info.name === '') return Utils.toast.info('请点击下一步输入小窝名称');

      this.savaDraftFunc({
        lableData: this.resetData(1, val),
        info: this.resetData(2, this.state.info)
      });
    }

    if (type === 'two') {
      this.savaDraftFunc({
        lableData: this.resetData(1, this.state.lableData),
        info: this.resetData(2, val)
      });
    }
  }

  savaDraftFunc(obj) {
    let store = localStorage.getItem('nest_draft');
    store = store ? JSON.parse(store) : [];

    if (store.length >= 3) return Utils.toast.info('小窝草稿最多保存3个');

    if (!this.draftId) this.draftId = new Date().getTime();

    obj.id = this.draftId;
    obj.img = this.props.imgSrc;

    let idx = store.findIndex(item => item.id === this.draftId);
    idx > -1 ? store[idx] = obj : store.unshift(obj);

    localStorage.setItem('nest_draft', JSON.stringify(store));
    Utils.toast.info('保存成功');
  }

  resetData(type, data) {
    if (type === 1) {
      return data;
    }

    if (type === 2) {
      let obj = {};
      if (data.name) obj.name = data.name;
      if (data.info) obj.name = data.info;
      if (data.lable && data.lable.length > 0) obj.lable = data.lable;
      return obj;
    }
  }

  render() {
    return (
      <div className="editData">
        <StepOne step={this.state.step} imgSrc={this.props.imgSrc} info={this.state.info} nextStep={e => this.nextStep(e)} saveDraft={e => this.saveDraft('one', e)} />
        <StepTwo step={this.state.step} imgSrc={this.props.imgSrc} lableData={this.state.lableData} prevStep={e => this.prevStep(e)} saveDraft={e => this.saveDraft('two', e)} />
      </div>
    );
  }

}

export default Editdata; 