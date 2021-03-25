import Head from "next/head";
import { FormEventHandler, useState } from "react";
import { Button } from "@chakra-ui/button";

import Layout from "../components/Layout";
import InputField from "../components/InputField";
import NumberField from "../components/NumberField";
import { useCreateEventMutation } from "~/types/frontend";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [createEvent, { loading }] = useCreateEventMutation();

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    createEvent({
      variables: {
        input: {
          title,
          price: +price,
          date,
          description,
        },
      },
    });
  };

  return (
    <Layout>
      <Head>
        <title>create event / events</title>
      </Head>
      <form onSubmit={onSubmit}>
        <InputField
          type="text"
          placeholder="title"
          value={title}
          onChange={setTitle}
        >
          Title
        </InputField>
        <NumberField placeholder="price" value={price} onChange={setPrice}>
          Price
        </NumberField>
        <InputField
          type="date"
          placeholder="date"
          value={date}
          onChange={setDate}
        >
          Date
        </InputField>
        <InputField
          placeholder="description"
          value={description}
          onChange={setDescription}
          textarea
        >
          Description
        </InputField>
        <Button
          type="submit"
          colorScheme="teal"
          px="12"
          mt="2"
          isLoading={loading}
        >
          create event
        </Button>
      </form>
    </Layout>
  );
};

export default CreateEvent;
