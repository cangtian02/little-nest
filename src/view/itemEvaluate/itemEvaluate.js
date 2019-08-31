import React from 'react';
import './itemEvaluate.css';
import Utils from '../../common/Utils';

class Itemevaluate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: 1
    }
  }

  componentDidMount() {

  }

  handleReply() {
    this.replyModal = Utils.toast.modal({
      message: '<input class="evaluate-text-input" id="replyText" placeholder="来回复点什么" />',
      onOk: () => {
        let name = document.getElementById('replyText').value;
        if (name === '') {
          Utils.toast.info('你的那个什么呢？');
          return;
        }

      },
    });
    setTimeout(() => {
      document.getElementById('replyText').focus();
    }, 300);
  }

  getItemDom() {
    return (
      <div className="ite-item-box">
        <div className="ite-item borderBottom">
          <div className="l"><img src="./img/1.jpg" alt="" /></div>
          <div className="r">
            <div className="u">
              <p>用户昵称</p>
              <span>08-27</span>
            </div>
            <div className="i">评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;&nbsp;回复</span></div>
            <div className="reply"><span>小明</span>回复<span>小李</span>：评论内容发撒播放列表评论内容发撒播放列表评论内容发撒播放列表评论内容发撒播放列表评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;&nbsp;回复</span></div>
            <div className="reply"><span>小明</span>回复<span>小李</span>：评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;&nbsp;回复</span></div>
          </div>
        </div>
        <div className="ite-item borderBottom">
          <div className="l"><img src="./img/1.jpg" alt="" /></div>
          <div className="r">
            <div className="u">
              <p>用户昵称</p>
              <span>08-27</span>
            </div>
            <div className="i">评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;&nbsp;回复</span></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.data) return <div className="ite-nolist">还没有任何评论哦~</div>;

    return (
      <div className="itemEvaluate">
        <div className="ite-title">小窝名称霹雳巴拉</div>
        {this.getItemDom()}
      </div>
    );
  }
}

export default Itemevaluate; 