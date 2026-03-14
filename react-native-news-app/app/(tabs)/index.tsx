import { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

type Article = {
  title: string;
  description?: string | null;
  urlToImage?: string | null;
};

export default function HomeScreen() {

  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {

      const res = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=bcd1fa2c951f46b0aead7c8c146ef457"
      );

      const data = await res.json();

      setNews((data.articles as Article[]) || []);
    };

    fetchNews();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {news.map((item: Article, index: number) => (
        <View key={index} style={styles.card}>

          {item.urlToImage && (
            <Image source={{ uri: item.urlToImage }} style={styles.image}/>
          )}

          <Text style={styles.title}>{item.title}</Text>

          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}

        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop:50,
    padding:10
  },
  card:{
    backgroundColor:"#fff",
    padding:15,
    marginBottom:15,
    borderRadius:10
  },
  image:{
    width:"100%",
    height:200
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:10
  },
  description:{
    marginTop:5
  }
});