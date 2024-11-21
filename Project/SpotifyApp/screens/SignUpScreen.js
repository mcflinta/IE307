// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';



// const SignUpScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [isValid, setIsValid] = useState(true);
//   const [hintText, setHintText] = useState("Don't forget to enter your email address.");

//   const handleEmailChange = (text) => {
//     setEmail(text);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValid(emailRegex.test(text) || text === '');

//     if (text === '') {
//       setHintText("Don't forget to enter your email address.");
//     } else if (!emailRegex.test(text)) {
//       setHintText("This email is invalid. Make sure it's written as example@email.com.");
//     } else {
//       setHintText("You'll need to confirm this email later.");
//     }
//   };

//   const handleNext = () => {
//     if (isValid && email) {
//       navigation.navigate('SignUpPwScreen'); // Navigate within SignUpFlow
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>What's your email address?</Text>
//       <TextInput
//         style={[
//           styles.input,
//           {
//             backgroundColor: email ? '#fff' : '#4c4c4c',
//             color: isValid ? '#000' : '#ff0000',
//           },
//         ]}
//         value={email}
//         onChangeText={handleEmailChange}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         returnKeyType="next"
//         autoCorrect={false}
//         cursorColor="#fff"
//         placeholder="Enter your email"
//         placeholderTextColor="#999"
//       />
//       <Text style={styles.hintText}>{hintText}</Text>
//       <View style={styles.containerButton}>
//         <TouchableOpacity
//           style={[
//             styles.nextButton,
//             { backgroundColor: isValid && email ? '#fff' : '#4c4c4c' },
//           ]}
//           onPress={handleNext}
//           disabled={!isValid || !email}
//         >
//           <Text
//             style={[
//               styles.nextButtonText,
//               { color: isValid && email ? '#000' : '#fff' },
//             ]}>
//             Next
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingHorizontal: 20, // Sử dụng padding thay vì margin
//   },
//   title: {
//     marginTop: 40,
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   input: {
//     marginTop: 10,
//     height: 50,
//     paddingLeft: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     fontSize: 16,
//   },
//   hintText: {
//     color: '#fff',
//     fontSize: 12,
//     marginBottom: 20,
//   },
//   containerButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   nextButton: {
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 40,
//     paddingHorizontal: 25,
//   },
//   nextButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SignUpScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [hintText, setHintText] = useState("Don't forget to enter your email address.");

  useEffect(() => {
    // Giả sử bạn muốn gửi một giá trị nào đó lên MainStack
    const someValue = 'SignUpScreen';

    // Gửi giá trị lên navigator cha
    navigation.getParent()?.setParams({ someValue });
  }, [navigation]);


  const handleEmailChange = (text) => {
    setEmail(text);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(text) || text === '');

    if (text === '') {
      setHintText("Don't forget to enter your email address.");
    } else if (!emailRegex.test(text)) {
      setHintText("This email is invalid. Make sure it's written as example@email.com.");
    } else {
      setHintText("You'll need to confirm this email later.");
    }
  };

  const handleNext = () => {
    if (isValid && email) {
      navigation.navigate('SignUpPwScreen'); // Navigate within SignUpFlow
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your email address?</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: email ? '#fff' : '#4c4c4c', // Gray if empty, white if filled
            color: isValid ? '#000' : '#ff0000', // Red text if invalid
          },
        ]}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        autoCorrect={false}
        cursorColor="#fff"
        placeholder="Enter your email"
        placeholderTextColor="#999"
      />
      <Text style={styles.hintText}>{hintText}</Text>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: isValid && email ? '#fff' : '#4c4c4c' }, // Button color
          ]}
          onPress={handleNext}
          disabled={!isValid || !email} // Disable if invalid
        >
          <Text
            style={[
              styles.nextButtonText,
              { color: isValid && email ? '#000' : '#fff' }, // Text color
            ]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20, // Use padding instead of margin
  },
  title: {
    marginTop: 40,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    height: 50,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  hintText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 20,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 25,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
