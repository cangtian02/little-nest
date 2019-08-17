import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './picker.css';

class Picker extends React.Component {

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
        classStr: 'm-picker-show',
      });
    }, 20);
  }

  render() {
    let dom = <div className={"m-picker " + this.state.classStr}></div>;

    return ReactDOM.createPortal(dom, this.props.element);
  }
}

Picker.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  duration: PropTypes.number,
};

Picker.defaultProps = {
  isOpen: true,
  type: 'day',
  title: '',
  onCancel: () => { },
  onOk: () => { },
  duration: 300,
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