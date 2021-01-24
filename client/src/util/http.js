const URL = "http://localhost:8080/graphql";

const http = async (QUERY, headers = {}) => {
  const body = {
    query: QUERY
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export default http;
