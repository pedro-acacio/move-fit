import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { observarFotoDoUsuario } from "../../services/fotoPerfilService";
import styles from "./FotoPerfil.styles";






export function FotoPerfil({ foto, usuarioId, tamanho = 48, onPress, desativado }) {
  const [fotoBuscada, setFotoBuscada] = useState(null);

  useEffect(() => {
    if (!usuarioId) return;
    return observarFotoDoUsuario(usuarioId, setFotoBuscada);
  }, [usuarioId]);

  const imagem = foto ?? fotoBuscada;
  const circulo = { width: tamanho, height: tamanho, borderRadius: tamanho / 2 };


  const Moldura = onPress ? Pressable : View;

  return (
    <Moldura style={[styles.foto, circulo]} onPress={onPress} disabled={desativado}>
      {imagem ? (
        <Image source={{ uri: imagem }} style={circulo} />
      ) : (
        <Text style={{ fontSize: tamanho * 0.42 }}>👤</Text>
      )}
    </Moldura>
  );
}
