import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './picker.css';

const genderData = [{
  val: 1,
  text: '男'
}, {
  val: 2,
  text: '女'
  }, {
    val: 1,
    text: '男'
  }, {
    val: 2,
    text: '女'
  }, {
    val: 1,
    text: '男'
  }, {
    val: 2,
    text: '女'
  }];

class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classStr: '',
      selectedIndex: [],
    }

    this.data = props.type === 'gender' ? [genderData] : [];
    if (this.props.defaultData.length > 0) this.data = this.props.defaultData;
    this.wheels = [];
  }

  componentDidMount() {
    this.init();

    // window.addEventListener('hashchange', () => {
    //   this.removeDom();
    // });
  }

  init() {
    if (this.props.defaultIndex.length > 0) {
      this.setState({ selectedIndex: this.props.defaultIndex });
    } else {
      let selectedIndex = [];
      this.data.forEach(val => selectedIndex.push(0));
      this.setState({ selectedIndex });
    }

    setTimeout(() => {
      this.setState({
        classStr: 'm-picker-show',
      }, () => {
        this.initWheel();
      });
    }, 20);
  }

  initWheel() {
    const list = document.getElementsByClassName('m-picker-list');

    for (let i = 0; i < list.length; i++) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(list[i], {
          probeType: 3,
          wheel: {
            selectedIndex: this.state.selectedIndex[i],
            rotate: 15,
            adjustTime: 100,
            wheelWrapperClass: 'm-picker-ul',
            wheelItemClass: 'm-picker-item',
            wheelDisabledItemClass: 'wheel-disabled-item',
          }
        });
      } else {
        this.wheels[i].refresh();
      }

      this.wheels[i].on('scrollEnd', () => {
        let selectedIndex = this.state.selectedIndex;
        selectedIndex[i] = this.wheels[i].getSelectedIndex();
        this.setState({ selectedIndex });
      });
    }
  }

  getItem() {
    let arr1 = [];

    this.data.forEach((val1, i) => {
      let arr2 = [];
      val1.forEach((val2, j) => {
        arr2.push(<div className={'m-picker-item' + (j === this.state.selectedIndex[i] ? ' m-picker-item-active' : '')} key={j}>{val2.text}</div>);
      });
      arr1.push(<div className="m-picker-list" key={i}><ul className="m-picker-ul">{arr2}</ul></div>)
    });

    return arr1;
  }

  handleFunc() {
    let arr = [];
    this.data.forEach((val, i) => {
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
      }, 400);
    });
  }

  removeDom() {
    if (this.props.element) document.body.removeChild(this.props.element);
  }

  render() {
    let dom = <div className={"m-picker " + this.state.classStr}>
      <div className="m-picker-mask" onClick={() => this.handleHide()}></div>
      <div className="m-picker-body">
        <div className="m-picker-header"><p onClick={() => this.handleFunc()}>确定</p></div>
        <div className="m-picker-content">
          <div className="m-picker-line"></div>
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
  onOk: PropTypes.func,
};

Picker.defaultProps = {
  type: 'gender',
  defaultData: [],
  defaultIndex: [],
  onOk: () => { },
};

const show = props => {
  let element = document.createElement('div');
  document.body.appendChild(element);
  ReactDOM.render(
    React.createElement(Picker, { ...props, element: element }),
    element
  );
}

export default show;