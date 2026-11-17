import { Pressable, Text, View } from "react-native";
import { useCorDaArea } from "../../context/CorDaArea";
import { colors } from "../../styles/theme";
import styles from "./CartaoComAcoes.styles";






export function CartaoComAcoes({titulo, descricao, aoEditar, aoDuplicar, aoExcluir}) {
    const cor = useCorDaArea();

    return(
        <View style = {styles.cartao}>
            <Text style = {styles.titulo}>{titulo}</Text>
            <Text style = {styles.descricao} numberOfLines={1}>
                {descricao}
            </Text>

            <View style = {styles.acoes}>
                <Pressable style = {[styles.acao, { borderColor: cor }]} onPress={aoEditar}>
                    <Text style ={[styles.acaoTexto, { color: cor }]}>Editar</Text>
                </Pressable>
                {aoDuplicar && (
                    <Pressable style = {[styles.acao, { borderColor: cor }]} onPress={aoDuplicar}>
                        <Text style ={[styles.acaoTexto, { color: cor }]}>Duplicar</Text>
                    </Pressable>
                )}
                <Pressable style = {[styles.acao, { borderColor: colors.perigo }]} onPress={aoExcluir}>
                    <Text style = {[styles.acaoTexto, { color: colors.perigo }]}>Excluir</Text>
                </Pressable>
            </View>
        </View>
    );
}
    
