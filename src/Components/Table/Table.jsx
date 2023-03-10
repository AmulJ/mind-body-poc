import { useEffect, useState } from "react";
import "./Table.css";

const Table = () => {
  // Column state
  const [columns, setColumns] = useState([
    { title: "postId", direction: "asc" },
    { title: "id", direction: "asc" },
    { title: "name", direction: "asc" },
    { title: "email", direction: "asc" },
    { title: "body", direction: "asc" },
  ]);

  // Comments state
  const [comments, setComments] = useState([]);


  // Sort on click
  const headerClick = (index) => {
      let copyComments = [...comments];
      const { title, direction } = columns[index];

      copyComments = copyComments.sort((a, b) => {
        if (a[title] > b[title]) {
          return direction === "asc" ? 1 : -1;
        }
        if (b[title] > a[title]) {
          return direction === "asc" ? -1 : 1;
        }
        return 0;
      });

      let copyColumn = [...columns];
      copyColumn[index] = {
        ...copyColumn[index],
        direction: direction === "asc" ? "desc" : "asc",
      };
      setColumns(copyColumn);
      setComments(copyComments);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="table-parent">
      {!comments.length && <span>Loading...</span>}
      {!!comments.length && <table className="center">
        <colgroup>
          {columns.map((_, index) => {
            return <col key={index}></col>;
          })}
        </colgroup>
        <thead>
          <tr>
            {columns.map(({ title, direction }, index) => {
              return (
                <th key={index} onClick={() => headerClick(index)}>
                  <span>{title}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {comments.map(({ postId, id, name, email, body }, index) => {
            return (
              <tr key={index}>
                <td >{id}</td>
                <td>{postId}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
}
    </div>
  );
};

export default Table;
