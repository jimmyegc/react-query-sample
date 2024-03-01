
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createNewPost, getPosts, getPostById } from '../api/posts'

const key = "posts"

export function useMutatePost () {

    const queryClient = useQueryClient();

  return useMutation(createNewPost, {
    onSucess: (post) => {
      queryClient.setQueryData(["posts"], (prevPosts) => prevPosts.concat(post))
      queryClient.invalidateQueries(["posts"])
    }
  })
}

export function usePosts () {
    return useQuery(["posts"], getPosts)
}

export function usePost (postId) {
    return useQuery(["posts", postId], () => getPostById(postId))
}