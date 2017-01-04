import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';
import { getHero } from '../redux/actions';
import crypto from 'crypto';
import cfg from '../config';

class HeroDetail extends Component {
  static propTypes = {
    hero: PropTypes.object,
    getHero: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      imgErr: false
    }
    this.handleError = this.handleError.bind(this);
  }

  componentWillMount() {
    if (!this.props.hero) {
      var ts = Math.floor(Date.now() / 1000);
      var hash = crypto.createHash('md5').update(ts.toString() + cfg.apiSecret + cfg.apiKey).digest('hex');
      this.props.getHero(ts, hash, decodeURIComponent(this.props.location.pathname.slice(1)));
    }
  }

  handleError(nbr) {
    this.setState({imgErr: true});
  }

  getComics() {
    var comics = this.props.hero.comics.items.map(function(comic) {
      return (
        <TableRow key={comic.name + comic.resourceURI}>
          <TableRowColumn style={{textAlign: 'center'}}>{comic.name}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Table selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20 + 'px', color: 'black' }}>
              Comics
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {comics}
        </TableBody>
      </Table>
    );
  }

  getSeries() {
    var series = this.props.hero.series.items.map(function(serie) {
      return (
        <TableRow key={serie.name + serie.resourceURI}>
          <TableRowColumn style={{textAlign: 'center'}}>{serie.name}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Table selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20 + 'px', color: 'black'}}>
              Series
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {series}
        </TableBody>
      </Table>
    );
  }

  getHeroInfos() {
    return (
      <div style={{ display: 'flex', flexFlow: 'column wrap', justifyContent: 'center', alignItems: 'center' }}>
        <img alt={this.props.hero.name} src={this.state.imgErr ? cfg.defaultImgUrl : this.props.hero.thumbnail.path + "/standard_xlarge." + this.props.hero.thumbnail.extension} onError={this.handleError} style={{ display: 'flex', width: 300 + 'px' }} />
        <h1 style={{ display: 'flex' }}>{this.props.hero.name}</h1>
        <div style={{ display: 'flex' }}>
          {this.props.hero.description}
        </div>
      </div>

    );
  }

  render() {
    return (
      <div style={{ padding: '0 15%', display: 'flex', flexFlow: 'column wrap', justifyContent: 'center', alignItems: 'center' }}>
        {this.props.hero && this.getHeroInfos()}
        {this.props.hero && this.getComics()}
        {this.props.hero && this.getSeries()}
      </div>
    )
  }
}

export default connect(
  state => ({
    hero: state.heroes.selectedHero
  }),
  { getHero })(HeroDetail)
