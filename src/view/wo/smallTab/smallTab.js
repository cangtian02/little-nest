import React from 'react';
import './smallTab.css';

class Smalltab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {

  }

  handleClick(tabIndex) {
    this.props.click && this.props.click(tabIndex);
  }

  render() {
    return (
      <div className="smallTab">
        <div className="smt-content">
          <div className={'smt-item' + (this.props.tabIndex === 0 ? ' active' : '')} onClick={() => this.handleClick(0)}>小窝</div>
          <div className={'smt-item' + (this.props.tabIndex === 1 ? ' active' : '')} onClick={() => this.handleClick(1)}>文章</div>
        </div>
      </div>
    );
  }
}

export default Smalltab; 