import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './lightBox.css';

class Lightbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
    }
  }

  componentDidMount() {
    let img = new Image();
    img.src = this.props.imgUrl;
    
    img.onload = () => {
      let winW = window.innerWidth;
      this.setState({
        imgWidth: img.width > winW ? winW : img.width,
      });
    }

    img.onerror = () => {

    }
  }

  handleHide() {
    this.removeDom();
    this.props.handleCloseFunc && this.props.handleCloseFunc();
  }

  removeDom() {
    if (this.props.element) document.body.removeChild(this.props.element);
  }

  handleBtn() {
    this.removeDom();
    this.props.handleBtnFunc && this.props.handleBtnFunc();
  }

  render() {
    if (!this.props.imgUrl) return null;

    let dom = <div className="m-lightBox">
      <div className="m-lightBox-mask" onClick={() => this.handleHide()}></div>
      <div className="m-lightBox-body">
        <img src={this.props.imgUrl} style={{ width: this.state.imgWidth }} alt="" />
      </div>
      {
        this.props.btnText
        ?
          <div className="m-lightBox-btn" onClick={() => this.handleBtn()}>{this.props.btnText}</div>
        :
        null
      }
    </div>;

    return ReactDOM.createPortal(dom, this.props.element);
  }
}

Lightbox.propTypes = {
  imgUrl: PropTypes.string,
  btnText: PropTypes.string,
  handleBtnFunc: PropTypes.func,
  handleCloseFunc: PropTypes.func,
};

Lightbox.defaultProps = {
  imgUrl: '',
  btnText: '',
  handleBtnFunc: () => { },
  handleCloseFunc: () => { },
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