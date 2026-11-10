import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import styles from "./DemonstracaoExercicio.styles";

export function DemonstracaoExercicio({ imagens = [], textoAlternativo, intervalo = 900 }) {
  const opacidades = useMemo(
    () => imagens.map((_, indice) => new Animated.Value(indice === 0 ? 1 : 0)),
    [imagens]
  );
  const quadroAtual = useRef(0);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    if (imagens.length < 2) return;

    const temporizador = setInterval(() => {
      const atual = quadroAtual.current;
      const proximo = (atual + 1) % imagens.length;

      Animated.parallel([
        Animated.timing(opacidades[atual], { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(opacidades[proximo], { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();

      quadroAtual.current = proximo;
    }, intervalo);

    return () => clearInterval(temporizador);
  }, [imagens, intervalo, opacidades]);

  if (imagens.length === 0 || falhou) {
    return (
      <View style={styles.indisponivel}>
        <Text style={styles.indisponivelTexto}>Demonstração indisponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {imagens.map((uri, indice) => (
        <Animated.Image
          key={uri}
          source={{ uri }}
          accessibilityLabel={textoAlternativo}
          resizeMode="contain"
          style={[styles.imagem, { opacity: opacidades[indice] }]}
          onError={() => setFalhou(true)}
        />
      ))}
    </View>
  );
}
