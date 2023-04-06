import React from 'react';
import { Text as DefaultText, useColorScheme, View as DefaultView, TouchableOpacity as DefaultButton } from 'react-native';
import Colors from '../constants/Colors';
import { TextInput as DefaultTextInput } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ThemeButtonProps = ThemeProps & DefaultButton['props'] & { title: string };

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderBottomColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderBottomColor');

  return <DefaultTextInput style={[{ color, backgroundColor, borderBottomColor }, style]} {...otherProps} />;
}

export function Button(props: ThemeButtonProps) {
  const { style, lightColor, darkColor, title, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

  return (
    <DefaultButton
      style={[{ backgroundColor, alignItems: 'center', justifyContent: 'center' }, style]}
      {...otherProps}
    >
      <Text style={{ color }}>{title}</Text>
    </DefaultButton>
  );
}
