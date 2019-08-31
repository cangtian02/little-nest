import React from 'react';
import BScroll from 'better-scroll';
import './slide.css';

class Slide extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			group_style: { width: 0 },
			currentPageIndex: 0
		}
	}

	componentDidMount() {
		if (this.props.data.length > 0) this.setSlideWidth();
	}

	componentWillUnmount() {
		this.slide && this.slide.destroy();
		this.timer && clearTimeout(this.timer);
	}

	setSlideWidth() {
		if (this.props.data.length === 1) {
			this.setState({
				group_style: {
					width: this.refs.slide.clientWidth
				}
			});
			return;
		}

		let slideWidth = this.refs.slide.clientWidth;
		let width = (this.props.data.length + 2) * slideWidth;
		this.setState({
			group_style: {
				width: width
			}
		}, () => {
			this.initSlide();
		});
	}

	initSlide() {
		if (this.slide) this.slide.destroy(); this.slide = null;
		if (this.timer) clearTimeout(this.timer);

		this.slide = new BScroll(this.refs.slide, {
			scrollX: true,
			scrollY: false,
			momentum: false,
			snap: {
				loop: true,
				threshold: 0.3,
				speed: 400
			},
			bounce: false,
			click: true
		});

		this.slide.on('scrollEnd', () => {
			this.setState({
				currentPageIndex: this.slide.getCurrentPage().pageX
			});
			this.play();
		});

		this.slide.on('touchEnd', () => {
			this.play();
		});

		this.slide.on('beforeScrollStart', () => {
			clearTimeout(this.timer);
		});

		this.play();
	}

	play() {
		if (!this.props.autoPlay) return;

		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (this.state.currentPageIndex >= this.props.data.length) {
				this.setState({
					currentPageIndex: 0
				});
			}
			this.slide.next();
		}, 3000);
	}

	handleClick(i) {
		this.props.click && this.props.click(i);
	}

	getSlideContent() {
		let dom = [];
		this.props.data.forEach((val, i) => {
			dom.push(
				<li key={i} onClick={() => this.handleClick(i)}>
					<img src={val.src} alt='' />
					{val.tag ? <i style={{ background: val.tagBg || '#2489ED' }}>{val.tag}</i> : null}
				</li>
			);
		});
		return (dom);
	}

	getSlideDots() {
		let dom = [];
		this.props.data.forEach((val, i) => {
			dom.push(<li key={i} className={this.state.currentPageIndex === i ? 'active' : ''}></li>);
		});
		return (dom);
	}

	render() {
		if (this.props.data.length === 0) return null;
		let w = window.innerWidth;

		return (
			<div className="m-slide" style={{ height: w / this.props.proportion[0] * this.props.proportion[1]}}>
				<div className="m-slide-warp">
					<div className="m-slide-content" ref="slide">
						<div className="m-slide-group" style={this.state.group_style}>
							{this.getSlideContent()}
						</div>
						<ul className="m-slide-index">
							{this.getSlideDots()}
						</ul>
					</div>
				</div>
			</div>
		);
	}

}

export default Slide;
