import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './picker.css';
import Data from './data';

class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classStr: '',
      selectedIndex: [],
      itemData: [],
    }

    this.wheels = [];
  }

  componentDidMount() {
    this.init();
  }

  init() {
    let itemData = [];
    let selectedIndex = [];
    if (this.props.type === 'gender') itemData = Data.gender();
    if (this.props.type === 'date') itemData = Data.date(this.props.defaultDate);
    if (this.props.defaultData.length > 0) itemData = this.props.defaultData;

    if (this.props.defaultIndex.length > 0) {
      selectedIndex = this.props.defaultIndex;
    } else {
      selectedIndex = this.getSelectedIndex(itemData);
    }

    this.setState({ 
      itemData, 
      selectedIndex 
    }, () => {
      setTimeout(() => {
        this.setState({
          classStr: 'm-picker-show',
        }, () => {
          this.initWheel();
        });
      }, 20);
    });
  }

  getSelectedIndex(itemData) {
    let selectedIndex = [];

    if (this.props.type === 'date') {
      selectedIndex.push(99);
      let date = this.props.defaultDate.split('-');
      selectedIndex.push(Number(date[1]) - 1);
      selectedIndex.push(Number(date[2]) - 1);
    } else {
      itemData.forEach(val => selectedIndex.push(0));
    }
    
    return selectedIndex;
  }

  getBScrollConfig(selectedIndex) {
    return {
      probeType: 3,
      wheel: {
        selectedIndex: selectedIndex,
        rotate: 25,
        adjustTime: 100,
        wheelWrapperClass: 'm-picker-ul',
        wheelItemClass: 'm-picker-item',
        wheelDisabledItemClass: 'wheel-disabled-item',
      }
    }
  }

  initWheel() {
    const list = document.getElementsByClassName('m-picker-list');

    for (let i = 0; i < list.length; i++) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(list[i], this.getBScrollConfig(this.state.selectedIndex[i]));
      } else {
        this.wheels[i].refresh();
      }

      this.wheels[i].on('scrollEnd', () => {
        let selectedIndex = [...this.state.selectedIndex];
        let itemData = [...this.state.itemData];
        selectedIndex[i] = this.wheels[i].getSelectedIndex();
        if (this.props.type === 'date' && i === 0) {
          itemData[0] = Data.getYear(this.state.itemData[0][selectedIndex[0]].val);
          selectedIndex[0] = 99;
        }

        this.setState({ itemData, selectedIndex }, () => {
          if (i === 0 && this.props.type === 'date') {
            this.wheels[i] = null;
            this.wheels[i] = new BScroll(list[i], this.getBScrollConfig(this.state.selectedIndex[i]));
          }
        });
      });
    }
  }

  getItem() {
    let arr1 = [];

    this.state.itemData.forEach((val1, i) => {
      let arr2 = [];
      val1.forEach((val2, j) => {
        arr2.push(<div className="m-picker-item" key={j}>{val2.text}</div>);
      });
      arr1.push(
        <div className="m-picker-list" key={i}>
          <ul className="m-picker-ul">{arr2}</ul>
          <div className="m-picker-line m-picker-line-top"></div>
          <div className="m-picker-line m-picker-line-bot"></div>
        </div>
      );
    });

    return arr1;
  }

  handleFunc() {
    let arr = [];
    this.state.itemData.forEach((val, i) => {
      arr.push(val[this.state.selectedIndex[i]]);
    });
    this.props.onOk && this.props.onOk(arr, this.state.selectedIndex);
    this.handleHide();
  }

  handleHide() {
    this.setState({
      classStr: 'm-picker-hide',
    }, () => {
      setTimeout(() => {
        this.removeDom();
      }, 100);
    });
  }

  removeDom() {
    if (this.props.element) document.body.removeChild(this.props.element);
  }

  render() {
    if (this.state.itemData.length === 0) return null;

    let dom = <div className={"m-picker " + this.state.classStr}>
      <div className="m-picker-mask" onClick={() => this.handleHide()}></div>
      <div className="m-picker-body">
        <div className="m-picker-header"><p onClick={() => this.handleFunc()}>确定</p></div>
        <div className="m-picker-content">
          {this.getItem()}
        </div>
      </div>
    </div>;

    return ReactDOM.createPortal(dom, this.props.element);
  }
}

Picker.propTypes = {
  type: PropTypes.string,
  defaultData: PropTypes.array,
  defaultIndex: PropTypes.array,
  defaultDate: PropTypes.string,
  onOk: PropTypes.func,
};

Picker.defaultProps = {
  type: '',
  defaultData: [],
  defaultIndex: [],
  defaultDate: '1995-01-01',
  onOk: () => { },
};

const types = ['gender', 'date'];

const show = props => {
  if (!props.type && !props.defaultData) return ;
  if (props.type && !types.includes(props.type)) return;
  if (!props.type && props.defaultData && (!Array.isArray(props.defaultData) || props.defaultData.length === 0)) return;

  props.defaultDate = !props.defaultDate ? '1995-01-01' : props.defaultDate;

  let element = document.createElement('div');
  document.body.appendChild(element);
  ReactDOM.render(
    React.createElement(Picker, { ...props, element: element }),
    element
  );

  return element;
}

export default show;