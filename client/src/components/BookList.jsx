import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [item, setItem] = useState(null);

  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return "Loading Books...";
  if (error) return `Error : ${error.message}`;
  // console.log(data);
  const display = (data) => {
    return data.books.map((book) => {
      return (
        <li key={book.id} onClick={(e) =>setItem(book.id)}>
          {book.name}
        </li>
      );
    });
  };

  return (
    <>
      <div className="">
        <ul id="book-list">{display(data)}</ul>
          {
            item &&
          <BookDetails bookId={item} />
          }
      </div>
    </>
  );
};

export default BookList;
