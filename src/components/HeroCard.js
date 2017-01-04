import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Detail from 'react-icons/lib/fa/book';
import { browserHistory } from 'react-router';
import { selectHero } from '../redux/actions';
import cfg from '../config';

class HeroCard extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selectHero: PropTypes.func.isRequired,
    heroesData: PropTypes.array.isRequired,
  }

  constructor() {
    super();
    this.state = {
      imgErr: false
    }
    this.handleError = this.handleError.bind(this);
    this.changePath = this.changePath.bind(this);
  }

  handleError(nbr) {
    this.setState({imgErr: true});
  }

  changePath() {
    this.props.selectHero(this.props.heroesData, this.props.data.name);
    browserHistory.push('/' + this.props.data.name);
  }

  getDetails() {
    var details = this.props.data.urls.map(
      function(detail) {
        return (
          <FlatButton
            key={detail.url + detail.type}
            href={detail.url}
            labelStyle={{ fontSize: 10 + 'px' }}
            label={detail.type}
            icon={<Detail />}
          />
        );
    });
    return <CardActions>{ details }</CardActions>;
  }

  render() {
    return (
      <Card key={this.props.data.id} style={{ width: 300 + 'px', margin: '15px', display: 'inline-flex' }}>
        <CardMedia>
            <img onClick={this.changePath} alt={this.props.data.name} src={this.state.imgErr ? cfg.defaultImgUrl : this.props.data.thumbnail.path + "/standard_xlarge." + this.props.data.thumbnail.extension} onError={this.handleError} style={{ width: 300 + 'px' }} />
        </CardMedia>
        <CardTitle title={this.props.data.name} titleStyle={{fontSize: 100 + '%'}} />
        {this.getDetails()}
      </Card>
    )
  }
}

export default connect(
  state => ({
    heroesData: state.heroes.items,
  }),
  { selectHero })(HeroCard)
