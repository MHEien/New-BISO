import React from 'react';
import { Layout } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientLayoutProps {
    children: React.ReactNode;
    style?: any
    colors?: string[]
}

export const GradientLayout = ({ children, style, colors }: GradientLayoutProps) => {
    return (
      <Layout style={[{ flex: 1, backgroundColor: 'transparent' }, style]}>
        <LinearGradient
          colors={colors ? colors : ['#4c669f', '#3b5998', '#192f6a']}
          style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
        />
        {children}
      </Layout>
    );
  };
  
