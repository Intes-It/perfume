import React from 'react'
import { withGoogleMap, withScriptjs} from "react-google-maps"
const GoogleMap = require('react-google-maps').GoogleMap;
const Map = () => {
  return (
    <div>
      <GoogleMap
          defaultZoom={19}
          defaultCenter={{ lat: 48.893623, lng: 2.213478 }}
        >
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));