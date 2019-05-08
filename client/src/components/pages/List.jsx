import React, { Component } from 'react';
import { NavLink as NLink } from 'react-router-dom';
import { Button, NavLink, Table } from 'reactstrap';
import api from '../../api';

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streetArts: []
    }
  }
  render() {
    return (
      <div className="List">
        <h1>List of Street Arts</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Google Maps Direction</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
          {this.state.streetArts.map(art => <tr key={art._id}>
            <td><img src={art.pictureUrl} alt=""/></td>
            <td>
            <NavLink href={`https://www.google.com/maps/dir//${art.location.coordinates[1]},${art.location.coordinates[0]}/@${art.location.coordinates[1]},${art.location.coordinates[0]}`}>{art.location.coordinates[0]}, {art.location.coordinates[1]}</NavLink>
            </td>
            <td>
            <Button outline color="primary" tag={NLink} to={`/street-art-detail/${art._id}`}>Detail</Button>
            </td>
          </tr>)}
          </tbody>
        </Table>
      </div>
    );
  }
  componentDidMount() {
    api.getStreetArts()
      .then(streetArts => {
        console.log(streetArts)
        this.setState({
          streetArts: streetArts
        })
      })
      .catch(err => console.log(err))
  }
}