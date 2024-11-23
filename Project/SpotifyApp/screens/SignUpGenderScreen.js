import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

const SignUpGenderScreen = ({ navigation }) => {
    const [gender, setGender] = React.useState(null);

    const selectHandleNext = (gender) => {
        setGender(gender);
        navigation.navigate('SignUpPolicyScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                What's your gender?
            </Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.buttonGender, gender==='Female' && styles.buttonSelected,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => selectHandleNext('Female')}>
                    <Text style={[styles.textButton, gender==='Female' && styles.textSelected]}>Female</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.buttonGender, gender==='Male' && styles.buttonSelected,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => selectHandleNext('Male')}>
                    <Text style={[styles.textButton, gender==='Male' && styles.textSelected]}>
                        Male
                    </Text>    
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.buttonGender, gender==='Non-binary' && styles.buttonSelected,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => selectHandleNext('Non-binary')}>
                    <Text style={[styles.textButton, gender==='Non-binary' && styles.textSelected]}>
                        Non-binary
                    </Text>    
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.buttonGender, gender==='Other' && styles.buttonSelected,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => selectHandleNext('Other')}>
                    <Text style={[styles.textButton, gender==='Other' && styles.textSelected]}>
                        Other
                    </Text>    
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.buttonGender, gender==='Prefer not to say' && styles.buttonSelected,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => selectHandleNext('Prefer not to say')}>
                    <Text style={[styles.textButton, gender==='Prefer not to say' && styles.textSelected]}>
                        Prefer not to say
                    </Text>    
                </Pressable>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 40,
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonGender: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginTop: 20,
        marginRight: 10,
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#808080',
    },
    buttonPressed: {
        borderColor: '#4d4d4d',
        transform: [{ scale: 0.94 }],
    },
    textButton: {
        color: '#808080',
        fontSize: 16,
        fontWeight: '700',
    },
    buttonSelected: {
        borderColor: '#fff'
    },
    textSelected: {
        color: '#fff'
    }
};

export default SignUpGenderScreen;