import { useCallback, useRef, useState } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import SliderItem from "./SliderItem";
import Pagination from "./Pagination";
import { SliderProps } from "@/types";

const Slider = ({ data, onItemPress }: SliderProps) => {
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onViewCallBack = useCallback((viewableItems: any) => {
    if (viewableItems.changed && viewableItems.changed.length > 0) {
      setCurrentIndex(viewableItems.changed[0].index);
    }
  }, []);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem
            index={index}
            thumbnail={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            scrollX={scrollX}
            onPress={() => onItemPress(item.id)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        pagingEnabled
        onScroll={handleOnScroll}
        onViewableItemsChanged={onViewCallBack}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={(item) => item.id.toString()}
      />
      <View>
        <Pagination data={data} currentIndex={currentIndex} scrollX={scrollX} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    rowGap: 16,
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
});

export default Slider;
