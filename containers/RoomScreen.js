import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import StarCard from "../components/StarCard";

import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import MapPreview from "../components/MapPreview";

import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default function RoomScreen() {
  const { params } = useRoute();
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room/" + params._id
      );
      setRoom(response.data);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading === true ? (
    <View>
      <ActivityIndicator size="large" color="#FF5A5F"></ActivityIndicator>
    </View>
  ) : (
    <ScrollView>
      <Image
        style={{ width: 420, height: 350, resizeMode: "cover" }}
        source={{ uri: room.photos[0] }}
      />
      <View style={[styles.container]}>
        <View>
          <View>
            <Text>{room.title}</Text>
            <View style={[styles.starsContainer]}>
              <StarCard ratingValue={room.ratingValue} />
              <Text>{room.reviews} reviews</Text>
            </View>
            <Text numberOfLines={6}>{room.description}</Text>
          </View>
        </View>
        <MapPreview style={[styles.mapContainer]} loc={room.loc} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30
  },
  imageContainer: {
    marginBottom: 20
  },
  titleAnnounce: {},
  price: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    bottom: 90,
    height: 50,
    width: 70,
    fontSize: 30,
    backgroundColor: "black",
    color: "white"
  },
  reviewsContainer: {
    flex: 1,
    width: 300,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30
  },
  starsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 155,
    paddingLeft: 30
  },
  mapContainer: {
    height: 350,
    width: 350
  }
});
