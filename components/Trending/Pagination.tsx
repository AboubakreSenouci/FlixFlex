import { useWindowDimensions, View, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Pagination = ({
  data,
  currentIndex,
  scrollX,
}: {
  data: any[];
  currentIndex: number;
  scrollX: Animated.SharedValue<number>;
}) => {
  return (
    <View style={styles.paginationContainer}>
      {data?.map((_, index) => (
        <View key={index}>
          <PaginationItem
            scrollX={scrollX}
            index={index}
            currentIndex={currentIndex}
          />
        </View>
      ))}
    </View>
  );
};

const PaginationItem = ({
  scrollX,
  index,
  currentIndex,
}: {
  scrollX: Animated.SharedValue<number>;
  index: number;
  currentIndex: number;
}) => {
  const { width } = useWindowDimensions();

  const paginationStyle = useAnimatedStyle(() => {
    const dotWidth = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [8, 20, 8],
      Extrapolation.CLAMP
    );

    return {
      width: dotWidth,
    };
  });

  return (
    <Animated.View
      style={[
        styles.paginationDot,
        index === currentIndex ? styles.activeDot : styles.inactiveDot,
        paginationStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    gap: 4,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: "#FFA101",
  },
  inactiveDot: {
    backgroundColor: "#7B7B8B",
  },
});

export default Pagination;
