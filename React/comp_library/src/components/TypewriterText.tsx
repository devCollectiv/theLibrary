import { Box, Text, keyframes } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export interface TypewriterTextProps {
  /**
   * Text to be typed out
   */
  text: string;
  /**
   * Array of texts to cycle through
   */
  textArray?: string[];
  /**
   * Typing speed in milliseconds per character
   */
  typingSpeed?: number;
  /**
   * Delay before deleting text in milliseconds
   */
  deleteDelay?: number;
  /**
   * Delay before typing the next text in milliseconds
   */
  nextTextDelay?: number;
  /**
   * Whether to loop through the text array
   */
  loop?: boolean;
  /**
   * Font size of the text
   */
  fontSize?: string;
  /**
   * Font weight of the text
   */
  fontWeight?: string;
  /**
   * Color of the text
   */
  color?: string;
  /**
   * Color of the cursor
   */
  cursorColor?: string;
  /**
   * Whether to show the cursor
   */
  showCursor?: boolean;
  /**
   * Custom cursor character
   */
  cursorChar?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text = '',
  textArray = [],
  typingSpeed = 100,
  deleteDelay = 1500,
  nextTextDelay = 500,
  loop = true,
  fontSize = '2xl',
  fontWeight = 'bold',
  color = 'black',
  cursorColor = 'black',
  showCursor = true,
  cursorChar = '|',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Use the single text or the array
  const textsToType = textArray.length > 0 ? textArray : [text];

  // Blinking cursor animation
  const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  `;

  useEffect(() => {
    if (isPaused) return;

    const currentText = textsToType[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentText.substring(0, displayText.length + 1));
        
        // If we've typed the full text
        if (displayText.length === currentText.length) {
          // Only delete if we have more than one text or loop is enabled
          if (textsToType.length > 1 || loop) {
            setIsPaused(true);
            setTimeout(() => {
              setIsDeleting(true);
              setIsPaused(false);
            }, deleteDelay);
          }
        }
      } else {
        // Deleting
        setDisplayText(currentText.substring(0, displayText.length - 1));
        
        // If we've deleted all text
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => {
            // Move to next text or back to first if looping
            if (prevIndex === textsToType.length - 1) {
              return loop ? 0 : prevIndex;
            }
            return prevIndex + 1;
          });
          
          // Pause before typing next text
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
          }, nextTextDelay);
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed); // Delete faster than type

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isPaused, textsToType, typingSpeed, deleteDelay, nextTextDelay, loop]);

  return (
    <Box display="inline-flex" alignItems="center">
      <Text fontSize={fontSize} fontWeight={fontWeight} color={color}>
        {displayText}
        {showCursor && (
          <Box
            as="span"
            color={cursorColor}
            animation={`${blink} 1s infinite`}
            display="inline-block"
            ml="1px"
          >
            {cursorChar}
          </Box>
        )}
      </Text>
    </Box>
  );
};

export default TypewriterText;
