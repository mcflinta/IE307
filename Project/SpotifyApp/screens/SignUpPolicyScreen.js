import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Keyboard,
    TextInput,
    Animated,
} from 'react-native';
import CircleTickIconDefault from '../assets/svg/CircleTickIconDefault.svg'; // SVG mặc định
import CircleTickIconChecked from '../assets/svg/CircleTickIconChecked.svg'; // SVG khi tick

const SignUpPolicyScreen = ({ navigation }) => {
    const route = useRoute();
    const { email, password,gender } = route.params || {}; 

    const [isTerms, setIsTerms] = useState(false);
    const [isPrivacy, setIsPrivacy] = useState(false);
    const [name, setName] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const buttonBottom = useState(new Animated.Value(20))[0]; // Giá trị khởi tạo margin-bottom

    useEffect(() => {
            // Log để kiểm tra email nhận được

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            Animated.timing(buttonBottom, {
                toValue: 20, // Di chuyển nút lên trên
                duration: 300,
                useNativeDriver: false,
            }).start();
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            Animated.timing(buttonBottom, {
                toValue: 20, // Trở về vị trí ban đầu
                duration: 300,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [buttonBottom, email, password, gender]);

    const createAccount = async () => {
        navigation.navigate('LoadingScreen', {
            email: email.trim(),
            password: password.trim(),
            fromScreen: 'SignUpPolicyScreen', // Thêm thông tin màn hình nguồn
            gender: gender.trim(),
            name: name.trim(),
          });
        // const userData = {
        //     email,
        //     password,
        //     gender,
        //     name,
        // };
        // console.log('User data:', userData);
        // // console.log('isTerms:', isTerms);
        // try {
        //     // Gửi yêu cầu POST đến server
        //     // const response = await fetch('http://192.168.105.35:3000/api/register', {
        //     //     method: 'POST',
        //     //     headers: {
        //     //         'Content-Type': 'application/json',
        //     //     },
        //     //     body: JSON.stringify(userData),
        //     // });
    
        //     // const data = await response.json();
    
        //     // if (response.ok) {
        //     //     console.log('Account created successfully:', data);
        //         navigation.navigate('LoadingScreen'); // Chuyển đến màn hình tiếp theo
        //     // } else {
        //     //     console.error('Failed to create account:', data);
        //     //     alert(data.message || 'Failed to create account. Please try again.');
        //     // }
        // } catch (error) {
        //     console.error('Error creating account:', error);
        //     alert('An error occurred. Please try again later.');
        // }
    };

    const handleToggle = (key) => {
        if (key === 'isTerms') {
            setIsTerms(!isTerms);
        } else if (key === 'isPrivacy') {
            setIsPrivacy(!isPrivacy);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What's your name?</Text>
            <TextInput
                style={[
                    styles.input,
                    { backgroundColor: name ? '#4c4c4c' : '#fff' },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                cursorColor="#fff"
                autoCapitalize="none"
                keyboardType="default"
            />
            <Text style={styles.textHint}>This appears on your Spotify profile.</Text>
            <View style={styles.divider} />
            <Text style={styles.textHint}>
                By tapping 'Create account', you agree to the Spotify Terms of Use.
            </Text>
            <Text style={styles.textLink}>Terms of Use</Text>
            <Text style={styles.textHint}>
                To learn more about how Spotify collects, uses, shares and protects your personal data, please see
                the Spotify Privacy Policy.
            </Text>
            <Text style={styles.textLink}>Privacy Policy</Text>

            {/* Checkbox for Terms */}
            <View style={styles.containerAccept}>
                <Text style={styles.textAdvertise}>I would prefer not to receive marketing messages from Spotify.</Text>
                <TouchableOpacity onPress={() => handleToggle('isTerms')} style={styles.iconContainer}>
                    {isTerms ? (
                        <CircleTickIconChecked width={22} height={22} />
                    ) : (
                        <CircleTickIconDefault width={22} height={22} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Checkbox for Privacy */}
            <View style={styles.containerAccept}>
                <Text style={styles.textAdvertise}>Share my registration data with Spotify's content providers for marketing purpose.</Text>
                <TouchableOpacity onPress={() => handleToggle('isPrivacy')} style={styles.iconContainer}>
                    {isPrivacy ? (
                        <CircleTickIconChecked width={22} height={22} />
                    ) : (
                        <CircleTickIconDefault width={22} height={22} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Button */}
            <Animated.View style={[styles.buttonContainer, { bottom: buttonBottom }]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.createAccountButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={createAccount}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 40,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 10,
        height: 50,
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        fontSize: 16,
        color: '#fff',
    },
    textHint: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 18,
    },
    textAdvertise: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 18,
        width: '90%',
    },
    textLink: {
        color: '#1DB954',
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    divider: {
        height: 0.2,
        backgroundColor: '#B0B0B0',
        marginVertical: 21,
    },
    containerAccept: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    iconContainer: {
        marginLeft: 10,
    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        // marginTop: 100,
    },
    createAccountButton: {
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '50%',
    },
    buttonPressed: {
        backgroundColor: '#d9d9d9',
        transform: [{ scale: 0.96 }],
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Spotify-font',
    },
});

export default SignUpPolicyScreen;
