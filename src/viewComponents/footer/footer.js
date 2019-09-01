import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      className: ''
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.removeDocClick();
  }

  initDocClick() {
    document.body.addEventListener("click", e => this.docClick(e), false);
  }

  removeDocClick() {
    document.body.removeEventListener('click', e => this.docClick(e), false);
  }

  docClick(event) {
    let cDom = document.querySelector("#f-submit-box");
    if (!cDom) return;
    let tDom = event.target;
    if (cDom === tDom || cDom.contains(tDom)) {

    } else {
      this.setState({
        className: '',
        toggle: false,
      }, () => {
        this.removeDocClick();
      });
    }
  }

  handleSubmit() {
    this.setState({
      toggle: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          className: ' active'
        }, () => {
          this.initDocClick();
        });
      }, 20);
    });
  }

  handleGo(type) {
    this.removeDocClick();
    this.setState({
      className: '',
      toggle: false,
    }, () => {
      this.props.history.push(type === 1 ? '/submitNest' : '/submitArticle');
    });
  }

  render() {
    return (
      <div className="footer">
        <ul>
          <NavLink activeClassName="active" to="/home">首页</NavLink>
          <NavLink activeClassName="active" to="/wo">我的</NavLink>
        </ul>
        <div className="footer-submit" onClick={() => this.handleSubmit()}><span className="iconfont icon-tianjia"></span></div>
        {
          this.state.toggle
          ?
            <div className={'f-submit-box' + this.state.className} id="f-submit-box">
              <div onClick={() => this.handleGo(1)}>小窝</div>
              <div onClick={() => this.handleGo(2)}>文章</div>
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default Footer;