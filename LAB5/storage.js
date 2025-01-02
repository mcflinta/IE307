
import AsyncStorage from '@react-native-async-storage/async-storage';
// 21521901 - Mai Quốc Cường
const STORAGE_KEY = 'MY_PLACES_LIST';

export async function fetchPlaces() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data != null ? JSON.parse(data) : [];
  } catch (err) {
    console.log('fetchPlaces error:', err);
    return [];
  }
}

export async function fetchPlaceById(id) {
  try {
    const places = await fetchPlaces();
    const found = places.find(p => p.id === id);
    return found || null;
  } catch (err) {
    console.log('fetchPlaceById error:', err);
    return null;
  }
}

export async function insertPlace(placeObj) {
  try {
    const places = await fetchPlaces();
    const newId = places.length > 0 ? Math.max(...places.map(p => p.id)) + 1 : 1;
    const newPlace = { id: newId, ...placeObj };
    const updated = [...places, newPlace];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newPlace;
  } catch (err) {
    console.log('insertPlace error:', err);
    throw err;
  }
}
