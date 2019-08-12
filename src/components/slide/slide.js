import React from 'react';
import BScroll from 'better-scroll';
import './slide.css';

function SlideContent(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        dom.push(<li key={i}><img src={val} alt={val} /></li>);
    });
    return (dom);
}

function SlideDots(props) {
    let dom = [];
    props.data.forEach((val, i) => {
        dom.push(<li key={i} className={props.currentIndex === i ? 'active' : ''}></li>);
    });
    return (dom);
}

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
            bounce: false
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

    render() {
        if (this.props.data.length === 0) return null;

        return (
            <div className="m-slide">
                <div className="m-slide-warp">
                    <div className="m-slide-content" ref="slide">
                        <div className="m-slide-group" style={this.state.group_style}>
                            <SlideContent data={this.props.data} />
                        </div>
                        <ul className="m-slide-index">
                            <SlideDots data={this.props.data} currentIndex={this.state.currentPageIndex} />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slide;
