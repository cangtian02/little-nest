import React from 'react';
import './pull.css';

class Pull extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      switchPullDownText: false,
      pullDownText: '下拉刷新', // 下拉刷新提示文字
      pullUpText: '上拉加载',  // 上拉加载提示文字
    };

    this.warper = null
    this.winHeight = window.innerHeight;
    this.pullHeight = 40;
    this.pullUpWarpTop = 0;
    this.isPullingDown = false;  // 是否处于下拉刷新状态
    this.isPullingUp = false;  // 是否处于上拉加载状态
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    if (this.props.refresh) {
      this.forceUpdate();
      this.pullUpWarpTop = this.refs.pullUpWarp.offsetTop;
    }
  }

  componentWillUnmount() {
    if (this.warper) this.warper.removeEventListener('scroll', this.warperScroll.bind(this), false);
    this.refs.scrollWarp.removeEventListener('touchstart', this.scrollWarpStart.bind(this), false);
    this.refs.scrollWarp.removeEventListener('touchmove', this.scrollWarpMove.bind(this), false);
    this.refs.scrollWarp.removeEventListener('touchend', this.scrollWarpEnd.bind(this), false);
  }

  init() {
    let warper = document.getElementById(this.props.warper);
    if (!warper) return;

    this.warper = warper;

    this.warper.addEventListener('scroll', this.warperScroll.bind(this), false);
    this.refs.scrollWarp.addEventListener('touchstart', this.scrollWarpStart.bind(this), false);
    this.refs.scrollWarp.addEventListener('touchmove', this.scrollWarpMove.bind(this), false);
    this.refs.scrollWarp.addEventListener('touchend', this.scrollWarpEnd.bind(this), false);
  }

  scrollWarpStart(e) {
    this.startPageY = e.changedTouches[0].pageY;
  }

  scrollWarpMove(e) {
    if (document.getElementById(this.props.warper).scrollTop === 0 && !this.isPullingDown) {
      let y = e.changedTouches[0].pageY;
      y = (y - this.startPageY) / 3;

      if (y >= this.pullHeight && !this.state.switchPullDownText) {
        this.setState({
          switchPullDownText: true,
          pullDownText: '释放刷新',
        });
      }

      if (y > 0 && y < this.pullHeight && this.state.switchPullDownText) {
        this.setState({
          switchPullDownText: false,
          pullDownText: '下拉刷新',
        });
      }

      if (y > 0) {
        this.refs.scrollWarp.style.transition = '0ms';
        this.refs.scrollWarp.style.transform = 'translateY(' + y + 'px)';
      }
    }
  }

  scrollWarpEnd(e) {
    if (document.getElementById(this.props.warper).scrollTop === 0 && !this.isPullingDown) {
      let y = e.changedTouches[0].pageY;
      y = (y - this.startPageY) / 3;

      if (y >= 40) {
        this.isPullingDown = true;
        if (this.isPullingDown) {
          this.setState({
            switchPullDownText: false,
            pullDownText: '数据刷新中...'
          });
          this.props.pullingDown && this.props.pullingDown();
          this.refs.scrollWarp.style.transform = 'translateY(' + this.pullHeight + 'px)';
          this.refs.scrollWarp.style.transition = '300ms';
        }
      } else {
        this.setState({
          switchPullDownText: false,
          pullDownText: '下拉加载'
        });
        if (y > 0) {
          this.refs.scrollWarp.style.transform = 'translateY(0px)';
          this.refs.scrollWarp.style.transition = '300ms';
        }
      }
    }
  }

  warperScroll(e) {
    let scrollTop = e.target.scrollTop;

    // 上拉加载
    if (scrollTop >= this.pullUpWarpTop - this.winHeight - (this.pullHeight * 2) && !this.isPullingUp && this.props.forceUpdate !== 0) {
      this.isPullingUp = true;
      if (this.isPullingUp) {
        this.setState({ pullUpText: '数据加载中...' });
        this.props.pullingUp && this.props.pullingUp();
      }
    }
  }

  forceUpdate() {
    if (this.isPullingDown) {   // 下拉刷新
      this.isPullingDown = false;
      this.setState({
        switchPullDownText: false,
        pullDownText: '下拉刷新',
        pullUpText: '上拉加载',
      });
      this.refs.scrollWarp.style.transform = 'translate(0px)';
      this.refs.scrollWarp.style.transition = '0ms';
    }

    if (this.isPullingUp) {   // 上拉加载
      this.isPullingUp = false;
      this.setState({ pullUpText: this.props.forceUpdate === 0 ? '我可是有底线的' : '上拉加载' });
    }
  }

  render() {
    return (
      <div className="r-scroll" ref="scrollWarp">
        <div className="r-pull-warp r-pullDwon-warp">{this.state.pullDownText}</div>
        <div className="r-slot" ref="scrollSlot">
          {this.props.children}
        </div>
        <div className="r-pull-warp r-pullUp-warp" ref="pullUpWarp">{this.state.pullUpText}</div>
      </div>
    );
  }
}

export default Pull;