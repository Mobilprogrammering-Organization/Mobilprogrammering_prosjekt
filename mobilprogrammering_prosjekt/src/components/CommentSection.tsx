import { Text, TextInput } from "react-native";
import { styles } from "@/styles/styles";
import { useState } from "react";

export default function CommentSection() {
  const [comment, setComment] = useState("");

  return (
    <TextInput
      style={styles.commentSection}
      value={comment}
      onChangeText={(text) => setComment(text)}
      placeholder="Write a comment..."
    />
  );
}