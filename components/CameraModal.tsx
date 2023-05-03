import { Camera, CameraType } from 'expo-camera';
import { View } from './Themed';
import { Button } from './Button';
import { useState } from 'react';
import { useThemeColor } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { Platform, UIManager, LayoutAnimation, StyleSheet, TouchableOpacity, Dimensions, Modal, Text } from 'react-native';



interface CameraModalProps {
    isVisible: boolean;
    onClose: () => void;
    onPictureTaken: (uri: string) => void;
}

export default function CameraScreen({ isVisible, onClose, onPictureTaken }: CameraModalProps) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState<Camera | null>(null);

    const backgroundColor = useThemeColor({}, 'background');
    const primaryBackgroundColor = useThemeColor({}, 'primaryBackground');
    const textColor = useThemeColor({}, 'text');

    const handleCameraTypePress = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };

   if (!permission) {
        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: textColor }}>Camera permission is required</Text>
                    <TouchableOpacity onPress={requestPermission}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ color: textColor }}>Request permission</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: textColor }}>Camera permission is not granted</Text>
                    <TouchableOpacity onPress={requestPermission}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ color: textColor }}>Request permission</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const handleCameraReady = () => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.easeInEaseOut();
        }
    };



    const handleTakePicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            onPictureTaken(photo.uri);
            console.log(photo.uri);
            onClose();
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={{ flex: 1 }}>
                <Camera
                    style={{ flex: 1 }}
                    type={type}
                    onCameraReady={handleCameraReady}
                    ref={(ref) => setCamera(ref)}
                >
                    <View style={styles.cameraContainer}>
                        <View style={styles.cameraButtonContainer}>
                            <TouchableOpacity onPress={handleTakePicture}>
                                <View style={styles.cameraButton}>
                                    <Ionicons name="camera" size={32} color={textColor} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    cameraButtonContainer: {
        position: 'absolute', // Position the container absolutely
        bottom: 40, // Set the bottom position
        width: '100%', // Set the width to the full screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    cameraButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
