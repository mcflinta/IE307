import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import HTMLView from 'react-native-htmlview';

const BioArtistScreen = ({ route }) => {
  console.log("BIoArtistScreen", route.params);
  const artist = {
    name: 'Aimer',
    monthlyListeners: '3,319,406',
    description:
      `<p>15歳の頃、歌唱による喉の酷使が原因で突如声が出なくなるアクシデントに見舞われるも、数年後には独特のハスキーで甘い歌声を得ることとなる。2011年にシングル「六等星の夜」でメジャーデビュー。\n代表曲「蝶々結び」などを収録した4thアルバム「daydream」を2016年9月にリリースし、iTunesアルバムチャート1位などを獲得した他、CDショップ大賞2017において準大賞も受賞。2019年には16枚目のシングル「I beg you  / 花びらたちのマーチ / Sailing」をリリースし、自身初のオリコン週間シングルランキング初登場1位を記録する。\n\nAt the age of 15, Aimer suddenly lost her voice due to overuse of her throat by singing, but a few years later she got a unique husky and sweet singing voice. In 2011, she made her major debut with single &#34;<a href="spotify:track:57hbqDXNpE9rMmYd2U9dUB" data-name="六等星の夜">六等星の夜</a> (Rokutosei no yoru)&#34;.\nIn September 2016, she released her 4th album &#34;<a href="spotify:album:0gTeVkaC6wyVZEXNQUA4gF" data-name="daydream">daydream</a>&#34; which includes her representative song &#34;Chouchou Musubi&#34;, and placed #1 on the iTunes album chart. In 2019, she released her 16th single &#34;<a href="spotify:album:2YLBHyegPO32zvOWFJzkLN" data-name="I beg you / 花びらたちのマーチ / Sailing">I beg you / 花びらたちのマーチ / Sailing</a>&#34; which ranked #1 in the weekly single Oricon chart for the first time in her career.  Her song ‘Zankyosanka’ for the worldwide popular anime “Demon Slayer: Kimetsu no Yaiba” as its season 2 opening theme became a global hit soon after release in 2021. She is coming out with mini album titled “Deep down” to celebrate her 10th anniversary since debut, and the album will include CHAINSAW MAN ending theme ‘Deep down’.</p>`,
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb23241889efb57a4ce8338932',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentScroll}>
      {/* Artist Image */}
      <Image source={{ uri: artist.imageUrl }} style={styles.artistImage} />

      {/* Monthly Listeners */}
      <Text style={styles.listenersCount}>{artist.monthlyListeners}</Text>
      <Text style={styles.listenersText}>MONTHLY LISTENERS</Text>

      {/* Description */}
      <HTMLView
        value={artist.description}
        stylesheet={htmlStyles}
        addLineBreaks={false} // Giữ nguyên format HTML mà không tự động thêm xuống dòng
      />
      <View styles={styles.containerPost}>
        <Image source={{uri:"https://i.scdn.co/image/ab6761610000e5eb23241889efb57a4ce8338932"}}/>
      </View>
      
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  artistImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  listenersCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  listenersText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  contentScroll: {
    paddingBottom: 50,
  },
});

const htmlStyles = StyleSheet.create({
  a: {
    color: '#1DB954', // Màu xanh lá đặc trưng của Spotify
  },
  p: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
});

export default BioArtistScreen;
