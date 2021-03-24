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
import { actions } from 'react-redux-form';
import { addComment, fetchCampsites } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm'))
}

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites();
  }

  render() {
    const { campsites, partners, promotions, comments} = this.props;
    const HomePage = () => {
      return ( 
        <Home
          campsite={campsites.campsites.filter(campsite => campsite.featured)[0]}
          campsitesLoading={campsites.isLoading}
          campsitesErrMess={campsites.errMess} 
          promotion={promotions.filter(promotion => promotion.featured)[0]} 
          partner={partners.filter(partner => partner.featured)[0]} 
        />
      )
    }

    const CampsiteWithId = ({match}) => {
      return (
        <CampsiteInfo 
          campsite={campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          isLoading={campsites.isLoading}
          errMess={campsites.errMess} 
          comments={comments.filter(comment => comment.campsiteId === +match.params.campsiteId )}
          addComment={this.props.addComment}
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
          <Route exact path='/contactus' render={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> } />
          <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
