import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MovieCardProps } from "@/types";

const MovieCard: React.FC<MovieCardProps> = ({
  item,
  imageStyle,
  titleStyle,
  ratingStyle,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/movie/${item.id}`);
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
        {item.title}
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

export default MovieCard;
