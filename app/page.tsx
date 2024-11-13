"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTodo, fetchTodos } from "@/Redux/Slicer";

export default function Home() {
  const query = useQueryClient();
  const { fetchValue } = useAppSelector((state) => state.todo);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchData = () => axios.get("http://localhost:2000/todo");

  const { data } = useQuery("todos", fetchData, {
    onSuccess: (data) => dispatch(fetchTodos(data.data)),
    onError: (error) => console.log(error),
  });

  console.log(data?.data);

  const deleteMutated = useMutation(
    (id: string) => axios.delete(`http://localhost:2000/todo/${id}`),
    {
      onSuccess: () => {
        query.invalidateQueries("todos");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  console.log("data loaded", fetchValue);

  const handleDelete = (id: any) => {
    deleteMutated.mutate(id);
  };

  return (
    <>
      <Box
        sx={{
          mx: "auto",
          my: 3,
          maxWidth: 800,
          padding: 2,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Is completed</TableCell>
                <TableCell align="right">Edit & Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchValue.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell align="right">{item.title}</TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        maxWidth: "200px", 
                      }}
                    >
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{item.end_date}</TableCell>
                  <TableCell align="center">{item.isCompleted ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">
                    <Stack direction="column" spacing={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push(`edittodo/${item.id}`)}
                        sx={{ width: "120px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                        sx={{ width: "120px" }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
