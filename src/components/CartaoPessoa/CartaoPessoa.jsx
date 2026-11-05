import { Pressable, Text, View } from "react-native";
import { SeloStatus } from "../SeloStatus/SeloStatus";
import styles from "./CartaoPessoa.styles";

// Cartão de uma pessoa: foto, nome, detalhe e, à direita, o selo de status ou a seta.
export function CartaoPessoa({ nome, detalhe, status, seta, onPress }) {
    return (
        <Pressable style={styles.cartao} onPress={onPress} disabled={!onPress}>
            <View style={styles.foto}>
                <Text style={styles.fotoTexto}>Foto</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.detalhe}>{detalhe}</Text>
            </View>

            {status && <SeloStatus status={status} />}
            {seta && <Text style={styles.seta}>›</Text>}
        </Pressable>
    );
}
