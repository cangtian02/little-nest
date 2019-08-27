import React from 'react';
import './tabTitle.css';

class Tabtitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="tabTitle" style={this.props.style || {}}>
        <p className="active">小窝</p>
        <p>文章</p>
        <p>收藏</p>
        <p>赞过</p>
      </div>
    );
  }
}

export default Tabtitle; 