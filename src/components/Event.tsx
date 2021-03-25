import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";

import { Event, User, useBookEventMutation } from "~/types/frontend";

interface EventProps {
  event: Pick<
    Event,
    "id" | "title" | "description" | "price" | "date" | "createdAt"
  > & {
    creator: Pick<User, "email">;
  };
  me?;
}

const EventComponent: React.FC<EventProps> = (props) => {
  const router = useRouter();

  const [bookEvent] = useBookEventMutation({
    onCompleted(data) {
      if (data.bookEvent) {
        router.push("/booked-events");
      }
    },
    update(cache, { data }) {
      if (data.bookEvent) {
        // TODO: update cache
      }
    },
  });

  const onBook = () => {
    bookEvent({
      variables: {
        eventId: props.event.id,
      },
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading size="md" fontWeight="medium">
        {props.event.title}
      </Heading>
      {!props.me && (
        <Text textColor="gray.500">by {props.event.creator.email}</Text>
      )}
      <Text fontWeight="medium" size="sm" my="2">
        {new Date(props.event.date).toLocaleString()} - ${props.event.price}{" "}
        each
      </Text>
      <Text>{props.event.description}</Text>
      <Button mt="3" colorScheme="teal" px="12" onClick={onBook}>
        book
      </Button>
    </Box>
  );
};

export default EventComponent;
