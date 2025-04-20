import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { Genre } from "@/types";
import Loading from "@/components/Loading";
import { useSeriesDetails, useSeriesVideos } from "@/api/series";

export default function SeriesDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [playTrailer, setPlayTrailer] = useState(false);

  const { data: series, isLoading: isLoadingDetails } = useSeriesDetails(
    Number(id)
  );

  const { data: videos, isLoading: isLoadingVideos } = useSeriesVideos(
    Number(id)
  );

  if (isLoadingDetails || isLoadingVideos) {
    return <Loading />;
  }

  const renderTrailer = (): JSX.Element => {
    if (!videos) {
      return (
        <View style={styles.noTrailerContainer}>
          <Text style={styles.noTrailerText}>No trailer available</Text>
        </View>
      );
    }

    if (playTrailer) {
      return (
        <View style={styles.trailerContainer}>
          <YoutubePlayer height={220} play={true} videoId={videos.key} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.trailerButton}
        onPress={() => setPlayTrailer(true)}
      >
        <AntDesign name="playcircleo" size={24} color="#FFF" />
        <Text style={styles.trailerButtonText}>Play Trailer</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/series")}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                series.backdrop_path || series.poster_path
              }`,
            }}
            style={styles.backdropImage}
          />
          <View style={styles.overlay} />
          <View style={styles.imageTextContainer}>
            <Text style={styles.title}>{series.name}</Text>
            <Text style={styles.rating}>
              ⭐ {series.vote_average.toFixed(1)}/10
            </Text>
          </View>
        </View>

        {renderTrailer()}

        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>First Air Date:</Text>
            <Text style={styles.infoValue}>{series.first_air_date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{series.status}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Seasons:</Text>
            <Text style={styles.infoValue}>{series.number_of_seasons}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Episodes:</Text>
            <Text style={styles.infoValue}>{series.number_of_episodes}</Text>
          </View>

          <View style={styles.genresContainer}>
            {series.genres.map((genre: Genre) => (
              <View key={genre.id} style={styles.genrePill}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{series.overview}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
  },
  errorText: {
    color: "#FFF",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    top: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    height: 400,
    marginTop: -40,
  },
  backdropImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imageTextContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    color: "#FFD700",
    fontSize: 16,
    marginTop: 8,
  },
  trailerContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  trailerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E50914",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  trailerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  noTrailerContainer: {
    padding: 16,
    alignItems: "center",
  },
  noTrailerText: {
    color: "#999",
    fontSize: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    color: "#999",
    width: 100,
    fontSize: 14,
  },
  infoValue: {
    color: "#FFF",
    flex: 1,
    fontSize: 14,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 16,
  },
  genrePill: {
    backgroundColor: "#333",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: "#FFF",
    fontSize: 12,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  overviewText: {
    color: "#CCC",
    fontSize: 14,
    lineHeight: 22,
  },
});
