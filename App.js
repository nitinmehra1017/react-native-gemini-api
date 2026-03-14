import { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

export default function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          " https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd1fa2c951f46b0aead7c8c146ef457"
        );
        const data = await res.json();
        setNews(data.articles || []);
      } catch (error) {
        console.log("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {news.map((item, index) => (
        <View key={index} style={styles.card}>
          {item.urlToImage && (
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
          )}

          <Text style={styles.title}>{item.title}</Text>

          {!!item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#444",
  },
});