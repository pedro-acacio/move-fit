import { Pressable, Text, View } from "react-native";
import { FotoPerfil } from "../FotoPerfil/FotoPerfil";
import { SeloStatus } from "../SeloStatus/SeloStatus";
import { useCorDaArea } from "../../context/CorDaArea";
import styles from "./CartaoPessoa.styles";

// Cartão de uma pessoa: foto, nome, detalhe e, à direita, o selo de status ou a seta.
// "usuarioId" é o id da pessoa, usado para mostrar a foto de perfil dela.
export function CartaoPessoa({ usuarioId, nome, detalhe, status, textoStatus, seta, semBorda, onPress }) {
    const cor = useCorDaArea();

    return (
        <Pressable style={[styles.cartao, semBorda && styles.semBorda]} onPress={onPress} disabled={!onPress}>
            <View style={[styles.moldura, { borderColor: cor }]}>
                <FotoPerfil usuarioId={usuarioId} tamanho={42} />
            </View>

            <View style={styles.info}>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.detalhe}>{detalhe}</Text>
            </View>

            {status && <SeloStatus status={status} texto={textoStatus} />}
            {seta && <Text style={styles.seta}>›</Text>}
        </Pressable>
    );
}
