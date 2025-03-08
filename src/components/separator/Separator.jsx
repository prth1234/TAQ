import { Flex, Button } from "@chakra-ui/react";
import React from "react";

const HSeparator = (props) => {
  const { text, ...rest } = props;

  if (text) {
    return (
        <Flex alignItems="center" my={4} {...rest}>
          <Flex flex={1} h="1px" bg="rgba(135, 140, 189, 0.3)" />
          <Button mx={4} variant="outline" size="sm" disabled>
            {text}
          </Button>
          <Flex flex={1} h="1px" bg="rgba(135, 140, 189, 0.3)" />
        </Flex>
    );
  }

  return <Flex h="1px" w="100%" bg="rgba(135, 140, 189, 0.3)" {...rest} />;
};

const VSeparator = (props) => {
  const { text, ...rest } = props;

  if (text) {
    return (
        <Flex direction="column" alignItems="center" mx={4} {...rest}>
          <Flex flex={1} w="1px" bg="rgba(135, 140, 189, 0.3)" />
          <Button my={4} variant="outline" size="sm" disabled>
            {text}
          </Button>
          <Flex flex={1} w="1px" bg="rgba(135, 140, 189, 0.3)" />
        </Flex>
    );
  }

  return <Flex w="1px" bg="rgba(135, 140, 189, 0.3)" {...rest} />;
};

export { HSeparator, VSeparator };