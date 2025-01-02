import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useGallery } from "./src/use-gallery";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import DropDownPicker from "./src/DropDownPicker";
import AddAlbumModal from "./src/AddAlbumModal";
import ImageViewModal from "./src/ImageViewModal";
import ImageList from "./src/imageList";

export default function App() {
  const {
    imagesWithLastAreaOpenGallery,
    setImages,
    openGallery,
    deleteGallery,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    isDropdownOpen,
    openAlbumDropDown,
    closeAlbumDropDown,
    albums,
    setSelectedAlbum,
    removeAlbum,
    imageModalVisible,
    openImageViewModal,
    closeImageViewModal,
    selectedImage,
    setSelectedImage,
    moveToPreviousImage,
    moveToNextImage,
    isShowPreviousArrow,
    isShowNextArrow,
  } = useGallery();

  function onLongPress(item) {
    deleteGallery(item.id);
  }

  function onPressImage(item){
    openImageViewModal();
    console.log('item', item);
    setSelectedImage(item)
  }

  function onPressAddAlbum() {
    openModal();
  }

  function onSubmitEditing() {
    if (!albumTitle) {
      Alert.alert("앨범명을 입력해 주세요.", "");
      return;
    }
    addAlbum();
    closeModal();
    setAlbumTitle("");
  }

  function onPressBackdrop() {
    closeModal();
  }

  function onPressImageBackdrop() {
    closeImageViewModal();
  }

  function onPressHeader(){
    if(!isDropdownOpen){
      openAlbumDropDown();
    }else{
      closeAlbumDropDown();
    }
  }

  function onPressAlbum(album){
    setSelectedAlbum(album);
    closeAlbumDropDown();
  }

  function onLongPressAlbum(album){
    removeAlbum(album);
  }

  function onPressLeftArrow(){
    moveToPreviousImage();
  }

  function onPressRightArrow(){
    moveToNextImage();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* 앰범 타이틀 드롭다운 Area */}
        <DropDownPicker
          selectedAlbum={selectedAlbum}
          onPressAddAlbum={onPressAddAlbum}
          isDropdownOpen={isDropdownOpen}
          onPressHeader={onPressHeader}
          albums={albums}
          onPressAlbum={onPressAlbum}
          onLongPressAlbum={onLongPressAlbum}
        />

        {/* 앨범추가 모달창 */}
        <AddAlbumModal
          modalVisible={modalVisible}
          albumTitle={albumTitle}
          setAlbumTitle={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
          onPressBackdrop={onPressBackdrop}
        />

        {/* 이미지 뷰어 모달창 */}
        <ImageViewModal 
          imageModalVisible={imageModalVisible}
          onPressBackdrop={onPressImageBackdrop}
          selectedImage={selectedImage}
          onPressLeftArrow={onPressLeftArrow}
          onPressRightArrow={onPressRightArrow}
          isShowPreviousArrow={isShowPreviousArrow}
          isShowNextArrow={isShowNextArrow}
        />

        {/* 이미지 리스트 및 이미지 추가 Area */}
        <ImageList 
          imagesWithLastAreaOpenGallery={imagesWithLastAreaOpenGallery}
          openGallery={openGallery}
          onLongPress={onLongPress}
          onPressImage={onPressImage}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
