import { View } from 'react-native';

interface CircleProps {
    width: number;
    height: number;
    fillColor: string;
    borderRadius: number;
    backgroundColor: string;
    topValue?: number;
    leftValue?: number;
    rightValue?: number;
    bottomValue?: number;
}

export default function CircleShape({
    width,
    height,
    fillColor,
    borderRadius,
    backgroundColor,
    topValue,
    leftValue,
    rightValue,
    bottomValue,
}: CircleProps) {

    return (
        <View style={{
            width: width,
            height: height,
            backgroundColor: fillColor,
            borderRadius: borderRadius,
            position: 'absolute',
            ...(topValue !== undefined && { top: topValue }),
            ...(leftValue !== undefined && { left: leftValue }),
            ...(rightValue !== undefined && { right: rightValue }),
            ...(bottomValue !== undefined && { bottom: bottomValue }),
        }}>
        </View>
    );
}