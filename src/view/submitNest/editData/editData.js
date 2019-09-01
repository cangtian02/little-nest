import React from 'react';
import './editData.css';
import StepOne from '../stepOne/stepOne';
import StepTwo from '../stepTwo/stepTwo';

class Editdata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      lableData: null,
      info: null,
    }
  }

  componentDidMount() {

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

  render() {
    return (
      <div className="editData">
        <StepOne step={this.state.step} imgSrc={this.props.imgSrc} info={this.state.info} nextStep={e => this.nextStep(e)} />
        <StepTwo step={this.state.step} imgSrc={this.props.imgSrc} lableData={this.state.lableData} prevStep={e => this.prevStep(e)} />
      </div>
    );
  }

}

export default Editdata; 