import React from 'react';
import './evaluate.css';
import { PublicTitle }  from '../../../components/componentList/componentList';
import Utils from '../../../common/Utils';

class Evaluate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  getItemDom() {
    return (
      <div className="dte-item-box">

        <div className="dte-item border">
          <div className="l"><img src="./img/1.jpg" alt="" /></div>
          <div className="r">
            <div className="u">
              <p>用户昵称</p>
              <span>08-27</span>
            </div>
            <div className="i">评论内容发撒播放列表<span onClick={() => this.handleReply()}>&nbsp;&nbsp;&nbsp;回复</span></div>

            <div className="dte-item first">
              <div className="l"><img src="./img/1.jpg" alt="" /></div>
              <div className="r">
                <div className="u">
                  <p>用户昵称</p>
                  <span>08-27</span>
                </div>
                <div className="i">评论内容发撒播放列表</div>
              </div>
            </div>
            <div className="dte-item">
              <div className="l"><img src="./img/1.jpg" alt="" /></div>
              <div className="r">
                <div className="u">
                  <p>用户昵称</p>
                  <span>08-27</span>
                </div>
                <div className="i">评论内容发撒播放列表</div>
              </div>
            </div>
            <div className="load-more reply">查看更多回复</div>

          </div>
        </div>

        <div className="load-more evaluate">查看更多评论</div>

      </div>
    );
  }

  render() {
    return (
      <div className="dt-evaluate">
        <PublicTitle val={'小窝评论'} />
        <div className="dte-input" onClick={() => this.handleEvaluate()}>说点什么？</div>
        {this.getItemDom()}
      </div>
    );
  }

  handleEvaluate() {
    Utils.toast.modal({
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
    Utils.toast.modal({
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