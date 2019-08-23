import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './lightBox.css';

class Lightbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classStr: '',
      imgWidth: 0,
    }
  }

  componentDidMount() {
    let img = new Image();
    img.src = this.props.imgUrl;
    
    img.onload = () => {
      setTimeout(() => {
        let winW = window.innerWidth;
        this.setState({
          imgWidth: img.width > winW ? winW : img.width,
          classStr: 'm-lightBox-show',
        });
      }, 20);
    }

    img.onerror = () => {

    }
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
    let dom = <div className={"m-lightBox " + this.state.classStr}>
      <div className="m-lightBox-mask" onClick={() => this.handleHide()}></div>
      <div className="m-lightBox-body">
        <img src={this.props.imgUrl} style={{ width: this.state.imgWidth }} alt="" />
      </div>
    </div>;

    return ReactDOM.createPortal(dom, this.props.element);
  }
}

Lightbox.propTypes = {
  imgUrl: PropTypes.string,
  btnText: PropTypes.string,
  onOk: PropTypes.func,
};

Lightbox.defaultProps = {
  imgUrl: '',
  btnText: '',
  onOk: () => { },
};

const show = props => {
  let element = document.createElement('div');
  document.body.appendChild(element);
  ReactDOM.render(
    React.createElement(Lightbox, { ...props, element: element }),
    element
  );

  return element;
}

export default show;