import React from 'react';
import './list.css';
import Pull from '../../components/pull/pull';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 0,
      data: [],
      maxPageSize: 3,
      forceUpdate: 1,
      refresh: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    if (this.state.pageSize >= this.state.maxPageSize) return;

    setTimeout(() => {
      let data = this.state.pageSize === 0 ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : this.state.data.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      this.setState({
        data: data,
        refresh: true,
        forceUpdate: this.state.pageSize === this.state.maxPageSize - 1 ? 0 : 1,
      }, () => {
        this.setState({
          refresh: false,
        });
      });
    }, 300);
  }

  pullingDown() {
    this.setState({
      pageSize: 0,
      refresh: false,
      forceUpdate: 1,
    }, () => {
      this.getData();
    });
  }

  pullingUp() {
    this.setState({
      pageSize: this.state.pageSize + 1,
      refresh: false,
    }, () => {
      this.getData();
    });
  }

  getItem() {
    let arr = [];
    this.state.data.forEach((val, i) => {
      arr.push(<li key={i}>{i}</li>)
    });
    return arr;
  }

  render() {
    return (
      <div className="list">
        <Pull forceUpdate={this.state.forceUpdate} refresh={this.state.refresh} pullingDown={() => this.pullingDown()} pullingUp={() => this.pullingUp()}>
          {this.getItem()}
        </Pull>
      </div>
    );
  }

}

export default List; 