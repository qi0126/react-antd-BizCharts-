import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import components from '../component/index';

export default class App extends Component {
  static propTypes: {
    params: PropTypes.object,
    location: PropTypes.object,
  }

  renderList() {
    const items = Object.keys(components).map(key => {
      const group = components[key];
      // console.log(group);
      const list = Object.keys(group).map(c => {
        console.log(c,key)
        const entry = group[c];
         return (
          <li key={'component-' + c}>
            <Link to={{ pathname: '/', query: { page: c, group: key } }}>{c}</Link>
          </li>
        );
      });

      return (
        <div key={'group-' + key} className="component-list-container">
          <p className="group-name">{key}</p>
          <ul className="component-list">
            {list}
          </ul>
        </div>
      );
    });

    return (
      <div className="component-list-wrapper">
        <p className="title">aaaaaaaaaaaa</p>
        {items}
      </div>
    );
  }

  renderPageDetail() {
    const { params, location } = this.props;
    const { query } = location;
    const { group, page } = query;

    return (
      <div className="component-wrapper">
        <p className="back"><Link to={{ pathname: '/' }}>返回首页</Link></p>
        <p className="title">{page}</p>
        {components[group] && components[group][page] ? React.createElement(components[group][page]) : null}
      </div>
    );
  }

  render() {
    const { location, params } = this.props;

    if (!location.query || !location.query.page) {
      return this.renderList();
    }

    return this.renderPageDetail();
  }
};


