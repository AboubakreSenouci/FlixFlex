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
import { useMovies, useSearchMovies, useTopRatedMovies } from "@/api/movies";
import Loading from "@/components/Loading";
import { useRouter } from "expo-router";
import { combinePaginatedResults } from "@/utils/combine-paginated-results";

export default function MoviesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data,
    isLoading: isLoadingMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies();

  const {
    data: searchResults,
    isLoading: isSearching,
    isFetching: isFetchingSearch,
  } = useSearchMovies(searchQuery);

  const movies = useMemo(() => {
    return combinePaginatedResults(data);
  }, [data]);

  const { data: topRated, isLoading: isLoadingTopRated } = useTopRatedMovies();

  const displayedMovies = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults ?? [];
    }
    return movies;
  }, [searchQuery, movies, searchResults]);

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

      {(isLoadingTopRated || isLoadingMovies) && !searchQuery.trim() ? (
        <Loading size={40} />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {!searchQuery.trim() && (
                <>
                  <Text
                    style={[styles.sectionTitle, { paddingHorizontal: 16 }]}
                  >
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
              {searchQuery.trim() && isFetchingSearch && (
                <ActivityIndicator style={{ marginBottom: 10 }} />
              )}
            </>
          }
          data={displayedMovies}
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
          ListEmptyComponent={() => {
            if (searchQuery.trim()) {
              if (isFetchingSearch || isSearching) {
                return;
              }

              if ((searchResults?.length ?? 0) === 0) {
                return (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No movies found</Text>
                  </View>
                );
              }
            }

            return null;
          }}
          onEndReachedThreshold={0.5}
          onEndReached={fetchMore}
          ListFooterComponent={
            !isFetchingSearch && isFetchingNextPage && movies.length !== 0 ? (
              <ActivityIndicator />
            ) : null
          }
        />
      )}
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
