import React from 'react';
import './articleList.css';
import Pull from '../../../components/pull/pull';
import ArticleItem from '../../../viewComponents/articleItem/articleItem';
import img from '../../submitNest/1.jpg';

const articleItem = {
  id: 1,
  img: [img, img],
  userIcon: img,
  userName: '小明设计师',
  name: '文章名字啊啊啊小窝名字啊啊啊',
  info: '文章内容啊啊啊小窝名字啊啊啊文',
  praise: 30,
};

class Articlelist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articleItem: [],
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
      let data = this.state.pageSize === 0 ? [articleItem, articleItem, articleItem, articleItem] : this.state.articleItem.concat([articleItem, articleItem, articleItem, articleItem]);
      this.setState({
        articleItem: data,
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

  getArticleItem() {
    if (this.state.articleItem.length === 0) return <div className="uh-item-nolist">TA还没有分享文章哦~</div>

    let arr = [];
    this.state.articleItem.forEach((val, i) => {
      arr.push(<ArticleItem val={val} key={i} showUser history={this.props.history} />);
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
        {this.getArticleItem()}
      </div>
    );
  }
}

export default Articlelist; 