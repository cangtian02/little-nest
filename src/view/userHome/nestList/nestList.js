import React from 'react';
import './nestList.css';
import Pull from '../../../components/pull/pull';
import NestItem from '../../../viewComponents/nestItem/nestItem';
import img from '../../submitNest/1.jpg';

const nestItem = {
  id: 1,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  userIcon: img,
  userName: '小明设计师',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
  look: 40,
  evaluate: 20
};

class Nestlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nestItem: [],
      pageSize: 0,
      maxPageSize: 3,
      refresh: false,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    if (this.state.pageSize >= this.state.maxPageSize) return;

    setTimeout(() => {
      let data = this.state.pageSize === 0 ? [nestItem, nestItem, nestItem] : this.state.nestItem.concat([nestItem, nestItem, nestItem]);
      this.setState({
        nestItem: data,
        refresh: true,
      }, () => {
        this.setState({ refresh: false });
      });
    }, 300);
  }

  pullingDown() {
    if (!this.props.toggle) {
      this.updateRefresh();
      return;
    }

    this.setState({
      pageSize: 0,
    }, () => {
      this.getData();
    });
  }

  pullingUp() {
    if (!this.props.toggle) {
      this.updateRefresh();
      return;
    }

    this.setState({
      pageSize: this.state.pageSize + 1,
    }, () => {
      this.getData();
    });
  }

  updateRefresh() {
    this.setState({
      refresh: true,
    }, () => {
      this.setState({ refresh: false });
    });
  }
  
  getNestItemDom() {
    if (this.state.nestItem.length === 0) return <div className="uh-item-nolist">TA还没有分享小窝哦~</div>;

    let arr = [];
    this.state.nestItem.forEach((val, i) => {
      arr.push(<NestItem val={val} key={i} showUser history={this.props.history} />);
    });

    return (
      <Pull warper='userHome' forceUpdate={this.state.pageSize === this.state.maxPageSize - 1 ? 0 : 1} refresh={this.state.refresh} pullingDown={() => this.pullingDown()} pullingUp={() => this.pullingUp()}>
        {arr}
      </Pull>
    );
  }

  render() {
    return (
      <div className="uh-item" style={{ display: this.props.toggle ? 'block' : 'none' }}>
        {this.getNestItemDom()}
      </div>
    );
  }
}

export default Nestlist; 