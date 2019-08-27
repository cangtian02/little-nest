import React from 'react';
import './tabTitle.css';

class Tabtitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      list: props.list,
    }
  }

  componentDidMount() {

  }

  handleClick(i) {
    this.setState({
      activeIndex: i
    }, () => {
      this.props.click && this.props.click(i);
    });
  }

  render() {
    if (this.state.list.length === 0) return null;

    let arr = [];
    this.state.list.forEach((val, i) => {
      arr.push(<p key={i} className={i === this.state.activeIndex ? 'active' : ''} onClick={() => this.handleClick(i)}>{val}</p>);
    });

    return (
      <div className="tabTitle" style={this.props.style || {}}>
        {arr}
      </div>
    );
  }
}

export default Tabtitle; 