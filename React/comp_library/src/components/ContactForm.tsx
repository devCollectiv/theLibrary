import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsPerson } from "react-icons/bs/index.js";
import { MdOutlineEmail } from "react-icons/md/index.js";

export default function ContactForm() {
  return (
    <VStack>
      <Heading >Contact Us</Heading>
    <form
      name="contact_form"
      method="POST"
      data-netlify="true"
      data-netlify-recaptcha="true"
      // action="/pages/success/" //netlify not allowing me to redirect properly; need further investigaion
      // @ts-expect-error: 'netlify' prop is not on 'form' but required for netlify form-detection
      netlify={"true"}
    >
      <FormControl id="subject" isRequired>
        <Input
          type="hidden"
          name="subject"
          value="New lead from TenKSolutions.com"
        />
      </FormControl>
      <Input type="hidden" name="form-name" value="contact_form" />
      {/**
       * Hi, My name is *Name*, working at *company* as the *title*; We would like to *issues*. Contact me at *email/phone* 
       */}
      <VStack spacing={5} color="black">
        <FormControl id="name" isRequired>
          <FormLabel>Your Name</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              children={<BsPerson color="gray.800" />}
            />
            <Input type="text" size="md" name="name" autoComplete="name" />
          </InputGroup>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>E-Mail</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              children={<MdOutlineEmail color="gray.800" />}
            />
            <Input type="email" size="md" name="email" autoComplete="email" />
          </InputGroup>
          {/* <FormHelperText>
                  We'll never share your email.
                </FormHelperText> */}
        </FormControl>
        <FormControl id="message" isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            borderColor="gray.300"
            _hover={{
              borderRadius: "gray.300",
            }}
            placeholder="I'd like to ..."
            name="message"
            autoComplete="off"
          />
        </FormControl>
        <Box data-netlify-recaptcha="true" />
        <FormControl id="submit" float="right">
          <Button
            w="100%"
            variant="solid"
            bg="#0D74FF"
            color="white"
            _hover={{}}
            type="submit"
            title="Contact TenK Solutions"
          >
            Send Message
          </Button>
        </FormControl>
      </VStack>
    </form>
    </VStack>
  );
}
