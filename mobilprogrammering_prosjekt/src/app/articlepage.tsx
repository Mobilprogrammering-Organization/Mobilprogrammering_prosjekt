import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ARTICLES } from "@/data/articles";
import { styles } from "@/styles/styles";

export default function ArticlePage() {
  const { id } = useLocalSearchParams();
  const selectedArticle = ARTICLES.find(article => article.id === id);

  const { title, content, articleImageURL } = selectedArticle || {};

  return (
    selectedArticle ? (
      <View style={styles.container}>
        <Text style={styles.mainText}>{title}</Text>
        <Image style={{ width: 600, height: 300 }} source={{uri: articleImageURL}}></Image>
        <Text style={styles.mainText}>{content}</Text>
      </View>
    ) : (
      <Text style={styles.mainText}>The article could not be found.</Text>
    )
  );
}