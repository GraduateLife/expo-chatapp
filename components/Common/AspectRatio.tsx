import React, { ReactNode } from 'react';
import { View, ViewStyle, Image, Pressable, Linking } from 'react-native';
import { cn } from '../ui/utils';
import { Toast, useToastController } from '@tamagui/toast';

interface AspectRatioProps {
  ratio?: number;
  children?: ReactNode;
  className?: string;
  style?: ViewStyle;
  imageUrl?: string;
  coverMode?: 'contain' | 'cover';
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 1, // Default 1:1 ratio
  children,
  className,
  style,
  imageUrl,
}) => {
  if (imageUrl) {
    return (
      <View className={className}>
        <Image
          className="h-full w-full rounded-lg"
          source={{ uri: imageUrl }}
          style={{
            aspectRatio: ratio,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  }

  return (
    <View
      className={className}
      style={[
        style,
        {
          aspectRatio: ratio,
          overflow: 'hidden',
        },
      ]}>
      {children}
    </View>
  );
};
