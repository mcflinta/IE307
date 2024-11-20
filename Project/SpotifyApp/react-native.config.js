import { Text, TextInput } from 'react-native';

const defaultFont = 'SpotifyMixUI-Regular'; // Tên font chữ mặc định

// Override toàn bộ Text
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: defaultFont };

// Override toàn bộ TextInput
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = { fontFamily: defaultFont };
