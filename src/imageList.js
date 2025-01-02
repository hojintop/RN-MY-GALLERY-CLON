import { Dimensions, FlatList, Image, Text, TouchableOpacity } from "react-native";

const width = Dimensions.get("screen").width;
const minColumnSize = width >= 500 ? 200 : 131;
const divisor = width / minColumnSize;
const numCloumns = Math.floor(divisor);
const columnSize = width / numCloumns;

export default ({ imagesWithLastAreaOpenGallery, openGallery, onLongPress, onPressImage }) => {

  function renderItem({ item }) {
    if (item.id === "last") {
      return (
        <TouchableOpacity
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={openGallery}
        >
          <Text style={{ fontWeight: "100", fontSize: 50 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => onPressImage(item)}
        onLongPress={() => onLongPress(item)}
      >
        <Image
          source={{ uri: item.imginfo.uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={imagesWithLastAreaOpenGallery}
      renderItem={renderItem}
      numColumns={numCloumns}
      style={{ zIndex: -1 }}
      onLayout={e => {
        // console.log('layout.width', e.nativeEvent.layout.width);
      }}
    />
  );
};
