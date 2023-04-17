import axios from "axios";
import {useCallback, useState} from "react";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
//axios.defaults.baseURL = "https://api.jsonbin.io/v3/b/64359edaebd26539d0a8ffd1";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

const useAPI = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Learn about Axios Request Config at https://github.com/axios/axios#request-config
  const sendRequest = useCallback((requestConfig) => {
    setIsLoading(true);
    setError("");

    axios(requestConfig)
      .then((response) => {
          // if response if from delete request, response.data is null
          if (response.config && response.config.method === "delete")
            setData([response.status]);
          else
            setData(Array.isArray(response.data) ? response.data : [response.data])
        }
      )
      .catch((err) => {
        if (err.response) {
          const errors = err.response.data;
          console.log(errors);

          const messages = Object.entries(errors).map(([field, messages]) => {
            if (Array.isArray(messages)) {
              return messages.map((m) => `${field} ${m}`);
            }
            return `${field} ${messages}`;
          });
          throw new Error(messages.join(", "));
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          setError(err.request.message);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          setError(err.message || "Something went wrong!");
        }
      });
    setIsLoading(false);
  }, []);

  return {data, setData, isLoading, error, sendRequest};
};

export default useAPI;
