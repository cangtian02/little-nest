import React from 'react';
import './userItem.css';

class Useritem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  getItem() {
    let arr = [];

    this.props.list.forEach((val, i) => {
      arr.push(
        <div className="userItem borderBottom" key={i}>
          <div className="l">
            <img src="./img/pic.jpg" alt="" />
            <div className="l_r">
              <p>小明</p>
              <span>设计师</span>
            </div>
          </div>
          <div className="r disable">已关注</div>
        </div>
      );
    });

    return arr;
  }

  render() {
    if (this.props.list.length === 0) return null;

    return (
      <div className="userItem-box">
        {this.getItem()}
      </div>
    );
  }
}

export default Useritem; 