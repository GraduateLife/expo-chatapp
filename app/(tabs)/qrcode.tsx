import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

export default function QRCode() {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSequence(
          withSpring(0, { duration: 0 }), // Start from 0
          withSpring(1.1, { damping: 12 }), // Bounce slightly larger
          withSpring(1, { damping: 8 }) // Settle to normal size
        ),
      },
    ],
  }));

  return (
    <>
      <SafeAreaView>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text>QR Code Scanner</Text>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});
