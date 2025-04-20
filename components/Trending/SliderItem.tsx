import { useWindowDimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Image } from "react-native";

interface SliderItemProps {
  index: number;
  thumbnail: string;
  scrollX: SharedValue<number>;
}

const SliderItem = ({ index, thumbnail, scrollX }: SliderItemProps) => {
  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.5, 0, width * 0.5],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[{ width: width }, animatedStyle, styles.container]}>
      <Image
        source={{ uri: thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 220,
    borderRadius: 12,
  },
});

export default SliderItem;
