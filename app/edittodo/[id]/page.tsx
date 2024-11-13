"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { detailsTodo } from "@/Redux/Slicer";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [id, setId] = React.useState<string>("");

  const { detailsValue } = useAppSelector((state: any) => state.todo);

  const fetchbyId = (id: string) =>
    axios.get(`http://localhost:2000/todo/${id}`);

  const { data } = useQuery(["details", id], () => fetchbyId(id), {
    enabled: !!id,
    onSuccess: (data: any) => {
      dispatch(detailsTodo(data.data));
    },
  });

  console.log("detailsValue", detailsValue);

  const [todoData, setTodoData] = useState({
    id: "",
    title: "",
    description: "",
    end_date: "",
    isCompleted: "",
    image: "",
  });
  useEffect(() => {
    params.then((res: any) => {
      setId(res.id);
    });
  }, [params]);

  const putMutate = useMutation(
    (data: any) => axios.put(`http://localhost:2000/todo/${data.id}`, data),

    {
      onSuccess: (data: any) => {
        console.log("Success PUT", data);
        router.push("/");
      },
      onError: (error: any) => {
        console.error("Error PUT", error);
      },
    }
  );

  useEffect(() => {
    setTodoData({
      id: detailsValue?.id || "",
      title: detailsValue?.title || "",
      description: detailsValue?.description || "",
      end_date: detailsValue?.end_date || "",
      isCompleted: detailsValue?.isCompleted || "",
      image: detailsValue?.image || "",
    });
  }, [detailsValue]);

  // console.log(editValue);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted todoData:", todoData);
    putMutate.mutate(todoData)
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Edit to do
      </Typography>

      <Box
        sx={{
          mx: "auto",
          my: 3,
          width: 600,
          borderRadius: 2,
          boxShadow: 2,
          p: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                size="small"
                variant="filled"
                placeholder="title"
                type="text"
                name="title"
                value={todoData.title}
                onChange={(e) =>
                  setTodoData({ ...todoData, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                rows={6}
                multiline
                fullWidth
                size="small"
                variant="filled"
                placeholder="description"
                name="description"
                value={todoData.description}
                onChange={(e) =>
                  setTodoData({ ...todoData, description: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <label>End Date :</label>
              <TextField
                type="date"
                fullWidth
                size="small"
                variant="filled"
                name="end_date"
                value={todoData.end_date}
                onChange={(e) =>
                  setTodoData({ ...todoData, end_date: e.target.value })
                }
                sx={{
                  mt: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: 250 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Is Completed
                </InputLabel>
                <NativeSelect
                  name="isCompleted"
                  value={todoData.isCompleted}
                  onChange={(e) =>
                    setTodoData({ ...todoData, isCompleted: e.target.value })
                  }
                  inputProps={{
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </NativeSelect>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloudUploadIcon />}
                component="label"
              >
                Upload Image
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setTodoData((prevData) => ({
                          ...prevData,
                          image: reader.result as string,
                        }));
                      };
                    }
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Page;
