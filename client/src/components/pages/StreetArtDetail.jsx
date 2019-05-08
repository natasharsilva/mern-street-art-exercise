import React, { Component } from 'react';
import api from '../../api';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YXNoYWlzaXNyIiwiYSI6ImNqdWwxZDA1YjBlb2ozeW9tb2RvYjE0dWgifQ.87UGY_REVrvfkSsRhd8QWg'

export default class StreetArtDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streetArt: null
    }
    this.mapRef = React.createRef()
    this.map = null
    this.marker = null
  }

  initMap(lng, lat) { // NEW METHOD
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map with the coordinates ([lng, lat])
    this.marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .addTo(this.map)
  }

  render() {
    if (!this.state.streetArt) 
      return <div>Loading...</div>
    return (
      <div className="streetArtDetail">
        <h1>Street Art Detail</h1>
              <img src={this.state.streetArt.pictureUrl} alt=""/>
              {/* <p>Longitude: {this.state.streetArt.location.coordinates[0]}</p>
              <p>Latitude: {this.state.streetArt.location.coordinates[1]}</p> */}
            <div ref={this.mapRef} style={{height: 400, width:600}}></div>
    </div>
    )}
  componentDidMount() {
    api.getStreetArt(this.props.match.params.streetArtId)
      .then(streetArt => {
        this.setState({
          streetArt: streetArt
        })
        let [lng,lat] = streetArt.location.coordinates
        this.initMap(lng,lat)
        console.log("THIS IS THE STATEEEEE", this.state.streetArt)
      })
      .catch(err => console.log(err))
  }
}