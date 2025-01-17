import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, Modal, Pressable, View, StyleSheet, Alert } from 'react-native';
import { useModalStore } from '~/store/modal';
import Animated, { withSpring, useAnimatedStyle, withSequence } from 'react-native-reanimated';

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
