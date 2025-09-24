import { View } from "react-native";

interface Circle {
  width: number;
  height: number;
  borderRadius: number;
  fillColor?: string;
  className?:string;
  topValue?: number;
  rightValue?: number;
  bottomValue?: number;
  leftValue?: number;
}

export default function CircleShape(c: Circle) {
  return (
    <View
      className={`${c.className ?? ""}`}
      style={{
        width: c.width,
        height: c.height,
        borderRadius: c.borderRadius,
        position: "absolute",
        ...(c.fillColor !== undefined && { backgroundColor: c.fillColor }),
        ...(c.topValue !== undefined && { top: c.topValue }),
        ...(c.rightValue !== undefined && { right: c.rightValue }),
        ...(c.bottomValue !== undefined && { bottom: c.bottomValue }),
        ...(c.leftValue !== undefined && { left: c.leftValue }),
        zIndex: 0,
      }}
    ></View>
  );
}
