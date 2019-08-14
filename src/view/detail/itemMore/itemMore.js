import React from 'react';
import './itemMore.css';
import { PublicTitle } from '../../../components/componentList/componentList';
import Item from '../../../viewComponents/item/item';
import img from '../../submit/1.jpg';

const item = {
  id: 2,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  userIcon: img,
  userName: '小明设计师',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
};

class Itemmore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [item, item, item],
    }
  }

  componentDidMount() {

  }

  handleItem(id) {
    this.props.history.push('/detail?itemId=' + id);
  }

  getItemDom() {
    let arr = [];
    this.state.item.forEach((val, i) => {
      arr.push(<Item val={val} key={i} handleItem={id => this.handleItem(id)} />);
    });
    return arr;
  }

  render() {
    return (
      <div className="dt-itemMore">
        <PublicTitle val={'更多小窝'} />
        <div className="dt-itemMore-block"></div>
        {this.getItemDom()}
      </div>
    );
  }
}

export default Itemmore; 