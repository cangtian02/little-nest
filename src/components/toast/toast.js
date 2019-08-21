import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './toast.css';

class Toast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      classStr: '',
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        classStr: 'm-toast-show',
      });
    }, 20);

    if (this.props.type === 'info') {
      this.timeout = setTimeout(() => {
        this.close();
      }, this.props.duration);
    }
  }

  handleOk(props) {
    props.onOk();
    this.close();
  }

  handleCancel(props) {
    props.onCancel();
    this.close();
  }

  close() {
    this.setState({
      isOpen: false,
      classStr: 'm-toast-hide',
    }, () => {
      setTimeout(() => {
        this.removeDom();
      }, 150);
    });
  }

  removeDom() {
    if (this.props.element) document.body.removeChild(this.props.element);
  }

  render() {
    const { type, title, message, okText, cancelText } = this.props;

    let dom = null;

    if (type === 'modal') {
      dom = (
        <div className={"m-toast " + this.state.classStr}>
          <div className="m-toast-mask"></div>
          <div className="m-toast-body">
            <div className="m-toast-title">{title}</div>
            <div className="m-toast-message" dangerouslySetInnerHTML={{ __html: message }}></div>
            <div className="m-toast-footer">
              <div className="m-toast-btn" onClick={() => this.handleCancel(this.props)}>{cancelText}</div>
              <div className="m-toast-btn" onClick={() => this.handleOk(this.props)}>{okText}</div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'info') {
      dom = <div className={"m-toast-info " + this.state.classStr}>{message}</div>;
    }

    if (type === 'loading') {
      dom = (
        <div className={"m-toast " + this.state.classStr}>
          <span className="iconfont icon-Loading"></span>
        </div>
      );
    }

    return ReactDOM.createPortal(dom, this.props.element);
  }
}

Toast.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  history: PropTypes.object,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  duration: PropTypes.number,
};

Toast.defaultProps = {
  isOpen: true,
  history: null,
  type: '',
  title: '',
  message: '',
  onCancel: () => { },
  onOk: () => { },
  okText: '确定',
  cancelText: '取消',
  duration: 2000,
};

const show = props => {
  let element = document.createElement('div');
  document.body.appendChild(element);
  ReactDOM.render(
    React.createElement(Toast, { ...props, element: element }),
    element
  );
  return element;
}

const initFnc = {
  modal(props) {
    return show({ ...props, type: 'modal'});
  },
  info(message, duration = 2000) {
    return show({message: message, duration: duration, type: 'info'});
  },
  loading() {
    return show({type: 'loading'});
  },
}

export default initFnc;
