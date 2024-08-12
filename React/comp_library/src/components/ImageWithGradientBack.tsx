import { Box, Image, keyframes } from "@chakra-ui/react";
import React from "react";

export interface ImageWithGradientBackerProps {
  imageUrl: string;
  gradientColor1: string;
  gradientColor2: string;
  cornerRadius: number;
  imageHeight: number;
  aspectRatio: number;
  rotateAngle: number;
}

const ImageWithGradientBacker: React.FC<ImageWithGradientBackerProps> = ({
  imageUrl,
  gradientColor1,
  gradientColor2,
  cornerRadius,
  imageHeight,
  aspectRatio,
  rotateAngle,
}) => {
  const wobble = keyframes`
    0% { transform: rotate(${rotateAngle - 2}deg); }
    50% { transform: rotate(${rotateAngle + 2}deg); }
    100% { transform: rotate(${rotateAngle - 2}deg); }
  `;

  return (
    <Box position="relative" display="inline-block" p={4}>
      <Box
        position="absolute"
        zIndex={0}
        h={imageHeight}
        aspectRatio={aspectRatio}
        bgGradient={`linear(135deg, ${gradientColor1}, ${gradientColor2})`}
        borderRadius={`${cornerRadius}px`}
        transform={`rotate(${rotateAngle}deg)`}
        animation={`${wobble} 6s ease-in-out infinite`}
      />
      <Image
        src={imageUrl}
        alt="Rounded with gradient background"
        h={imageHeight}
        aspectRatio={aspectRatio}
        position="relative"
        zIndex={1}
        objectFit={'cover'}
        borderRadius={`${cornerRadius}px`}
      />
    </Box>
  );
};

export default ImageWithGradientBacker;