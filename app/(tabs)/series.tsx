import React, { useState, useMemo } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Slider from "@/components/Trending/Slider";
import SeriesCard from "@/components/SerieCard";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import { useSeries, useTopRatedSeries } from "@/api/series";

export default function SeriesScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: series, isLoading: isLoadingSeries } = useSeries();

  const { data: topRated, isLoading: isLoadingTopRated } = useTopRatedSeries();

  const filteredSeries = useMemo(() => {
    if (!series) return [];
    if (!searchQuery.trim()) return series;

    return series.filter((show: { name: string }) =>
      show.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [series, searchQuery]);

  if (isLoadingSeries || isLoadingTopRated) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search series..."
      />

      {!searchQuery.trim() && (
        <>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
            Trending Series
          </Text>
          <Slider data={topRated} />
        </>
      )}

      <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
        {searchQuery.trim() ? "Search Results" : "All Series"}
      </Text>

      {filteredSeries.length === 0 && searchQuery.trim() !== "" ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No series found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredSeries}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.singleCardContainer}>
              <SeriesCard
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
