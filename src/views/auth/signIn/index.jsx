import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function Auth() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  
  // States
  const [show, setShow] = React.useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Handlers
  const handleClick = () => setShow(!show);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box mb="30px" w="100%">
          <Text 
            color={textColor} 
            fontSize="36px" 
            fontWeight="bold" 
            mb="10px"
          >
            {tabIndex === 0 ? "Sign In" : "Sign Up"}
          </Text>
          <Text
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            {tabIndex === 0 
              ? "Enter your email and password to sign in!" 
              : "Create an account to get started!"}
          </Text>
        </Box>

        <Tabs 
          variant="soft-rounded" 
          colorScheme="brand" 
          width="100%" 
          index={tabIndex} 
          onChange={handleTabsChange}
          isLazy
        >
          <TabList mb="24px" width="100%">
            <Tab width="50%">Sign In</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            {/* Sign In Panel */}
            <TabPanel p={0}>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="mail@simmmple.com"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox
                      id="remember-login"
                      colorScheme="brandScheme"
                      me="10px"
                    />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <Text
                    color={textColorBrand}
                    fontSize="sm"
                    w="124px"
                    fontWeight="500"
                    cursor="pointer"
                  >
                    Forgot password?
                  </Text>
                </Flex>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Sign In
                </Button>
                <HSeparator text="OR" />
              </FormControl>

              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "420px" }}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx={{ base: "auto", lg: "unset" }}
                me="auto"
                mb={{ base: "20px", md: "auto" }}
                mt="24px"
              >
                <Button
                  fontSize="sm"
                  me="0px"
                  mb="26px"
                  py="15px"
                  h="50px"
                  borderRadius="16px"
                  bg={googleBg}
                  color={googleText}
                  fontWeight="500"
                  _hover={googleHover}
                  _active={googleActive}
                  _focus={googleActive}
                >
                  <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                  Sign in with Google
                </Button>
              </Flex>
            </TabPanel>

            {/* Sign Up Panel */}
            <TabPanel p={0}>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Full Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="John Doe"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                />
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="mail@simmmple.com"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Confirm Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Confirm your password"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox
                      id="terms-and-conditions"
                      colorScheme="brandScheme"
                      me="10px"
                    />
                    <FormLabel
                      htmlFor="terms-and-conditions"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                      I agree to the{" "}
                      <Text
                        as="span"
                        color={textColorBrand}
                        cursor="pointer"
                        fontWeight="500"
                        onClick={onOpen}
                      >
                        terms and conditions
                      </Text>
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Sign Up
                </Button>
                <HSeparator text="OR" />
              </FormControl>

              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "420px" }}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx={{ base: "auto", lg: "unset" }}
                me="auto"
                mb={{ base: "20px", md: "auto" }}
                mt="24px"
              >
                <Button
                  fontSize="sm"
                  me="0px"
                  mb="26px"
                  py="15px"
                  h="50px"
                  borderRadius="16px"
                  bg={googleBg}
                  color={googleText}
                  fontWeight="500"
                  _hover={googleHover}
                  _active={googleActive}
                  _focus={googleActive}
                >
                  <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                  Sign up with Google
                </Button>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Terms and Conditions Modal */}
        <Modal 
          isOpen={isOpen} 
          onClose={onClose} 
          size="lg" 
          motionPreset="slideInBottom"
          isCentered
        >
          <ModalOverlay 
            bg="blackAlpha.300"
            backdropFilter="blur(10px)"
          />
          <ModalContent>
            <ModalHeader color={textColor}>Terms and Conditions</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text color={textColorDetails} mb="4">
                By creating an account on our platform, you agree to the following terms and conditions:
              </Text>
              
              <Text fontWeight="bold" color={textColor} mt="4">1. Account Registration</Text>
              <Text color={textColorDetails} mb="2">
                You must provide accurate and complete information when creating your account.
                You are responsible for maintaining the security of your account credentials.
              </Text>
              
              <Text fontWeight="bold" color={textColor} mt="4">2. Privacy Policy</Text>
              <Text color={textColorDetails} mb="2">
                Your use of our service is also governed by our Privacy Policy, which details how we 
                collect, use, and protect your personal information.
              </Text>
              
              <Text fontWeight="bold" color={textColor} mt="4">3. User Conduct</Text>
              <Text color={textColorDetails} mb="2">
                You agree not to use our service for any unlawful purpose or in any way that could 
                damage, disable, or impair the service.
              </Text>
              
              <Text fontWeight="bold" color={textColor} mt="4">4. Termination</Text>
              <Text color={textColorDetails} mb="2">
                We reserve the right to suspend or terminate your account if you violate these terms.
              </Text>
              
              <Text fontWeight="bold" color={textColor} mt="4">5. Changes to Terms</Text>
              <Text color={textColorDetails} mb="2">
                We may modify these terms at any time. Continued use of the service after changes 
                constitutes acceptance of the modified terms.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="brand" 
                mr={3} 
                onClick={onClose}
              >
                I Agree
              </Button>
              <Button variant="ghost" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </DefaultAuth>
  );
}

export default Auth;