import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { Form, Row, Col } from 'react-bootstrap';

Geocode.setApiKey("AIzaSyDCFSW24SCUie4NcK11F7SUhKZYY6yBLL0");
Geocode.enableDebug();

class LocationSearchModal extends React.Component {

  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    }
  }

  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInfoWindowClose = (event) => { };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? city : '',
          state: (state) ? state : '',
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
        })
      },
      error => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    // Set these values in the state.
    this.setState({
      address: (address) ? address : '',
      area: (area) ? area : '',
      city: (city) ? city : '',
      state: (state) ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
    this.props.setCity(this.state.address)
  };


  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap
            defaultZoom={this.state.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >
            {/* InfoWindow on top of marker */}

            {/*Marker*/}
            <Marker
              google={this.props.google}
              name={'Dolores park'}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
              </div>
              </InfoWindow>
            <Marker />

              <Autocomplete
                style={{
                  width: '100%',
                  height: '40px',
                  paddingLeft: '16px',
                  marginTop: '2px',
                  marginBottom: '2rem'
                }}
                onPlaceSelected={this.onPlaceSelected}
                types={['(regions)']}
              />
          </GoogleMap>
        )
      )
    );

    return (
            <Form>
              <AsyncMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCFSW24SCUie4NcK11F7SUhKZYY6yBLL0&libraries=places"
                loadingElement={
                  <div style={{ height: `50%` }} />
                }
                containerElement={
                  <div />
                }
                mapElement={
                  <div style={{ height: `50%` }} />
                }
              />
              <Form.Group as={Row}>
                <Form.Label column sm={3}>Phường: </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Phường" value={this.state.area} disabled />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}>Quận: </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="District" value={this.state.city} disabled />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}>Thành phố / Tỉnh: </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="City" value={this.state.state} disabled />
                </Col>
              </Form.Group>
            </Form>
    )
  }

}

export default LocationSearchModal;
