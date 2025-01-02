import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const defaultAlbum = {
  albumId: 1,
  title: "기본",
};

const ALBUM_STORAGE_KEY = 'ALBUM_STORAGE_KEY';
const IMAGE_STORAGE_KEY = 'IMAGE_STORAGE_KEY';

export function useGallery() {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [modalVisible, setModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function _setImages(newImages){
    setImages(newImages);
    AsyncStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(newImages));
  }
  
  function _setAlbums(newAlbums){
    setAlbums(newAlbums);
    AsyncStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(newAlbums));
  }

  async function openGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        imginfo: result.assets[0],
        albumId: selectedAlbum.albumId,
      };
      const newImageList = [...images, newImage];
      _setImages(newImageList);
    }
  }

  function deleteGallery(id) {
    Alert.alert("해당 이미지를 삭제 하시겠어요?", "", [
      {
        style: "cancel",
        text: "아니오",
      },
      {
        text: "예",
        onPress: () => {
          const newImageList = images.filter((item) => item.id !== id);
          _setImages(newImageList);
        },
      },
    ]);
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function openAlbumDropDown() {
    setIsDropdownOpen(true);
  }

  function closeAlbumDropDown() {
    setIsDropdownOpen(false);
  }

  function openImageViewModal() {
    setImageModalVisible(true);
  }

  function closeImageViewModal() {
    setImageModalVisible(false);
  }

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.albumId
  );

  function moveToPreviousImage() {
    const selectedImageIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
    const previousImageIndex = selectedImageIndex - 1;
    if(previousImageIndex < 0){
      return;
    }else{
      setSelectedImage(filteredImages[previousImageIndex]);
    }
  }

  function moveToNextImage() {
    const selectedImageIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
    const nextImageIndex = selectedImageIndex + 1;
    if(nextImageIndex > filteredImages.length -1 || nextImageIndex === -1){
      return;
    }else{
      setSelectedImage(filteredImages[nextImageIndex]);
    }
  }

  function addAlbum() {
    const lastAlbumId =
      albums.length === 0 ? 0 : albums[albums.length - 1].albumId;
    const newAlbum = {
      albumId: lastAlbumId + 1,
      title: albumTitle,
    };
    const newAlbumList = [...albums, newAlbum];
    _setAlbums(newAlbumList);
    setSelectedAlbum(newAlbum);
  }

  function removeAlbum(album) {
    if (album.albumId === defaultAlbum.albumId) {
      Alert.alert("기본 앨범은 삭제할 수 없습니다.");
      return;
    }
    Alert.alert(`앨범 '${album.title}'을 삭제 하시겠습니까?`, "", [
      {
        style: "cancel",
        text: "아니오",
      },
      {
        text: "예",
        onPress: () => {
          const newAlbumList = albums.filter(
            (item) => item.albumId !== album.albumId
          );
          _setAlbums(newAlbumList);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  }

  const isShowPreviousArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== 0;
  const isShowNextArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== filteredImages.length - 1;

  
  const imagesWithLastAreaOpenGallery = [
    ...filteredImages,
    {
      id: "last",
    },
  ];
  
  useEffect(() => {
    initAlbumAndImage();
  },[]);

  async function initAlbumAndImage(){
    const albumList = await AsyncStorage.getItem(ALBUM_STORAGE_KEY);
    if(albumList){
      /// 딜레이생김 // 인디케이터 처리 필요
      setAlbums(JSON.parse(albumList));
    }
    const imageList = await AsyncStorage.getItem(IMAGE_STORAGE_KEY);
    if(imageList){
      /// 딜레이생김 // 인디케이터 처리 필요
      setImages(JSON.parse(imageList));
    }
  }

  return {
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
  };
}
