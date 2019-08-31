import React from 'react';
import './evaluate.css';
import { PublicTitle } from '../../components/componentList/componentList';
import Utils from '../../common/Utils';

class Evaluate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.removeModal(this.evaluateModal);
    this.removeModal(this.replyModal);
  }

  removeModal(node) {
    node && node.parentNode && node.parentNode.removeChild(node);
  }

  handleGoList() {
    this.props.history.push('/itemEvaluate?itemId=');
  }

  getItemDom() {
    return (
      <div className="dte-item-box">
        <div className="dte-item borderBottom">
          <div className="l"><img src="./img/1.jpg" alt="" /></div>
          <div className="r">
            <div className="u">
              <p>用户昵称</p>
              <span>08-27</span>
            </div>
            <div className="i">评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;&nbsp;回复</span></div>

            <div className="reply"><span>小明</span>回复<span>小李</span>：评论内容发撒播放列表评论内容发撒播放列表评论内容发撒播放列表评论内容发撒播放列表评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;&nbsp;回复</span></div>
            <div className="reply"><span>小明</span>回复<span>小李</span>：评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;&nbsp;回复</span></div>

            <div className="load-more" onClick={() => this.handleGoList()}>查看更多回复</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="dt-evaluate">
        <PublicTitle val={(this.props.type === 1 ? '小窝' : '文章') + '评论'} />
        <div className="dte-input" onClick={() => this.handleEvaluate()}>说点什么？</div>
        {this.getItemDom()}
        <div className="load-more evaluate" onClick={() => this.handleGoList()}>查看更多评论</div>
      </div>
    );
  }

  handleEvaluate() {
    this.evaluateModal = Utils.toast.modal({
      message: '<input class="evaluate-text-input" id="evaluateText" placeholder="来说点什么" />',
      onOk: () => {
        let name = document.getElementById('evaluateText').value;
        if (name === '') {
          Utils.toast.info('你的那个什么呢？');
          return;
        }

      },
    });
    setTimeout(() => {
      document.getElementById('evaluateText').focus();
    }, 300);
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

}

export default Evaluate; 