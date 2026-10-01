import { ARTICLES } from "@/data/articles";
import { ArticleCard } from "../components/ArticleCard";
import { StyleSheet, ScrollView } from "react-native";

export function Articles() {
  return (
    <ScrollView style={styles.articles}>
      {ARTICLES.map((article) => <ArticleCard key={article.id} article={article} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  articles: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }
})