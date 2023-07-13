import { gql, useQuery } from "@apollo/client";
import React from "react";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });
  if (loading) return "Loading...";
  if (error) return `Error : ${error.message}`;
  //   console.log(data);
  const displayBookDetails = (data) => {
    const book = data.book;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by the author:</p>
            <ul className="other-books">
                {
                    book.author.books.map(item =>{
                        return <li key={item.id}>{item.name}</li>
                    })
                }
            </ul>
        </div>
      );
    } else {
        return(
            <div className="">No book selected...</div>
        )
    }
  };
  return (
    <>
        <div id="book-details">
        {displayBookDetails(data)}
    </div>
    </>

  );
};

export default BookDetails;
