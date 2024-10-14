import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SectionList, Text, View, Image, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native';
import { fruits_vegetables } from '../data/data';

const FruitsVegetablesList = ({ selectedItems, setSelectedItems }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;
  const [buttonLayouts, setButtonLayouts] = useState([]);
  const imageScale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const toggleSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const filteredSections = fruits_vegetables.filter(section => section.title === selectedCategory);

  useEffect(() => {
    const index = fruits_vegetables.findIndex(section => section.title === selectedCategory);

    if (index === -1 || buttonLayouts.length === 0) return;

    const { x, width } = buttonLayouts[index];

    Animated.spring(underlinePosition, {
      toValue: x,
      useNativeDriver: false,
    }).start();

    Animated.spring(underlineWidth, {
      toValue: width,
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.spring(imageScale, {
          toValue: 1.2,
          useNativeDriver: false,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, [selectedCategory, buttonLayouts]);

  const handleButtonLayout = useCallback((event, index) => {
    const { x, width } = event.nativeEvent.layout;
    setButtonLayouts(prevLayouts => {
      const newLayouts = [...prevLayouts];
      newLayouts[index] = { x, width };
      return newLayouts;
    });
  }, []);

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.includes(item);
    const itemOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(itemOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, []);

    return (
      <Animated.View style={[styles.itemContainer, { opacity: itemOpacity }]}>
        <Text style={styles.itemText}>{item}</Text>
        <TouchableOpacity
          style={[styles.button, isSelected ? styles.selectedButton : styles.deselectedButton]}
          onPress={() => toggleSelection(item)}
        >
          <Text style={styles.buttonText}>{isSelected ? 'DESELECT' : 'SELECT'}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <>
      {/* Header section with titles and underline */}
      <View style={styles.headerRow}>
        {fruits_vegetables.map((section, index) => {
          const isSelected = selectedCategory === section.title;
          return (
            <TouchableOpacity
              key={section.title}
              style={styles.headerButton}
              onPress={() => setSelectedCategory(section.title)}
              onLayout={(event) => handleButtonLayout(event, index)}
            >
              <Animated.View
                style={[
                  styles.containerTitle,
                  isSelected && { transform: [{ scale: imageScale }] },
                ]}
              >
                <Image source={{ uri: section.url }} style={styles.image} />
                <Animated.Text
                  style={[
                    styles.headerText,
                    isSelected && styles.selectedHeaderText,
                    { opacity: isSelected ? textOpacity : 1 },
                  ]}
                >
                  {section.title}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={[
            styles.underline,
            {
              left: underlinePosition,
              width: underlineWidth,
            },
          ]}
        />
      </View>

      {/* Only SectionList has background image */}
      <ImageBackground
        source={require('../assets/workout.jpg')} // Đường dẫn tới hình nền
        style={styles.backgroundImage}
      >
        {selectedCategory && (
          <SectionList
            sections={filteredSections}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
          />
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
    position: 'relative',
  },
  headerButton: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 15,
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedHeaderText: {
    color: 'green',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: 'green',
  },
  backgroundImage: {
    flex: 1,
      resizeMode: 'cover', // Đảm bảo hình nền bao phủ toàn bộ danh sách
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Nền có độ trong suốt
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',    
  },
  itemText: {
    fontSize: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.6)', // Đỏ trong suốt
  },
  deselectedButton: {
    backgroundColor: 'rgba(0, 128, 0, 0.6)', // Xanh trong suốt
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FruitsVegetablesList;
