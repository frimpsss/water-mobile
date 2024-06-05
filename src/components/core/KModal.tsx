import { colors } from "@/constants";
import { Modal, ModalProps, StyleSheet, View } from "react-native";

type Props = ModalProps & {
  isOpen: boolean;
};
const KModal = ({ isOpen, children, ...rest }: Props) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default KModal;
