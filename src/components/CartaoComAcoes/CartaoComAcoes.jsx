import { Pressable, Text, View } from "react-native";
import styles from "./CartaoComAcoes.styles";

// Cartão com título, descrição curta e os botões Editar e Excluir.
// Usado na lista de exercícios e pode ser usado na lista de treinos.


export function CartaoComAcoes({titulo, descricao, aoEditar, aoExcluir}) {
    return(
        <View style = {styles.cartao}>
            <Text style = {styles.titulo}>{titulo}</Text>
            <Text style = {styles.descricao} numberOfLines={1}>
                {descricao}
            </Text>

            <View style = {styles.acoes}>
                <Pressable style = {styles.acao} onPress={aoEditar}>
                    <Text style ={styles.acaoTexto}>Editar</Text>
                </Pressable>
                <Pressable style = {styles.acao} onPress={aoExcluir}>
                    <Text style = {styles.acaoTexto}>Excluir</Text>
                </Pressable>
            </View>
        </View>
    );
}
    
