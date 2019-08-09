import React from 'react';
import './submit.css';
import Utils from '../../common/Utils';
import EditImg from '../../components/editImg/editImg';
import SelectImg from '../../components/selectImg/selectImg';
import EditData from './editData/editData';
import img from './1.jpg';

class Submit extends React.Component {

  constructor() {
    super();
    this.state = {
      initialImg: '11',
      finalImg: img,
    }
  }

  componentDidMount() {
    this.init();
  }

  init() {

  }

  render() {
    return (
      <div className="wrap submit">
        {
          this.state.initialImg
          ?
          null
          :
          <SelectImg 
            tips={'推荐使用横向图片,图片宽高不小于900*675'} 
            imgMaxSize={10} 
            imgMinWidth={900}
            imgMinHeight={675}
            imgSrc={src => this.setState({ initialImg: src})} 
          />
        }
        {
          this.state.finalImg
          ?
          <EditData imgSrc={this.state.finalImg} />
          :
          <EditImg imgSrc={this.state.initialImg} proportion={'4:3'} emitImg={src => this.setState({ finalImg: src })} />
        }
      </div>
    );
  }
}

export default Submit;
