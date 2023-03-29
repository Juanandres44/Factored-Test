import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Radar } from "react-chartjs-2";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [collapsedEmployees, setCollapsedEmployees] = useState({});
  const [chartData, setChartData] = useState({});


  const handleCollapse = async (employee) => {
    const data = {
      labels: [
        ...employee.skills
      ],
      datasets: [
        {
          label: employee.name,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: employee.skillValue,
        },
      ],
    };
    setChartData(data);
    setCollapsedEmployees((prevState) => ({
      ...prevState,
      [employee.name]: !prevState[employee.name],
    }));
  };
  
  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/employees/");
      const newData = await response.json();
      setEmployees(newData);
      setLoading(false);
    };

    fetchData();
  }, []);


  Chart.register(...registerables);

  return (
    <>
      <NavBar />
      <div style={{ width: "100%", marginTop: "50px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Employee Information
        </Typography>
        <Table style={{ width: 800, margin: "auto" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>Skills</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              employees.map((employee) => (
                <React.Fragment key={employee.id}>
                  <StyledTableRow key={employee.id}>
                    <StyledTableCell>
                      <img
                        className="img-thumbnail"
                        src={employee.avatar}
                        alt={employee.name}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{employee.name}</StyledTableCell>
                    <StyledTableCell>{employee.position}</StyledTableCell>
                    <StyledTableCell>
                      <button onClick={() => handleCollapse(employee)}>
                        {collapsedEmployees[employee.name]
                          ? "Ocultar skills"
                          : "Ver skills"}
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                  {collapsedEmployees[employee.name] && (
                    <StyledTableRow>
                      <StyledTableCell colSpan={4}>
                        <Radar data={chartData} />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Home;
