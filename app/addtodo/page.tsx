"use client";
import React from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postMuitate } from "../Hooks/todoPost";
import { useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";


interface UserData {
    title: string;
    description: string;
    endDate: string; 
    isCompleted: any;
    file: string | null;
  }
  
 
  const schema = yup.object({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
    endDate: yup
      .string()
      .required("End Date is required")
      ,
    isCompleted: yup
      .string()
      .oneOf(["yes", "no"], "Please select a valid option")
      .required("Completion status is required"),
    file: yup.string().required("File upload is required"),
  });

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserData>({
    resolver: yupResolver<any>(schema),
  });

  const { mutate: postForm } = postMuitate({
    onSuccess: (data: any) => {
      console.log("Submitted successfully", data);
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    console.log("Submitted Data", data);
    const user = {
      title: data.title,
      description: data.description,
      end_date: data.endDate,
      isCompleted: data.isCompleted,
      image: data.file,
    };
    postForm(user);
  };

  const handleSelectChange = (event:any) => {
    setValue("isCompleted", event.target.value);
  };

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValue("file", reader.result as string);
      };
      reader.onerror = (err) => {
        console.error("Error reading file", err);
      };
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        Add To Do
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                size="small"
                variant="filled"
                placeholder="Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
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
                placeholder="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                size="small"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                {...register("endDate")}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                sx={{ mt: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: 250 }}>
                <InputLabel variant="standard" htmlFor="isCompleted">
                  Is Completed
                </InputLabel>
                <NativeSelect
                  defaultValue={"no"}
                  onChange={handleSelectChange}
                  inputProps={{
                    name: "isCompleted",
                    id: "isCompleted",
                  }}
                >
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </NativeSelect>
                {errors.isCompleted && (
                  <Typography color="error" variant="caption">
                   
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="secondary" component="label" startIcon={<CloudUploadIcon />}>
                Upload Image
                <input type="file" hidden onChange={fileHandler} />
              </Button>
              {errors.file && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.file.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Add To Do
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Page;
