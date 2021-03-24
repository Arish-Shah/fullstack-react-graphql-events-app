import { Box } from "@chakra-ui/layout";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box p="4" maxW="4xl" mx="auto">
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
