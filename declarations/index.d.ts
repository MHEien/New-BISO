declare module 'react-native-switch-selector' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    export interface SwitchSelectorOption {
      label: string;
      value: string | number;
      customIcon?: JSX.Element;
      activeColor?: string;
    }
  
    export interface SwitchSelectorProps {
      options: SwitchSelectorOption[];
      initial: number;
      onPress: (value: string | number) => void;
      fontSize?: number;
      selectedColor?: string;
      buttonColor?: string;
      borderColor?: string;
      hasPadding?: boolean;
      animationDuration?: number;
      valuePadding?: number;
      height?: number;
      bold?: boolean;
      backgroundColor?: string;
      textStyle?: TextStyle;
      selectedTextStyle?: TextStyle;
      textTransitionStyle?: TextStyle;
      buttonTextStyle?: TextStyle;
      style?: ViewStyle;
    }
  
    export default class SwitchSelector extends Component<SwitchSelectorProps> {}
  }
  