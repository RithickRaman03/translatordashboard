import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Topbar from "./topbar";
import Navbar from "./navbar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Mycompleted() {
  const todoTitles = ["TASK NAME", " DATE", "TYPE", "PICKED BY", ""];
  const [table1details, setTable1Details] = useState([]);
  const [myQueue, setMyQueue] = useState([]);
  const [draftTable, setDraftTable] = useState([]);
  const [ischanged, setischanged] = useState(true);
  const [completedtable, setcompletedtable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;

  const currentmyqueue = myQueue.slice(indexOfFirstItem, indexOfLastItem);
  const currentdraft = draftTable.slice(indexOfFirstItem, indexOfLastItem);
  const currentcomplete = completedtable.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page function
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    axios
      .get("http://localhost:3008/translator_dashboard")
      .then((response) => {
        const initialTableDetails = response.data.map((row) => ({
          ...row,
          checked: false,
        }));
        setTable1Details(initialTableDetails);
        setMyQueue(
          initialTableDetails.filter((item) => {
            return item.id === "2" && item.isdraft === null;
          })
        );
        setDraftTable(
          initialTableDetails.filter((item) => {
            return item.isdraft === true && item.id === "2";
          })
        );
        setcompletedtable(
          initialTableDetails.filter((item) => {
            return (
              item.isdraft === false &&
              item.iscompleted === true &&
              item.id === "2"
            );
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [ischanged]);

  function getType(file_name) {
    const extension = file_name.split(".").pop();
    return extension === "docx" ? "Document" : "Audio";
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()} - ${
      date.getMonth() + 1
    } - ${date.getFullYear()}`;
    return formattedDate;
  }

  const handlepick = (id, file_id) => {
    const data = {
      id: id,
      file_id: file_id,
    };
    axios.put("http://localhost:3008/update", data);
    setischanged(!ischanged);
  };
  const handleStart = (index) => {
    const data = {
      id: index.id,
      file_id: index.file_id,
    };

    setischanged(!ischanged);

    // Make the API call to update the database
    axios.put("http://localhost:3008/updateTodraft", data);
  };

  return (
    <div>
      <Topbar />

      <div className="qfullcontent">
        <Navbar />
        <div className="qfirsttable">
          <TableContainer component={Paper}>
            <Table className="dashdrafttable">
              <TableHead>
                <b>COMPLETED</b>
                <TableRow>
                  <TableCell>
                    <b>DOCUMENT</b>
                  </TableCell>
                  <TableCell>
                    <b>PICKED-ON</b>
                  </TableCell>
                  <TableCell>
                    <b>SUBMITTED-ON</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentcomplete.map((index) => (
                  <TableRow key={index.id} hover>
                    <TableCell>{index.file_name}</TableCell>
                    <TableCell>{formatDate(index.assigned_dt)}</TableCell>
                    <TableCell>{formatDate(index.submitted_dt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="next_back">
              <Button
                className="back_button"
                sx={{ marginRight: 1, marginTop: 5.5 }}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                back
              </Button>
              <Button
                className="next_button"
                sx={{ marginRight: 1, marginTop: 5.5 }}
                onClick={nextPage}
                disabled={indexOfLastItem >= filteredData.length}
              >
                next
              </Button>
            </div>
          </TableContainer>
        </div>

        <div className="q2ndrow">
          <div className="qdraft">
            <TableContainer component={Paper}>
              <Table className="dashdrafttable">
                <TableHead>
                  MY QUEUE
                  <TableRow>
                    <TableCell>
                      <b>DOCUMENT</b>
                    </TableCell>
                    <TableCell>
                      <b>PICKED ON </b>
                    </TableCell>
                    <TableCell></TableCell>
                    <Link to="/myqueue">
                      <button className="cb">
                        <span className="material-symbols-outlined google-icon">
                          expand_content
                        </span>
                      </button>
                    </Link>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentmyqueue.slice(0, 5).map((index) => (
                    <TableRow key={index.id} hover>
                      <TableCell>{index.file_name}</TableCell>
                      <TableCell>{formatDate(index.assigned_dt)}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleStart(index)}>
                          start
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="next_back">
                <Button
                  className="back_button"
                  sx={{ marginRight: 1, marginTop: 5.5 }}
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  back
                </Button>
                <Button
                  className="next_button"
                  sx={{ marginRight: 1, marginTop: 5.5 }}
                  onClick={nextPage}
                  disabled={indexOfLastItem >= filteredData.length}
                >
                  next
                </Button>
              </div>
            </TableContainer>
          </div>
          <div className="qcomplete">
            <TableContainer component={Paper}>
              <Table className="dashdrafttable">
                <TableHead>
                  DRAFT
                  <TableRow>
                    <TableCell>
                      <b>DOCUMENT</b>
                    </TableCell>
                    <TableCell>
                      <b>LAST MODIFIED</b>
                    </TableCell>
                    <TableCell></TableCell>
                    <Link to="/mydraft">
                      <button className="cb">
                        <span className="material-symbols-outlined google-icon">
                          expand_content
                        </span>
                      </button>
                    </Link>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentdraft.slice(0, 5).map((index) => (
                    <TableRow key={index.id} hover>
                      <TableCell>{index.file_name}</TableCell>
                      <TableCell>{formatDate(index.assigned_dt)}</TableCell>
                      <TableCell>
                        <Button>start</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="next_back">
                <Button
                  className="back_button"
                  sx={{ marginRight: 1, marginTop: 5.5 }}
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  back
                </Button>
                <Button
                  className="next_button"
                  sx={{ marginRight: 1, marginTop: 5.5 }}
                  onClick={nextPage}
                  disabled={indexOfLastItem >= filteredData.length}
                >
                  next
                </Button>
              </div>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
