import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface AspectRatioProps {
  ratio?: number;
  children: ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 1, // Default 1:1 ratio
  children,
  className,
  style,
}) => {
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
