import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

function SignUp() {
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
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state

  // State for form fields and their validity
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

  const handleClick = () => setShow(!show);

  // Function to handle agreement
  const handleAgree = () => {
    setIsChecked(true); // Check the checkbox
    onClose(); // Close the modal
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
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          {formData.fullName && (
            <Flex align="center" mb="24px">
              <Icon
                as={formValidity.fullName ? IoCheckmarkCircle : IoCloseCircle}
                color={formValidity.fullName ? "green.500" : "red.500"}
                me="4px"
              />
              <Text
                color={formValidity.fullName ? "green.500" : "red.500"}
                fontSize="md"
                fontWeight="700"
              >
                {formValidity.fullName ? "Valid name" : "Invalid name"}
              </Text>
            </Flex>
          )}

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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formData.email && (
            <Flex align="center" mb="24px">
              <Icon
                as={formValidity.email ? IoCheckmarkCircle : IoCloseCircle}
                color={formValidity.email ? "green.500" : "red.500"}
                me="4px"
              />
              <Text
                color={formValidity.email ? "green.500" : "red.500"}
                fontSize="md"
                fontWeight="700"
              >
                {formValidity.email ? "Valid email" : "Invalid email"}
              </Text>
            </Flex>
          )}

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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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
          {formData.password && (
            <Flex align="center" mb="24px">
              <Icon
                as={formValidity.password ? IoCheckmarkCircle : IoCloseCircle}
                color={formValidity.password ? "green.500" : "red.500"}
                me="4px"
              />
              <Text
                color={formValidity.password ? "green.500" : "red.500"}
                fontSize="md"
                fontWeight="700"
              >
                {formValidity.password
                  ? "Password is strong"
                  : "Password must be at least 8 characters long and contain at least one letter and one number"}
              </Text>
            </Flex>
          )}

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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
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
          {formData.confirmPassword && (
            <Flex align="center" mb="24px">
              <Icon
                as={
                  formValidity.confirmPassword ? IoCheckmarkCircle : IoCloseCircle
                }
                color={formValidity.confirmPassword ? "green.500" : "red.500"}
                me="4px"
              />
              <Text
                color={formValidity.confirmPassword ? "green.500" : "red.500"}
                fontSize="md"
                fontWeight="700"
              >
                {formValidity.confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </Text>
            </Flex>
          )}

          <Flex justifyContent="space-between" align="center" mb="24px">
            <FormControl display="flex" alignItems="center">
              <Checkbox
                id="terms-and-conditions"
                colorScheme="brandScheme"
                me="10px"
                isChecked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <FormLabel
                htmlFor="terms-and-conditions"
                mb="0"
                fontWeight="normal"
                color={textColor}
                fontSize="sm"
              >
                I agree to the{" "}
                <Link color={textColorBrand} onClick={onOpen}>
                  terms and conditions
                </Link>
              </FormLabel>
            </FormControl>
          </Flex>

          {/* Modal for Terms and Conditions */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
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
                <Button colorScheme="blue" mr={3} onClick={handleAgree}>
                  Agree
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <NavLink to="/admin/default">
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="button"
              isDisabled={
                !isChecked ||
                !formValidity.fullName ||
                !formValidity.email ||
                !formValidity.password ||
                !formValidity.confirmPassword
              } // Disable button if any field is invalid or checkbox is not checked
            >
              Sign Up
            </Button>
          </NavLink>
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
          <Flex align="center" mb="25px"></Flex>
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
                >
                  Sign In
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;