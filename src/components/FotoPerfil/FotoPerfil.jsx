import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { observarFotoDoUsuario } from "../../services/fotoPerfilService";
import styles from "./FotoPerfil.styles";

// Foto redonda do usuário. Sem foto, mostra o bonequinho 👤.
// "tamanho" é o diâmetro do círculo (ex.: 48 na Home, 96 no Perfil).
// Duas formas de usar:
//   foto={usuario.foto}  -> a foto de quem está logado, que a tela já tem;
//   usuarioId={id}       -> a foto de outra pessoa, buscada no Firestore pelo id dela.
export function FotoPerfil({ foto, usuarioId, tamanho = 48, onPress, desativado }) {
  const [fotoBuscada, setFotoBuscada] = useState(null);

  useEffect(() => {
    if (!usuarioId) return;
    return observarFotoDoUsuario(usuarioId, setFotoBuscada);
  }, [usuarioId]);

  const imagem = foto ?? fotoBuscada;
  const circulo = { width: tamanho, height: tamanho, borderRadius: tamanho / 2 };

  // Sem onPress vira uma View comum, para não "roubar" o toque do cartão em volta.
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
