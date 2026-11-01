import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./Cabecalho.styles";

export function Cabecalho({ titulo, aoVoltar }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={aoVoltar ?? (() => router.back())} hitSlop={12}>
        <Text style={styles.seta}>‹</Text>
      </Pressable>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}
