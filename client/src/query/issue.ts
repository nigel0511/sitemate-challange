import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const IssueQueryClient = useQueryClient();

const url = "https://localhost:3000";

export const { data: allIssues } = useQuery({
  queryKey: ["issue"],
  queryFn: () => fetch(url).then((res) => res.json()),
});

export const createIssue = useMutation({
  mutationFn: (payload: { name: string }) => {
    return axios.post(`${url}/api/issues/`, payload);
  },
  onSuccess: () => {
    IssueQueryClient.invalidateQueries({ queryKey: ["issue"] });
  },
});

export const updateUser = useMutation({
  mutationFn: (payload: { id: string; name: string }) => {
    return axios.put(`${url}/api/issues/${payload.id}`, payload);
  },
  onSuccess: () => {
    IssueQueryClient.invalidateQueries({ queryKey: ["issue"] });
  },
});

export const deleteIssue = useMutation({
  mutationFn: (payload: { id: string }) => {
    return axios.delete(`${url}/api/issues/${payload.id}`);
  },
  onSuccess: () => {
    IssueQueryClient.invalidateQueries({ queryKey: ["issue"] });
  },
});
