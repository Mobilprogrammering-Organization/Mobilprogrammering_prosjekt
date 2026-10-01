import { Article as ArticleType } from "@/types/article";
import { View, Image, Text } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";

export function ArticleCard({ article }: { article: ArticleType }) {
  const { title, articleImageURL } = article;

  return (
    <View>
      <Link href={{pathname: `/articlepage`, params: { id: article.id }}}><Image style={{ width: 600, height: 300 }} source={{uri: articleImageURL}}></Image></Link>
      <Link href={{pathname: `/articlepage`, params: { id: article.id }}}><Text style={styles.mainText}>{title}</Text></Link>
    </View>
  );
}
