import { ReactNode } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

type ContainerProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({ children, style }: ContainerProps) => {
  return <View style={[{ paddingHorizontal: 16 }, style]}>{children}</View>;
};
