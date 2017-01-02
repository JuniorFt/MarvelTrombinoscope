import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getHeroesList, isRequesting } from '../redux/actions';
import crypto from 'crypto';
import HeroCard from '../components/HeroCard';
import cfg from '../config';

class App extends Component {
  static propTypes = {
    heroesData: PropTypes.array.isRequired,
    errImg: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getHeroesList: PropTypes.func.isRequired,
    isRequesting: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (this.props.heroesData.length === 0) {
      this.props.isRequesting();
      var ts = Math.floor(Date.now() / 1000);
      var hash = crypto.createHash('md5').update(ts.toString() + cfg.apiSecret + cfg.apiKey).digest('hex');
      this.props.getHeroesList(ts, hash);
    }
  }

  displayHeroes() {
    var list = this.props.heroesData.map(function(hero) {
        return (
          <HeroCard data={hero} key={hero.name + hero.id} />
        );
      }
    );
    return <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }} >{ list }</div>;
  }

  render() {
    const { isFetching } = this.props
    return (
      <div>
        {isFetching ? <div></div> :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {this.displayHeroes()}
          </div>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    isFetching: state.heroes.isFetching,
    heroesData: state.heroes.items,
    errImg: state.heroes.errImg
  }),
  { getHeroesList, isRequesting })(App)
