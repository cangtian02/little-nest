import React from 'react';
import './submitNest.css';
import EditImg from '../../components/editImg/editImg';
import SelectImg from '../../components/selectImg/selectImg';
import EditData from './editData/editData';
import Utils from '../../common/Utils';

class SubmitNest extends React.Component {

  constructor() {
    super();
    this.state = {
      initialImg: '',
      finalImg: '',
    }
  }

  componentDidMount() {
    this.init();
  }

  init() {
    let store = localStorage.getItem('nest_draft');
    store = store ? JSON.parse(store) : [];
    let isDraft = Utils.getUrlParams('isDraft') || null;
    let itemId = Number(Utils.getUrlParams('itemId')) || null;

    if (isDraft && store.length > 0) {
      let idx = store.findIndex(item => item.id === itemId);
      if (idx > -1) {
        this.setState({
          initialImg: store[idx].img,
          finalImg: store[idx].img,
        });
      }
    }
  }

  render() {
    return (
      <div className="wrap submit-nest">
        {
          this.state.initialImg
          ?
            this.state.finalImg
              ?
              <EditData imgSrc={this.state.finalImg} />
              :
              <EditImg imgSrc={this.state.initialImg} proportion={'4:3'} emitImgWidth={1920} emitImgHeight={1440} quality={0.7} emitImg={src => this.setState({ finalImg: src })} />
          :
          <SelectImg 
            tips={'推荐使用横向图片,图片宽高不小于900*675'} 
            imgMaxSize={10} 
            imgMinWidth={760}
            imgMinHeight={570}
            imgSrc={src => this.setState({ initialImg: src})} 
          />
        }
      </div>
    );
  }
}

export default SubmitNest;
