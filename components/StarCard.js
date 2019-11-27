import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const starsRating = ratingValue => {
  const starArray = [];

  for (i = 1; i <= 5; i++) {
    if (ratingValue >= i) {
      starArray.push(
        <Ionicons key={i} name="ios-star" color="#FFB401" size={25} />
      );
    } else {
      // Nécessaire de mettre une clé pour enlever le warning. C'est l'icone qui est considérée comme étant répétée.
      starArray.push(
        <Ionicons key={i} name="ios-star" color="#BBBBBB" size={25} />
      );
    }
  }
  return starArray;
};

export default StarCard = props => {
  const { ratingValue } = props;

  return <Text>{starsRating(ratingValue)}</Text>;
};
