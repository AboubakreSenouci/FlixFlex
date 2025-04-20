import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { StatusBar } from "expo-status-bar";
import { Genre, Video, VideoResponse } from "@/types";
import { fetchMovieDetails, fetchMovieVideos } from "@/utils";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();
  const [playTrailer, setPlayTrailer] = useState(false);

  const { data: movie, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
  });

  const { data: videos, isLoading: isLoadingVideos } = useQuery<
    VideoResponse,
    Error,
    Video | null
  >({
    queryKey: ["movieVideos", id],
    queryFn: (): Promise<VideoResponse> => fetchMovieVideos(id),
    select: (data: VideoResponse): Video | null => {
      const trailers = data.results.filter(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailers.length > 0 ? trailers[0] : null;
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  if (isLoadingDetails || isLoadingVideos) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="light" />

        <ActivityIndicator size="large" color="#FFF" />
      </SafeAreaView>
    );
  }

  if (!movie) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar style="light" />

        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.errorText}>Movie not found</Text>
      </SafeAreaView>
    );
  }

  const renderTrailer = () => {
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
          <YoutubePlayer height={220} play={true} />
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`,
            }}
            style={styles.backdropImage}
          />
          <View style={styles.overlay} />
          <View style={styles.imageTextContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.rating}>
              ⭐ {movie.vote_average.toFixed(1)}/10
            </Text>
          </View>
        </View>

        {renderTrailer()}

        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Release Date:</Text>
            <Text style={styles.infoValue}>{movie.release_date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Runtime:</Text>
            <Text style={styles.infoValue}>
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </Text>
          </View>

          <View style={styles.genresContainer}>
            {movie.genres.map((genre: Genre) => (
              <View key={genre.id} style={styles.genrePill}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    height: 250,
  },
  backdropImage: {
    width: "100%",
    height: "100%",
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
