import { Image, Pressable, Text } from "react-native";
import styles from "./FotoPerfil.styles";

// Foto redonda do usuário. Sem foto, mostra o bonequinho 👤.
// "tamanho" é o diâmetro do círculo (ex.: 48 na Home, 96 no Perfil).
export function FotoPerfil({ foto, tamanho = 48, onPress, desativado }) {
  const circulo = { width: tamanho, height: tamanho, borderRadius: tamanho / 2 };

  return (
    <Pressable style={[styles.foto, circulo]} onPress={onPress} disabled={!onPress || desativado}>
      {foto ? (
        <Image source={{ uri: foto }} style={circulo} />
      ) : (
        <Text style={{ fontSize: tamanho * 0.42 }}>👤</Text>
      )}
    </Pressable>
  );
}
