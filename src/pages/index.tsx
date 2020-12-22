import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import "./style.css";
import Cards from "../component/Cards";

const GET_BOOKMARKS = gql`
  {
    bookmarks {
      id
      url
      title
    }
  }
`;
const ADD_BOOKMARK = gql`
  mutation addBookmark($url: String!, $title: String) {
    addBookmark(url: $url, title: $title) {
      id
    }
  }
`;

function index() {
  let titleField;
  let urlField;

  const { error, loading, data } = useQuery(GET_BOOKMARKS);
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  console.log("this is data", data);

  const handleSubmit = () => {
    console.log(titleField.value);
    console.log(urlField.value);
    addBookmark({
      variables: {
        url: urlField,
        title: titleField,
      },
      refetchQueries: [{ query: GET_BOOKMARKS }],
    });
  };

  //   if (error) return <h3>{{error}}</h3>
  if (loading) return <h3> loading</h3>;
  return (
    <div className="container">
      <h2>Add bookmark</h2>
      <label>
        Bookmark url <br />
        <input type="text" ref={(node) => (titleField = node)} />
        <br />
      </label>
      <label>
        Bookmark title <br />
        <input type="text" ref={(node) => (urlField = node)} />
      </label>
      <br />
      <button onClick={handleSubmit}>Add bookmark</button>
      <h2>My bookmark data</h2>
      {JSON.stringify(data.bookmarks)}

      <div className="card-container">
        {/* {data.bookmarks.map((bm) => ( */}
          <Cards url={urlField} title={titleField} />
        {/* ))} */}
      </div>
    </div>
  );
}

export default index;
