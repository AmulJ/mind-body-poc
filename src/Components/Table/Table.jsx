import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./Table.css";

// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [modalData, setModalData] = useState({ open: false });


  // Handle open/ close of modal.
  const handleOpen = (data) => setModalData({ ...data, open: true });
  const handleClose = () => setModalData({ open: false });


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

  // Load data initially
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
              <tr onClick={() => handleOpen({ postId, id, name, email, body })} key={index}>
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
      <Modal
        open={modalData.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Id - {modalData.id}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            PostId - {modalData.postId}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Name - {modalData.name}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Email - {modalData.email}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Body - {modalData.body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Table;
