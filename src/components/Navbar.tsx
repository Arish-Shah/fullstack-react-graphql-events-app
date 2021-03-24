import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import NextLink from "next/link";

import { useMeQuery } from "~/types/frontend";

const Navbar = () => {
  const { data, loading } = useMeQuery();

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="8">
      <NextLink href="/">
        <a>
          <Heading>events</Heading>
        </a>
      </NextLink>
      <Box>
        <NextLink href="/login">
          <a>
            <Button colorScheme="teal">login</Button>
          </a>
        </NextLink>
        <NextLink href="/signup">
          <a>
            <Button ml="2">signup</Button>
          </a>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Navbar;
