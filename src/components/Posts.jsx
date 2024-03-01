/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useEffect, useState } from "react";

import { usePosts } from '../hooks/posts';

export default function Posts({ setPostId }) {
/*   const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null); */

  //const queryClient = useQueryClient()

  // const { data: posts, error, isLoading, isError, isSuccess, status } = useQuery(["posts"], getPosts)
  const { data: posts, error, isLoading, isFetching, isIdle, refetch } = usePosts()
  /*const { data: posts, error, isLoading, isFetching, isIdle, refetch } = useQuery(["posts"], getPosts, {
    //staleTime: 60000, // Cuanto tiempo se consideran fresca la data.
    //staleTime: Infinity, // Siempre frescos
    //cacheTime: 3000,
    //enabled: false,
    //retry: 1, // re-intentos
    //retryDelay: 3000 // cuanto tiempo entre delay
    //refetchOnWindowFocus: false,
    //refetchInterval: 2000
  }) */


 /*    console.log("isError", isError);
    console.log("isSuccess", isSuccess)
    console.log("estatus", status); */

  /* useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getPosts();
        setPosts(data);
        setError(null);
      } catch (error) {
        setError(error);
        setPosts(null);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []); */

  if(isIdle) {
    return <button onClick={refetch}>Fetch Posts</button>
  }

  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span> Loading Posts...
      </div>
    );
  }

  if (error) {
    return (
      <section className="alert alert-danger">
        Error fetching posts: {error.message}
      </section>
    );
  }

  return (
    <section>
      <h2>Posts: {isFetching && <span className="spinner-border"></span>} </h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a 
            /* className={queryClient.getQueryData(['posts', post.id]) && 'link-success'} */
            onClick={() => setPostId(post.id)} href="#">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
