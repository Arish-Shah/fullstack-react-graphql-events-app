import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Skeleton } from "@chakra-ui/skeleton";
import NextLink from "next/link";
import { Fragment } from "react";

import {
  useMeQuery,
  useLogoutMutation,
  MeQuery,
  MeDocument,
} from "~/types/frontend";

const Navbar = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation({
    update(cache, { data }) {
      if (data.logout) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: null,
          },
        });
      }
    },
  });

  const right = loading ? null : data?.me ? (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {data.me.email}
      </MenuButton>
      <MenuList>
        <NextLink href="/create-event">
          <a>
            <MenuItem>Create Event</MenuItem>
          </a>
        </NextLink>
        <NextLink href="/my-events">
          <a>
            <MenuItem>My Events</MenuItem>
          </a>
        </NextLink>
        <NextLink href="/booked-events">
          <a>
            <MenuItem>Booked Events</MenuItem>
          </a>
        </NextLink>
        <MenuItem onClick={() => logout()}>logout</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Fragment>
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
    </Fragment>
  );

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="6">
      <NextLink href="/">
        <a>
          <Heading>events</Heading>
        </a>
      </NextLink>
      <Box>{right}</Box>
    </Flex>
  );
};

export default Navbar;
