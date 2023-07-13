import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../queries/queries";

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  //   const { loading, error, data } = useQuery(getAuthorsQuery);
  //   if (loading) return "Loading Authors...";
  //   if (error) return `Error : ${error.message}`;

  const authors = useQuery(getAuthorsQuery);
  const [addBookMutationFunc, { data, loading, error }] =
    useMutation(addBookMutation);
  // console.log(authors);
  const loading1 = authors.loading || loading;
  const error1 = authors.error || error;

  if (loading1) return "Loading...";
  if (error1) return `Error : ${error1.message}`;

  //   console.log(data);
  const displayAuthor = (data) => {
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    // console.log(genre);
    // console.log(authorId);
    addBookMutationFunc({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId
      },
      refetchQueries:[{query:getBooksQuery}]
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="">Book Name:</label>
        <input type="text" required onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="">Genre:</label>
        <input type="text" required onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="">Author:</label>
        <select name="" id="" required onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select an Author</option>
          {displayAuthor(authors.data)}
        </select>
      </div>

      <button>+</button>
      {/* {console.log(name,genre, authorId)} */}
    </form>
  );
};

export default AddBook;
