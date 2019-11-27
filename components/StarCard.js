import React from "react";
import { Text, View } from "react-native";
import EvilIcons from "@expo/vector-icons";

const starsRating = ratingValue => {
  console.log(ratingValue);

  const starArray = [];

  for (i = 0; i <= 5; i++) {
    if (ratingValue >= i) {
      starArray.push(<EvilIcons name="star" color="yellow" />);
    } else {
      starArray.push(<EvilIcons name="star" color="grey" />);
    }
  }
  console.log(starArray);
  return starArray.map(item => {
    return item;
  });
};

const StarCard = props => {
  const { ratingValue } = props;

  return <View>{ratingValue && starsRating(ratingValue)}</View>;
};
export default StarCard;
