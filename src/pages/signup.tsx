import Head from "next/head";
import { FormEventHandler, useState } from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/layout";

import Layout from "../components/Layout";
import InputField from "../components/InputField";
import { MeDocument, MeQuery, useSignupMutation } from "~/types/frontend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [login, { error, loading }] = useSignupMutation({
    errorPolicy: "all",
    onCompleted(data) {
      if (data.signup) {
        router.push("/home");
      }
    },
    update(cache, { data }) {
      if (data.signup) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: { ...data.signup },
          },
        });
      }
    },
  });

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  return (
    <Layout>
      <Head>
        <title>signup / events</title>
      </Head>
      <Heading mb="6" size="lg" fontWeight="medium">
        signup for an account
      </Heading>
      {error && (
        <Alert mb="4" status="error">
          <AlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <InputField
          placeholder="email"
          type="email"
          value={email}
          onChange={setEmail}
        >
          Email
        </InputField>
        <InputField
          placeholder="password"
          type="password"
          value={password}
          onChange={setPassword}
        >
          Password
        </InputField>
        <Button
          type="submit"
          colorScheme="teal"
          px="12"
          mt="2"
          isLoading={loading}
        >
          signup
        </Button>
      </form>
    </Layout>
  );
};

export default Login;
