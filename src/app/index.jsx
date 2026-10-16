import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MoveFit</Text>
      <Text style={styles.subtitle}>Bem-vindo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
