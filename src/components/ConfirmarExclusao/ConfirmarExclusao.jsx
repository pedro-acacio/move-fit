import { Modal, Text, View } from "react-native";
import { Botao } from "../Botao/Botao";
import styles from "./ConfirmarExclusao.styles";



export function ConfirmarExclusao({visivel, titulo, aoConfirmar,aoCancelar}){
    return(
        <Modal visible = {visivel} transparent animationType="fade" onRequestClose={aoCancelar}>
            <View style = {styles.fundo}>
                <View style = {styles.caixa}>
                    <Text style = {styles.titulo}>{titulo}</Text>
                    <Text style = {styles.mensagem}>Esta ação não pode ser desfeita.</Text>

                    <View style = {styles.botoes}>
                        <Botao texto = "Excluir" perigo onPress={aoConfirmar}></Botao>
                        <Botao texto = "Cancelar" secundario onPress={aoCancelar}></Botao>
                    </View>
                </View>
            </View>
        </Modal>
    );
}