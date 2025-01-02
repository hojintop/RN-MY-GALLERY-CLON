import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

function ArrowButton({arrowName, onPress, }){
    return(
        <TouchableOpacity onPress={onPress} style={{justifyContent: 'center', paddingHorizontal: 20, height: '100%', }}>
            <SimpleLineIcons
                name={arrowName}
                size={20}
                color="black"
            />
        </TouchableOpacity>
    )
}

export default ({ imageModalVisible, onPressBackdrop, selectedImage, onPressLeftArrow, onPressRightArrow, isShowPreviousArrow, isShowNextArrow }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={imageModalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'rgba(155, 155, 155, 0.5)',
        }}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* < 화살표 */}
            <ArrowButton 
                arrowName='arrow-left'
                onPress={isShowPreviousArrow ? onPressLeftArrow : () =>{alert('이전 사진이 없습니다.')}}
            />

            {/* 이미지 */}
            <Pressable style={{flexDirection: 'row'}}>
                <Image
                source={{ uri: selectedImage?.imginfo.uri }}
                style={{ width: 290, height: 290, backgroundColor: 'white' }}
                resizeMode="contain"
                />
            </Pressable>

            {/* > 화살표 */}
            <ArrowButton 
                arrowName='arrow-right'
                onPress={isShowNextArrow ? onPressRightArrow : () => {alert('다음 사진이 없습니다.')}}
            />
        </View>
        
      </Pressable>
    </Modal>
  );
};
