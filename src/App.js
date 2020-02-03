import React, { useCallback, useState, useEffect } from "react";
import "./styles.css";

export const usePromise = (promise, retryAttempt = 0) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("about to fire off useEffect hook");
    promise
      .then(data => {
        setLoading(false);
        setData(data);
        console.log("got data from all the promises and set it: ", data);
      })
      .catch(errObj => {
        setLoading(false);
        setError(errObj);
        console.log("got errorobj and set it in state: ", errObj);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryAttempt]);
  return [data, loading, error];
};

export default function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getData = id => {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setTimeout(() => {
          setLoading(false);
          setData(json);
        }, 2000);
      });
  };
  const callZeApi = useCallback(id => {
    console.log("calling the api with id: ", id);
    setLoading(true);
    setData(null);
    getData(id);
  });
  return (
    <div>
      {loading && <p>loading...</p>}
      {data && <p>{data.title}</p>}
      <p>click button to call api</p>
      <button onClick={() => callZeApi(32)}>click here</button>
    </div>
  );
}
