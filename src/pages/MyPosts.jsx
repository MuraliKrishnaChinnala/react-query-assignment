import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { postsService } from "../API/posts/PostsService";
import Button from "../components/Button";
import { QueryKeys } from "../helpers/QueryKeys";

export default function MyPosts() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: myPosts,
    isError,
    error,
  } = useQuery({
    queryKey: [QueryKeys.PostsGet],
    queryFn: () =>
      postsService
        .getPosts()
        .then((res) => res.data),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: (id) => postsService.deletePost(id),
    onSuccess: (res) => {
      console.log(res.data);
      queryClient.invalidateQueries({ myPosts: [QueryKeys.PostsGet] });
    },
    onError: (err) => {
      console.log("unable to Delete the Post" + err);
    },
  });

  const onDelete = (id) => {
    mutation.mutate(id);
  }

  if (isError) {
    return <div>something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[100vh]">
      <h1>All My Posts</h1>
      <div className="grid grid-cols-2 overflow-auto h-3/4">
      {myPosts.map((item,i) => {
          return (
            <div className="border border-black p-2 rounded m-2" key={i}>
              <div className="flex items-center mb-1">
                <p className="font-bold w-28 shrink-0">Title:</p>
                <p>{item.title}</p>
              </div>
              <div className="flex items-center mb-1">
                <p className="w-28 font-bold shrink-0">Comment:</p>
                <p>{item.body}</p>
              </div>
              <Button onClick={()=>onDelete(item.id)}>Delete this Post</Button>
            </div>
          )
        })}
      </div>
    </div>
  );
}
