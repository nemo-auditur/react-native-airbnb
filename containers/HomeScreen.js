import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, FlatList, Image, Text, StyleSheet, View } from "react-native";
import StarRating from "react-native-star-rating";
import StarCard from "../components/StarCard";

// import axios
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [rooms, setRooms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
      );
      setRooms(response.data.rooms);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>Chargement en cours</Text>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => (
            <View style={[styles.container]}>
              <View style={[styles.imageContainer]}>
                <Image
                  style={{ width: 350, height: 200 }}
                  source={{ uri: item.photos[0] }}
                ></Image>
                <Text style={[styles.price]}>{item.price} €</Text>
                <Text numberOfLines={1}>{item.title}</Text>
                <View style={[styles.reviewsContainer]}>
                  <View style={[styles.starsContainer]}>
                    <StarCard ratingValue={item.ratingValue} />
                  </View>
                </View>
                <Text>{item.reviews} reviews</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30
  },
  imageContainer: {
    marginBottom: 20
  },

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
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  starsContainer: {
    width: 100
  }
});
