import React, { useState, useEffect } from "react";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function MapPreview(props) {
  const { loc } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const askPermission = async () => {
      // Va afficher une alerte pour demander la permission (seulement la premiere fois où on demande)
      const obj = await Permissions.askAsync(Permissions.LOCATION);

      if (obj.status === "granted") {
        // Va obtenir les coordonnees GPS
        const location = await Location.getCurrentPositionAsync({});

        // alert(JSON.stringify(location));
        setLocation(location);
      }
    };
    askPermission();
  }, []);

  return (
    <>
      {loc && (
        <MapView
          showsUserLocation={true}
          // showsMyLocationButton={true}
          // provider="google"
          style={{ height: 350, width: 350 }}
          initialRegion={{
            latitude: loc[1],
            longitude: loc[0],
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: loc[1],
              longitude: loc[0]
            }}
          />
        </MapView>
      )}
    </>
  );
}
