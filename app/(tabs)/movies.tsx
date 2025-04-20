import React, { useState, useMemo } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Trending/Slider";
import SearchBar from "@/components/SearchBar";
import { StatusBar } from "expo-status-bar";
import { Movie } from "@/types";
import { fetchMovies, fetchTopRated } from "@/utils";

export default function MoviesScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: movies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    select: (data) => data.results,
  });

  const { data: topRated, isLoading: isLoadingTopRated } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => fetchTopRated("movie"),
    select: (data) => data.results.slice(0, 5),
  });

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    if (!searchQuery.trim()) return movies;

    return movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  if (isLoadingMovies || isLoadingTopRated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search movies..."
        />

        {!searchQuery.trim() && (
          <>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
              Trending Movies
            </Text>
            <Slider data={topRated} />
          </>
        )}

        <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
          {searchQuery.trim() ? "Search Results" : "All Movies"}
        </Text>

        {filteredMovies.length === 0 && searchQuery.trim() !== "" ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No movies found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredMovies}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.singleCardContainer}>
                <MovieCard
                  item={item}
                  imageStyle={styles.cardImage}
                  titleStyle={styles.cardTitle}
                  ratingStyle={styles.cardRating}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 16,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  singleCardContainer: {
    width: "100%",
    marginBottom: 16,
  },
  cardImage: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    resizeMode: "cover",
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardRating: {
    marginTop: 4,
    fontSize: 12,
    color: "#FFD700",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  noResultsText: {
    color: "#999",
    fontSize: 16,
  },
});
