import { Text, TouchableOpacity, View } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const headerHeight = 50;

export default ({
  selectedAlbum,
  onPressAddAlbum,
  isDropdownOpen,
  onPressHeader,
  albums,
  onPressAlbum,
  onLongPressAlbum,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? "arrow-up" : "arrow-down"}
          size={15}
          color="black"
          style={{ marginLeft: 8 }}
        />

        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: "absolute",
            right: 0,
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontSize: 13 }}>앨범추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View
          style={{
            position: "absolute",
            top: headerHeight,
            width: "100%",
            borderTopColor: "lightgrey",
            borderTopWidth: 0.5,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5,
            backgroundColor: "white",
          }}
        >
          {albums.map((album, idx) => {
            const isSelectedAlbum = album.albumId === selectedAlbum.albumId;
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onPressAlbum(album)}
                onLongPress={() => onLongPressAlbum(album)}
                key={`album-${idx}`}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{ fontWeight: isSelectedAlbum ? "bold" : undefined }}
                >
                  {album.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
