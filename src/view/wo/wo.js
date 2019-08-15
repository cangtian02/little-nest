import React from 'react';
import './wo.css';
import Footer from '../../viewComponents/footer/footer';
import UserBlock from '../../viewComponents/userBlock/userBlock';

class Wo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="wo">
        <div className="wo-content">
          <UserBlock />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Wo; 