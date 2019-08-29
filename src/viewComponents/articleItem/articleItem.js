import React from 'react';
import './articleItem.css';

class Articleitem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  getImgItem() {
    let arr = [];
    let img = this.props.val.img;
    img = img.length > 3 ? img.splice(0, 3) : img;

    img.forEach((val, i) => {
      arr.push(<img src={val} key={i} alt={this.props.val.name} />);
    });

    if (img.length === 1) {
      arr.push(<div style={{ flex: 1, marginLeft: '.4rem' }} key={2}><div className="ari-info-box clamp4" style={{margin: 0}} onClick={() => this.handleItem()}>{this.props.val.info}</div></div>);
    }

    return <div className="ari-img-box" onClick={() => this.handleItem()}>{arr}</div>;
  }

  getContent() {
    if (!this.props.val.info) return null;
    return <div className="ari-info-box clamp3" onClick={() => this.handleItem()}>{this.props.val.info}</div>;
  }

  handleItem() {
    this.props.history.push('/detail?itemId=' + this.props.val.id);
  }

  handleCommentBtn() {
    
  }

  handleEditBtn() {
    
  }

  handleDeleteBtn() {
    
  }

  render() {
    if (!this.props.val) return null;
    let val = this.props.val;

    return (
      <div className="articleItem">
        <div className="ari-title clamp2" onClick={() => this.handleItem()}>{val.name}</div>
        {
          val.img.length > 0
          ?
          this.getImgItem()
          :
          this.getContent()
        }
        <div className="ari-info">
          {
            !this.props.toggleMe
              ?
              <div className="ari-user" onClick={() => this.handleItem()}>
                <img src={val.userIcon} alt={val.userName} />
                <p className="ellipsis">{val.userName}</p>
              </div>
              :
              null
          }
          <div className="ari-nums" style={this.props.toggleMe ? { flex: 1 } : {}} onClick={() => this.handleItem()}>
            {val.look || 0}&nbsp;浏览&nbsp;&nbsp;{val.evaluate || 0}&nbsp;评论&nbsp;&nbsp;{val.praise || 0}&nbsp;点赞
          </div>
          {
            this.props.toggleMe
              ?
              <div className="ari-icons">
                <span className="iconfont icon-xinbaniconshangchuan-" onClick={() => this.handleCommentBtn()}></span>
                <span className="iconfont icon-icon_edit" onClick={() => this.handleEditBtn()}></span>
                <span className="iconfont icon--shanchu" onClick={() => this.handleDeleteBtn()}></span>
              </div>
              :
              null
          }
        </div>
      </div>
    );
  }
}

export default Articleitem; 