import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const url = "http://localhost:3000/api/issues";

function App() {
  const [count, setCount] = useState(0);
  const [newIssueName, setNewIssueName] = useState("");
  const queryClient = useQueryClient();

  const { data: allIssues } = useQuery({
    queryKey: ["issue"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  const createIssue = useMutation({
    mutationFn: (payload: {
      id: string;
      title: string;
      description: string;
    }) => {
      return axios.post(`${url}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue"] });
    },
  });

  const updateUser = useMutation({
    mutationFn: (payload: { id: string; name: string }) => {
      return axios.put(`${url}/${payload.id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue"] });
    },
  });

  const deleteIssue = useMutation({
    mutationFn: (payload: { id: string }) => {
      return axios.delete(`${url}/${payload.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue"] });
    },
  });

  return (
    <>
      <div>
        {allIssues?.map((issue: any) => {
          return (
            <div>
              <p> {issue.title}</p>
              <p> {issue.description}</p>
              <button onClick={() => deleteIssue.mutate(issue.id.toString())}>
                Delete
              </button>
            </div>
          );
        })}
        <label>Create new issue</label>
        <input
          onChange={(e) => {
            setNewIssueName(e.target.value);
          }}
        ></input>
        <button
          onClick={() =>
            createIssue.mutate({
              id: "0",
              title: newIssueName,
              description: "",
            })
          }
        >
          Create
        </button>
      </div>
    </>
  );
}

export default App;
