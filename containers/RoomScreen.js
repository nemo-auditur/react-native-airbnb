import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import StarCard from "../components/StarCard";

import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import MapPreview from "../components/MapPreview";

import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

import Swiper from "react-native-swiper";

export default function RoomScreen() {
  const { params } = useRoute();
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [photoArray, setPhotoArray] = useState([]);
  const [isLoadingArray, setIsLoadingArray] = useState(true);

  const size = 50;

  const fetchData = async () => {
    let numberPhotos = 0;

    try {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room/" + params._id
      );
      setRoom(response.data);
      setPhotoArray(response.data.photos);
      // console.log(response.data.photos);
      // console.log(numberPhotosArray);
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
      <View>
        <Swiper
          style={styles.swiper}
          autoplay
          autoplayTimeout={4}
          showsPagination={false}
        >
          {photoArray.map((photo, index) => {
            return (
              <View key={index}>
                <Image
                  style={{ height: 400, width: 500 }}
                  source={{ uri: photo }}
                />
              </View>
            );
          })}
        </Swiper>
      </View>
      <View style={styles.container}>
        <View style={styles.informationsContainer}>
          <View style={styles.reviewsContainer}>
            <Text numberOfLines={1} style={styles.titleAnnounce}>
              {room.title}
            </Text>
            <View style={styles.starsContainer}>
              <StarCard key={room.id} ratingValue={room.ratingValue} />
              <Text style={{ marginLeft: 10 }}>{room.reviews} reviews</Text>
            </View>
          </View>
          <Image
            source={{ uri: room.user.account.photos[0] }}
            style={{
              height: size,
              width: size,
              borderRadius: size / 2
            }}
          />
        </View>
        <View>
          <Text numberOfLines={6} style={[styles.description]}>
            {room.description}
          </Text>
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
  informationsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },
  titleAnnounce: {
    fontSize: 20
  },
  description: {
    fontSize: 15,
    marginBottom: 20
  },
  price: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    bottom: 5,
    height: 30,
    width: 50,
    fontSize: 20,
    backgroundColor: "black",
    color: "white"
  },
  reviewsContainer: {
    flex: 1,
    width: 300,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  starsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    paddingLeft: 30
  },
  mapContainer: {
    height: 350,
    width: 350
  },
  slide: {
    justifyContent: "center"
  },

  swiper: {
    height: 400
  }
});
