import React from 'react';
import './editData.css';
import StepOne from '../stepOne/stepOne';

class Editdata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="editData">
        <StepOne step={this.state.step} imgSrc={this.props.imgSrc} />
      </div>
    );
  }

}

export default Editdata; 