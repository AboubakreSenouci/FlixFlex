import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SeriesCardProps } from "@/types";

const SeriesCard: React.FC<SeriesCardProps> = ({
  item,
  imageStyle,
  titleStyle,
  ratingStyle,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/serie/${item.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={imageStyle || styles.image}
      />
      <Text style={titleStyle || styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={ratingStyle || styles.rating}>
        ⭐ {item.vote_average.toFixed(1)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  rating: {
    marginTop: 4,
    color: "#FFD700",
  },
});

export default SeriesCard;
