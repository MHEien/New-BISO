import { Camera, CameraType } from 'expo-camera';
import { View } from './Themed';
import { Button } from './Button';
import { useState } from 'react';
import { useThemeColor } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { Platform, UIManager, LayoutAnimation, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';


const screenWidth = Dimensions.get('window').width;

interface CameraModalProps {
    isVisible: boolean;
    onClose: () => void;
    onPictureTaken: (uri: string) => void;
}

//Fullscreen camera modal. Top right corner is a X button to close the modal.
//Bottom middle is a round button with a camera icon to take a picture.
//What happens with the picture is up to the onPictureTaken function.
const CameraModal: React.FC<CameraModalProps> = ({ isVisible, onClose, onPictureTaken }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState<Camera | null>(null);

    const backgroundColor = useThemeColor({}, 'background');
    const primaryBackgroundColor = useThemeColor({}, 'primaryBackground');
    const textColor = useThemeColor({}, 'text');

    const handleCameraTypePress = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };

    const handleCameraReady = () => {
        setHasPermission(true);
    };

    const handleTakePicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            onPictureTaken(photo.uri);
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
    cameraContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    cameraButtonContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    cameraButton: {
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'white',
        padding: 10,
    },
    cameraTypeButtonContainer: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginRight: 20,
    },
    cameraTypeButton: {
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'white',
        padding: 10,
    },
});

export default CameraModal;