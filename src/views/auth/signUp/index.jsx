import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  HStack,
  ScaleFade,
  keyframes,
  Fade,
  Slide,
  SlideFade,
  Spinner,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { motion } from "framer-motion";

function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();
  
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
  const inputBg = useColorModeValue("white", "navy.800");
  const validationBg = useColorModeValue("white", "navy.700");
  const validationShadow = useColorModeValue(
    "0px 5px 14px rgba(0, 0, 0, 0.05)",
    "0px 5px 14px rgba(0, 0, 0, 0.2)"
  );

  // States
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { isOpen: isTermsOpen, onOpen: onTermsOpen, onClose: onTermsClose } = useDisclosure();
  const { isOpen: isGoogleOpen, onOpen: onGoogleOpen, onClose: onGoogleClose } = useDisclosure();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formValidity, setFormValidity] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Focus states for animation
  const [focusedField, setFocusedField] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleClick = () => setShow(!show);

  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    onGoogleOpen();
    setIsGoogleLoading(true);
    
    // Simulate Google authentication process
    setTimeout(() => {
      setIsGoogleLoading(false);
    }, 2000);
  };

  // Function to complete Google sign-in
  const completeGoogleSignIn = () => {
    onGoogleClose();
    // Show success toast
    toast({
      title: "Google Sign-in Successful",
      description: "Redirecting to dashboard...",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      navigate('/admin/default');
    }, 1000);
  };

  // Function to handle agreement
  const handleAgree = () => {
    setIsChecked(true);
    onTermsClose();
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field
    validateField(name, value);
  };

  // Function to simulate form submission
  const handleSubmit = () => {
    setFormSubmitted(true);
    
    // Show success toast
    toast({
      title: "Account created successfully!",
      description: "Redirecting to dashboard...",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    
    // Redirect to dashboard after 1 second
    setTimeout(() => {
      navigate('/admin/default');
    }, 1000);
  };

  // Function to validate fields
  const validateField = (name, value) => {
    let isValid = false;

    switch (name) {
      case "fullName":
        isValid = value.trim() !== "";
        break;
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "password":
        isValid = value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
        break;
      case "confirmPassword":
        isValid = value === formData.password;
        break;
      default:
        break;
    }

    setFormValidity({
      ...formValidity,
      [name]: isValid,
    });
    
    // If confirmPassword changes, revalidate it when password changes
    if (name === "password" && formData.confirmPassword) {
      setFormValidity({
        ...formValidity,
        [name]: isValid,
        confirmPassword: value === formData.confirmPassword
      });
    }
  };

  // Animation for validation feedback
  const validationAnimation = keyframes`
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  `;

  // Pulse animation for validation icons
  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `;

  // Float animation for button
  const floatAnimation = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  `;

  // Submit success animation
  const successAnimation = keyframes`
    0% { transform: scale(0); }
    60% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `;

  // Glow animation for focus
  const glowAnimation = keyframes`
    0% { box-shadow: 0 0 5px 0 rgba(66, 153, 225, 0.3); }
    50% { box-shadow: 0 0 15px 0 rgba(66, 153, 225, 0.6); }
    100% { box-shadow: 0 0 5px 0 rgba(66, 153, 225, 0.3); }
  `;

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
        <SlideFade in={true} offsetY="20px">
          <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
              Sign Up
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Create an account to get started!
            </Text>
          </Box>
        </SlideFade>

        <FormControl>
          <SlideFade in={true} offsetY="20px" delay={0.1}>
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
            <InputGroup size="lg" position="relative" mb="24px">
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                type="text"
                placeholder="John Doe"
                fontWeight="500"
                size="lg"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={() => handleFocus("fullName")}
                onBlur={handleBlur}
                bg={inputBg}
                _focus={{
                  borderColor: "brand.500",
                  animation: `${glowAnimation} 2s infinite`,
                }}
                transition="all 0.3s ease"
              />
              {formData.fullName && (
                <InputRightElement display="flex" alignItems="center" justifyContent="flex-end" h="100%" pr="8px" w="auto">
                  <Tooltip 
                    label={formValidity.fullName ? "Valid name" : "Please enter your name"} 
                    placement="top" 
                    hasArrow
                    bg={formValidity.fullName ? "green.500" : "red.500"}
                    color="white"
                    borderRadius="md"
                    p={2}
                    boxShadow={validationShadow}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      w="24px"
                      h="24px"
                      animation={`${validationAnimation} 0.3s ease-in-out, ${pulseAnimation} 2s infinite`}
                      borderRadius="full"
                      bg={formValidity.fullName ? "green.100" : "red.100"}
                      p="4px"
                    >
                      <Icon
                        as={formValidity.fullName ? IoCheckmarkCircle : IoCloseCircle}
                        color={formValidity.fullName ? "green.500" : "red.500"}
                        w="full"
                        h="full"
                      />
                    </Flex>
                  </Tooltip>
                </InputRightElement>
              )}
            </InputGroup>
          </SlideFade>

          <SlideFade in={true} offsetY="20px" delay={0.2}>
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
            <InputGroup size="lg" position="relative" mb="24px">
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                type="email"
                placeholder="mail@simmmple.com"
                fontWeight="500"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                bg={inputBg}
                _focus={{
                  borderColor: "brand.500",
                  animation: `${glowAnimation} 2s infinite`,
                }}
                transition="all 0.3s ease"
              />
              {formData.email && (
                <InputRightElement display="flex" alignItems="center" justifyContent="flex-end" h="100%" pr="8px" w="auto">
                  <Tooltip 
                    label={formValidity.email ? "Valid email" : "Please enter a valid email"} 
                    placement="top" 
                    hasArrow
                    bg={formValidity.email ? "green.500" : "red.500"}
                    color="white"
                    borderRadius="md"
                    p={2}
                    boxShadow={validationShadow}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      w="24px"
                      h="24px"
                      animation={`${validationAnimation} 0.3s ease-in-out, ${pulseAnimation} 2s infinite`}
                      borderRadius="full"
                      bg={formValidity.email ? "green.100" : "red.100"}
                      p="4px"
                    >
                      <Icon
                        as={formValidity.email ? IoCheckmarkCircle : IoCloseCircle}
                        color={formValidity.email ? "green.500" : "red.500"}
                        w="full"
                        h="full"
                      />
                    </Flex>
                  </Tooltip>
                </InputRightElement>
              )}
            </InputGroup>
          </SlideFade>

          <SlideFade in={true} offsetY="20px" delay={0.3}>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="lg" position="relative" mb="24px">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                bg={inputBg}
                _focus={{
                  borderColor: "brand.500",
                  animation: `${glowAnimation} 2s infinite`,
                }}
                transition="all 0.3s ease"
              />
              <InputRightElement display="flex" alignItems="center" justifyContent="flex-end" h="100%" pr="8px" w="auto">
                <HStack spacing="5px">
                  {formData.password && (
                    <Tooltip 
                      label={formValidity.password ? "Strong password" : "Min 8 chars, letters & numbers"} 
                      placement="top" 
                      hasArrow
                      bg={formValidity.password ? "green.500" : "red.500"}
                      color="white"
                      borderRadius="md"
                      p={2}
                      boxShadow={validationShadow}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        w="24px"
                        h="24px"
                        animation={`${validationAnimation} 0.3s ease-in-out, ${pulseAnimation} 2s infinite`}
                        mr="5px"
                        borderRadius="full"
                        bg={formValidity.password ? "green.100" : "red.100"}
                        p="4px"
                      >
                        <Icon
                          as={formValidity.password ? IoCheckmarkCircle : IoCloseCircle}
                          color={formValidity.password ? "green.500" : "red.500"}
                          w="full"
                          h="full"
                        />
                      </Flex>
                    </Tooltip>
                  )}
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                    w="20px"
                    h="20px"
                  />
                </HStack>
              </InputRightElement>
            </InputGroup>
          </SlideFade>

          <SlideFade in={true} offsetY="20px" delay={0.4}>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="lg" position="relative" mb="24px">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Confirm your password"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={handleBlur}
                bg={inputBg}
                _focus={{
                  borderColor: "brand.500",
                  animation: `${glowAnimation} 2s infinite`,
                }}
                transition="all 0.3s ease"
              />
              <InputRightElement display="flex" alignItems="center" justifyContent="flex-end" h="100%" pr="8px" w="auto">
                <HStack spacing="5px">
                  {formData.confirmPassword && (
                    <Tooltip 
                      label={formValidity.confirmPassword ? "Passwords match" : "Passwords don't match"} 
                      placement="top" 
                      hasArrow
                      bg={formValidity.confirmPassword ? "green.500" : "red.500"}
                      color="white"
                      borderRadius="md"
                      p={2}
                      boxShadow={validationShadow}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        w="24px"
                        h="24px"
                        animation={`${validationAnimation} 0.3s ease-in-out, ${pulseAnimation} 2s infinite`}
                        mr="5px"
                        borderRadius="full"
                        bg={formValidity.confirmPassword ? "green.100" : "red.100"}
                        p="4px"
                      >
                        <Icon
                          as={formValidity.confirmPassword ? IoCheckmarkCircle : IoCloseCircle}
                          color={formValidity.confirmPassword ? "green.500" : "red.500"}
                          w="full"
                          h="full"
                        />
                      </Flex>
                    </Tooltip>
                  )}
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                    w="20px"
                    h="20px"
                  />
                </HStack>
              </InputRightElement>
            </InputGroup>
          </SlideFade>

          <SlideFade in={true} offsetY="20px" delay={0.5}>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="terms-and-conditions"
                  colorScheme="brandScheme"
                  me="10px"
                  isChecked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  sx={{
                    "& .chakra-checkbox__control": {
                      transition: "all 0.3s ease",
                      _checked: {
                        transform: "scale(1.1)",
                        bg: "brand.500",
                        borderColor: "brand.500",
                      },
                    },
                  }}
                />
                <FormLabel
                  htmlFor="terms-and-conditions"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  I agree to the{" "}
                  <Link 
                    color={textColorBrand} 
                    onClick={onTermsOpen} 
                    fontWeight="500"
                    position="relative"
                    _hover={{
                      textDecoration: "none",
                      _after: {
                        width: "100%",
                      }
                    }}
                    _after={{
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: "-2px",
                      left: "0",
                      bg: textColorBrand,
                      transition: "width 0.3s ease"
                    }}
                  >
                    terms and conditions
                  </Link>
                </FormLabel>
              </FormControl>
            </Flex>
          </SlideFade>

          {/* Modal for Terms and Conditions */}
          <Modal isOpen={isTermsOpen} onClose={onTermsClose}>
            <ModalOverlay backdropFilter="blur(5px)" />
            <ScaleFade in={isTermsOpen}>
              <ModalContent borderRadius="xl" overflow="hidden">
                <ModalHeader>Terms and Conditions</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    By using this service, you agree to the following terms and
                    conditions:
                  </Text>
                  <Text mt="4">
                    1. You are responsible for maintaining the confidentiality of
                    your account.
                  </Text>
                  <Text mt="4">
                    2. You agree not to use the service for any illegal activities.
                  </Text>
                  <Text mt="4">
                    3. We reserve the right to terminate your account at any time.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button 
                    colorScheme="blue" 
                    mr={3} 
                    onClick={handleAgree}
                    _hover={{ transform: "translateY(-2px)" }}
                    transition="all 0.2s ease"
                  >
                    Agree
                  </Button>
                  <Button variant="ghost" onClick={onTermsClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ScaleFade>
          </Modal>

          <SlideFade in={true} offsetY="20px" delay={0.6}>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="button"
              onClick={handleSubmit}
              isDisabled={
                !isChecked ||
                !formValidity.fullName ||
                !formValidity.email ||
                !formValidity.password ||
                !formValidity.confirmPassword ||
                formSubmitted
              }
              position="relative"
              overflow="hidden"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{
                transform: "translateY(0px)",
              }}
              _disabled={{
                opacity: 0.6,
                cursor: "not-allowed",
                _hover: {
                  transform: "none",
                  boxShadow: "none",
                }
              }}
              animation={
                isChecked &&
                formValidity.fullName &&
                formValidity.email &&
                formValidity.password &&
                formValidity.confirmPassword &&
                !formSubmitted
                  ? `${floatAnimation} 2s infinite`
                  : "none"
              }
              transition="all 0.3s ease"
            >
              {formSubmitted ? (
                <Flex align="center" justify="center">
                  <Icon
                    as={IoCheckmarkCircle}
                    color="white"
                    w="24px"
                    h="24px"
                    mr="8px"
                    animation={`${successAnimation} 0.5s ease-out`}
                  />
                  <Text>Account Created!</Text>
                </Flex>
              ) : (
                "Sign Up"
              )}
              
              {/* Add subtle ripple effect on hover */}
              <Box
                position="absolute"
                top="-20%"
                left="-20%"
                width="140%"
                height="140%"
                borderRadius="50%"
                bg="rgba(255, 255, 255, 0.15)"
                transform="scale(0)"
                opacity="0"
                transition="all 0.6s ease"
                _groupHover={{
                  transform: "scale(1)",
                  opacity: "1",
                }}
              />
            </Button>
          </SlideFade>
          
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
        >
          <SlideFade in={true} offsetY="20px" delay={0.7}>
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
              leftIcon={<Icon as={FcGoogle} w="20px" h="20px" />}
              _hover={{
                ...googleHover,
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={googleActive}
              _focus={googleActive}
              onClick={handleGoogleSignIn}
              position="relative"
              overflow="hidden"
              transition="all 0.3s ease"
              w="100%"
            >
              Sign up with Google
              
              {/* Add subtle ripple effect on hover */}
              <Box
                position="absolute"
                top="-20%"
                left="-20%"
                width="140%"
                height="140%"
                borderRadius="50%"
                bg="rgba(0, 0, 0, 0.05)"
                transform="scale(0)"
                opacity="0"
                transition="all 0.6s ease"
                _groupHover={{
                  transform: "scale(1)",
                  opacity: "1",
                }}
              />
            </Button>
          </SlideFade>
          
          {/* Google Sign-in Popup with rounded corners */}
          <Modal isOpen={isGoogleOpen} onClose={onGoogleClose} isCentered>
            <ModalOverlay backdropFilter="blur(5px)" />
            <ScaleFade in={isGoogleOpen}>
              <ModalContent maxW="400px" borderRadius="xl" overflow="hidden">
                <Box p={6} textAlign="center">
                  <Flex justifyContent="center" mb={4}>
                    <Icon as={FcGoogle} w="40px" h="40px" />
                  </Flex>
                  <Heading size="md" mb={4}>
                    Sign in with Google
                  </Heading>
                  {isGoogleLoading ? (
                    <Flex direction="column" align="center">
                      <Spinner size="xl" color="blue.500" mb={3} thickness="4px" speed="0.65s" />
                      <Text>Logging into Google...</Text>
                    </Flex>
                  ) : (
                    <Box>
                      <Text mb={4}>Choose an account to continue</Text>
                      <Button 
                        w="full" 
                        mb={3} 
                        onClick={completeGoogleSignIn}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "md",
                        }}
                        borderRadius="lg"
                        transition="all 0.2s ease"
                        bg="gray.100"
                        leftIcon={<FcGoogle />}
                      >
                        johndoe@gmail.com
                      </Button>
                      <Button 
                        w="full"
                        variant="outline" 
                        onClick={completeGoogleSignIn}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "md",
                        }}
                        borderRadius="lg"
                        transition="all 0.2s ease"
                      >
                        Use another account
                      </Button>
                    </Box>
                  )}
                </Box>
              </ModalContent>
            </ScaleFade>
          </Modal>
          
          <Flex align="center" mb="25px"></Flex>
          <SlideFade in={true} offsetY="20px" delay={0.8}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Already have an account?
                <NavLink to="/auth/sign-in">
                  <Text
                    color={textColorBrand}
                    as="span"
                    ms="5px"
                    fontWeight="500"
                    position="relative"
                    display="inline-block"
                    _hover={{
                      _after: {
                        width: "100%",
                      }
                    }}
                    _after={{
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: "-2px",
                      left: "0",
                      bg: textColorBrand,
                      transition: "width 0.3s ease"
                    }}
                  >
                    Sign In
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </SlideFade>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;