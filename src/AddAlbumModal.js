import {
    Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView, } from "react-native-safe-area-context";

export default ({ modalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackdrop, }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Pressable onPress={onPressBackdrop} style={{ flex: 1, width: "100%", }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <SafeAreaProvider>
            <SafeAreaView
              style={{ flex: 1, justifyContent: "flex-end" }}
              edges={["bottom"]}
            >
              <TextInput
                style={{ width: "100%", padding:10, borderWidth: 0.5, borderColor: 'lightgrey' }}
                placeholder="앨범명을 입력해 주세요."
                value={albumTitle}
                onChangeText={setAlbumTitle}
                onSubmitEditing={onSubmitEditing}
                autoFocus={true}
              ></TextInput>
            </SafeAreaView>
          </SafeAreaProvider>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};
