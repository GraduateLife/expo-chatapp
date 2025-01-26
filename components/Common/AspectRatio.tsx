import React, { ReactNode } from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { AspectRatioType } from '../ui/utils';

export const aspectRatioToNumber = (ratio: AspectRatioType): number => {
  const ratioMap = {
    '1:1': 1,
    '16:9': 16 / 9,
    '4:3': 4 / 3,
  };
  return ratioMap[ratio];
};

interface AspectRatioProps {
  ratio?: AspectRatioType | number;
  children?: ReactNode;
  className?: string;
  style?: ViewStyle;
  imageUrl?: string;
  coverMode?: 'contain' | 'cover';
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  children,
  className,
  style,
  imageUrl,
}) => {
  if (typeof ratio === 'string') {
    ratio = aspectRatioToNumber(ratio);
  }
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
      ]}
    >
      {children}
    </View>
  );
};
