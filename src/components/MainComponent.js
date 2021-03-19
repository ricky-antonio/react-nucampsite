import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

class Main extends Component {

  render() {

    const { campsites, partners, promotions, comments } = this.props;

    const HomePage = () => {
      return ( 
        <Home
          campsite={campsites.filter(campsite => campsite.featured)[0]} 
          promotion={promotions.filter(promotion => promotion.featured)[0]} 
          partner={partners.filter(partner => partner.featured)[0]} 
        />
      )
    }

    const CampsiteWithId = ({match}) => {
      return (
        <CampsiteInfo 
          campsite={campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          comments={comments.filter(comment => comment.campsiteId === +match.params.campsiteId )}
        />
      );
    }

    return (
      <div >
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
          <Route path='/directory/:campsiteId' component={CampsiteWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
