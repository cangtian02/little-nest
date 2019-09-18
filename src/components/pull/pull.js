import React from 'react';
import './pull.css';
import BScroll from 'better-scroll';

class Pull extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pullHeight: 40, // 刷新提示dom的高度
      pullDownText: '下拉刷新', // 下拉刷新提示文字
      pullUpText: '上拉加载',  // 上拉加载提示文字
    };

    this.isPullingDown = false;  // 是否处于下拉刷新状态
    this.isPullingUp = false;  // 是否处于上拉加载状态
  }

  componentDidMount() {
    // 当yx-scroll-box高度小于外层盒子高度时设置yx-scroll-box最小高度，因主体内容高度不足外层盒子高度时，scroll将失效
    this.refs.scrollSlot.style.minHeight = this.refs.scrollWarp.offsetHeight + 'px';

    this.initScroll();
  }

  componentDidUpdate() {
    if (this.bScroll && this.props.refresh) {
      this.forceUpdate(this.props.forceUpdate);
    }
  }

  // 组件更新  flag == 0  父组件调用当列表加载完使用，显示暂无更多数据  flag == 1正常数据更新操作
  forceUpdate(flag) {
    if (this.isPullingDown) {   // 下拉刷新
      this.bScroll.finishPullDown();
      this.bScroll.refresh();
      this.isPullingDown = false;
      this.setState({
        pullDownText: '下拉刷新',
        pullUpText: '上拉加载',
      });
    }
    
    if (this.isPullingUp) {   // 上拉加载
      this.isPullingUp = false;
      this.setState({ pullUpText: flag === 0 ? '我可是有底线的' : '上拉加载' });
      this.bScroll.finishPullUp();
      this.bScroll.refresh();
    }
  }

  initScroll() {
    // 下拉刷新配置
    let pullDownRefresh = {threshold: this.state.pullHeight, stop: this.state.pullHeight};
    // 上拉加载配置
    let pullUpLoad = {threshold: this.state.pullHeight};

    // 初始化scroll
    this.bScroll = new BScroll(this.refs.scrollWarp, {
      click: true,
      scrollY: true,
      pullDownRefresh: pullDownRefresh,
      pullUpLoad: pullUpLoad
    });

    // 下拉刷新初始化
    this.initpullDownRefresh();
    
    // 上拉加载初始化
    this.initpullUpLoad();
  }

  // 下拉刷新初始化
  initpullDownRefresh() {
    // 监控scroll的偏移Y轴值，在不处于下拉刷新的时候，当小于提示dom高度后更改提示内容，反之回到初始内容
    this.bScroll.on('scroll', pos => {
      if (!this.isPullingDown) {
        this.setState({ pullDownText: pos.y > this.state.pullHeight ? '释放刷新' : '下拉刷新' });
      }
    });

    this.bScroll.on('pullingDown', () => {
      this.isPullingDown = true;
      if (this.isPullingDown) {
        this.setState({ pullDownText: '数据刷新中...' });
        this.props.pullingDown && this.props.pullingDown();
      }
    });
  }

  // 上拉加载初始化
  initpullUpLoad() {
    this.bScroll.on('pullingUp', () => {
      if (this.props.forceUpdate === 0) {  // 上拉数据加载完毕后
        this.bScroll.finishPullUp();
        setTimeout(() => {
          this.bScroll.refresh();
        }, 300);
      } else {
        this.isPullingUp = true;
        if (this.isPullingUp) {
          this.setState({ pullUpText: '数据加载中...' });
          this.props.pullingUp && this.props.pullingUp();
        }
      }
    });
  }

  render() {
    return (
      <div className="r-scroll" ref="scrollWarp">
        <div className="r-scroll-box">
          <div className="r-pull-warp r-pullDwon-warp">{this.state.pullDownText}</div>
          <div className="r-slot" ref="scrollSlot">
            {this.props.children}
          </div>
          <div className="r-pull-warp r-pullUp-warp">{this.state.pullUpText}</div>
        </div>
      </div>
    );
  }
}

export default Pull;
