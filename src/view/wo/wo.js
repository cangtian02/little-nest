import React from 'react';
import './wo.css';
import Footer from '../../viewComponents/footer/footer';
import Item from '../../viewComponents/item/item';
import UserBlock from '../../viewComponents/userBlock/userBlock';
import TabTitle from '../../viewComponents/tabTitle/tabTitle';
import img from '../submit/1.jpg';

const item = {
  id: 1,
  img: img,
  name: '小窝名字啊啊啊小窝名字啊啊啊',
  userIcon: img,
  userName: '小明设计师',
  lable: ['简约', '极客范', '简约', '极客范'],
  praise: 30,
};

class Wo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [item],
    }
  }

  componentDidMount() {

  }

  handleItem(id) {
    this.props.history.push('/detail?itemId=' + id);
  }

  handleCommentBtn(id) {
    this.props.history.push('/itemEvaluate?itemId=' + id);
  }

  handleDeleteBtn(id) {
    
  }

  getItemDom() {
    if (this.state.item.length === 0) return <div className="wo-item-nolist">还没有你的小窝，快上传分享吧~</div>
    
    let arr = [];
    this.state.item.forEach((val, i) => {
      arr.push(<Item val={val} key={i} toggleMe handleItem={id => this.handleItem(id)} handleDeleteBtn={id => this.handleDeleteBtn(id)} handleCommentBtn={id => this.handleCommentBtn(id)} />);
    });
    return arr;
  }

  handleTabTitleClick(i) {
    console.log(i);
  }

  render() {
    return (
      <div className="wo">
        <div className="wo-content">
          <UserBlock history={this.props.history} />
          <TabTitle style={{margin: '.6rem 0'}} list={['小窝', '文章', '收藏', '赞过']} click={i => this.handleTabTitleClick(i)} />
          <div className="wo-item">
            {this.getItemDom()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Wo; 