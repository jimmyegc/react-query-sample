import React, { useState } from "react";
import { useMutatePost } from "../hooks/posts";

const messageSuccess = "¡El post fue agregado con éxito!"
function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate, mutateAsync, error, isLoading, isSuccess, reset, status } = useMutatePost()

  const addNewMutation = useMutatePost()

  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

  console.log("isloading", addNewMutation.isLoading)
  console.log("isSuccess", addNewMutation.isSuccess)
  console.log("isError", addNewMutation.isError)
  console.log("status", addNewMutation.status)

  const handleSubmit = async (e) => {
    e.preventDefault();

    addNewMutation.mutate({ title, body })

    /* mutate({ title, body }, {
      onSuccess: () => {
        setTitle("");
        setBody("");
      }
    }) */

    /* setIsLoading(true);
    try {
      await createNewPost({ title, body });

      setTitle("");
      setBody("");
    } catch (error) {
      setError(error);
    }

    setIsLoading(false); */
  };

  const srcImg = addNewMutation.isError ? "https://img.fortawesome.com/9e86c4d0/alert-warning.svg" : "https://img.fortawesome.com/9e86c4d0/alert-success.svg";

  return (
    <>    
    {addNewMutation.isLoading && <span>Cargando...</span> }
      {addNewMutation.isSuccess || addNewMutation.isError && (
        <>
        <img src={srcImg} />
        <strong className="me-auto">
                {addNewMutation?.error?.message}
                {addNewMutation?.isSuccess && messageSuccess}
        </strong>
        </>
      )}    
    <section>
      <h2>Create Post:</h2>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            <b>Title:</b>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="content">
            <b>Content:</b>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ resize: "vertical" }}
            id="content"
            className="form-control"
          ></textarea>
        </div>

        <button disabled={isLoading || !title} className="btn btn-primary mb-2">
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span>{" "}
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
        {error && (
          <p className="alert alert-danger">
            Error creating the post: {error.message}
          </p>
        )}
        {isSuccess && <div className="alert alert-success alert-dismissible" role="alert">
          The post was saved successfuly
          <button onClick={reset} type="button" className="btn-close"></button>
        </div>}
      </form>
    </section>
    </>
  );
}

export default NewPost;
