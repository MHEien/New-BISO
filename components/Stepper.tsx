import React, { useState } from 'react';
import { View, Button, Text } from '../components/Themed';
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface WizardProps {
    steps: React.ReactNode[];
    onRegister: () => void;
  }
  
  
  const Wizard: React.FC<WizardProps> = ({ steps, onRegister }) => {
    const [currentStep, setCurrentStep] = useState(0);
  
    const goToPreviousStep = () => {
      setCurrentStep((prevStep: number) => prevStep - 1);
    };
  
    const goToNextStep = () => {
      if (currentStep === steps.length - 1) {
        onRegister();
      } else {
        setCurrentStep((prevStep: number) => prevStep + 1);
      }
    };
  
    const StepIndicator = ({ index }: { index: number }) => (
      <View style={[styles.stepIndicator, currentStep === index && styles.activeStepIndicator]}>
        <Text style={styles.stepIndicatorText}>{index + 1}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <View style={styles.stepIndicatorsContainer}>
          {steps.map((_, index) => (
            <StepIndicator key={index} index={index} />
          ))}
        </View>
        <View style={styles.stepContainer}>{steps[currentStep]}</View>
        <View style={styles.buttonsContainer}>
          {currentStep > 0 && (
            <Button onPress={goToPreviousStep} style={styles.backButton} title="Back" />
          )}
          <Button onPress={goToNextStep} style={styles.nextButton} title="Next" />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: screenWidth,
    },
    stepIndicatorsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 10,
    },
    stepIndicator: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeStepIndicator: {
      backgroundColor: '#8bc34a',
    },
    stepIndicatorText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    stepContainer: {
      flex: 1,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    backButton: {
      backgroundColor: '#8bc34a',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
    },
    nextButton: {
      backgroundColor: '#8bc34a',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
  });
  
  export default Wizard;