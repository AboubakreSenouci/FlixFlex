import React, { useState, useMemo } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Trending/Slider";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types";
import { useMovies, useTopRatedMovies } from "@/api/movies";
import Loading from "@/components/Loading";
import { useRouter } from "expo-router";

export default function MoviesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const combinePaginatedResults = (data) => {
    if (!data || !Array.isArray(data.pages)) return [];

    return data.pages.flatMap((page) => page.results || []);
  };
  const {
    data,
    isLoading: isLoadingMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies();

  const movies = useMemo(() => {
    return combinePaginatedResults(data);
  }, [data]);

  const { data: topRated, isLoading: isLoadingTopRated } = useTopRatedMovies();

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    if (!searchQuery.trim()) return movies;

    return movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  if (isLoadingMovies || isLoadingTopRated) {
    return <Loading />;
  }

  const fetchMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search movies...."
      />
      <FlatList
        ListHeaderComponent={
          <>
            {!searchQuery.trim() && (
              <>
                <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
                  Trending Movies
                </Text>
                <Slider
                  data={topRated}
                  onItemPress={(movieId) => {
                    router.push(`/movie/${movieId}`);
                  }}
                />
              </>
            )}
            <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
              {searchQuery.trim() ? "Search Results" : "All Movies"}
            </Text>
          </>
        }
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
        ListEmptyComponent={
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No movies found</Text>
          </View>
        }
        onEndReachedThreshold={0.5}
        onEndReached={fetchMore}
        ListFooterComponent={
          isFetchingNextPage && movies.length !== 0 ? (
            <ActivityIndicator />
          ) : null
        }
      />
    </View>
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
  },
  singleCardContainer: {
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 16,
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
