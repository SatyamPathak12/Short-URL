import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import ShortenLink from "./ShortenLink";

function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [urlData, setUrlData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("");

  const url = "https://url-api-ashy.vercel.app";

  function validateUrl(url) {
    // Convert URL to lowercase to ensure case-insensitive comparison
    const lowercasedURL = url.toLowerCase();

    // Check if the URL starts with "http://" or "https://"
    if (
      lowercasedURL.startsWith("http://") ||
      lowercasedURL.startsWith("https://")
    ) {
      return true;
    } else {
      return false;
    }
  }

  function onChangeHandler(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    async function fetcData(api) {
      const res = await fetch(api);
      const data = await res.json();
      setUrlData(data);
      const latestValue = data[data.length - 1];
      const link = `https://url-api-ashy.vercel.app/${latestValue.shorturlid}`;
      setMessage(link);
    }

    fetcData(url + "/api/get-all-short-urls");
  }, [refresh]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    if (validateUrl(input) === false) {
      setError(true);
      setMessage("Enter a valid link starting with http:// or https://");
      return;
    }
    try {
      const res = await fetch(url + "/api/create-short-url", {
        method: "POST",
        body: JSON.stringify({
          longurl: input,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "ok") {
        setError(true);
        setInput("");
        setRefresh((old) => !old);
        console.log(input, "form submitted");
      }
    } catch (error) {
      setError(true);
      setMessage(error.message);
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-9 p-4">
        <h1 className="self-start text-4xl font-bold">Create Short URL</h1>
        <div className="flex h-2/3 flex-col rounded-lg bg-blue-100 px-20 py-16 sm:w-2/4">
          <form
            className="flex w-full flex-col items-center gap-6"
            onSubmit={onSubmitHandler}
          >
            <label htmlFor="url" className="self-start">
              Enter Link
            </label>
            <input
              type="text"
              value={input}
              onChange={onChangeHandler}
              placeholder="http://site.com"
              id="url"
              className={`h-10 w-full border-2 p-3 focus:outline-none`}
            />
            {error && <ErrorComponent message={message} />}
            <input
              type="submit"
              className="h-10 w-full bg-black text-white transition-all ease-in hover:cursor-pointer hover:bg-gray-800"
              value="Create short URL"
            />
          </form>
        </div>

        <ShortenLink data={urlData} />
      </div>
    </>
  );
}

export default Home;
