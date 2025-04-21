import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import { OnboardingItem, ViewableItemsChanged } from "@/types";
import { onboardingData } from "@/constants";
import { useOnboardingStatus } from "@/hooks/use-onboarding-status";
import Loading from "@/components/Loading";

const { width } = Dimensions.get("window");

export default function OnboardingScreen(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<OnboardingItem> | null>(null);
  const isCheckingOnboardingStatus = useOnboardingStatus();

  const handleNext = async (): Promise<void> => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      try {
        await AsyncStorage.setItem("@onboarding_completed", "true");
        router.replace("/(auth)/signin");
      } catch (error) {
        router.replace("/(auth)/signin");
      }
    }
  };

  const handleSkip = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("@onboarding_completed", "true");
      router.replace("/(auth)/signin");
    } catch (error) {
      router.replace("/(auth)/signin");
    }
  };

  const handleViewableItemsChanged = useRef((info: ViewableItemsChanged) => {
    if (
      info.viewableItems.length > 0 &&
      info.viewableItems[0].index !== undefined
    ) {
      if (info.viewableItems[0].index !== null) {
        setCurrentIndex(info.viewableItems[0].index);
      }
    }
  }).current;

  const renderItem = ({ item }: { item: OnboardingItem }): JSX.Element => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>

          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex ? styles.paginationDotActive : null,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!isCheckingOnboardingStatus) {
    return <Loading />;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={onboardingData}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height: "100%",
    padding: 0,
    justifyContent: "space-between",
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 50,
    paddingRight: 20,
    zIndex: 10,
  },
  skipText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "white",
    width: 20,
  },
  nextButton: {
    backgroundColor: "#00A693",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
