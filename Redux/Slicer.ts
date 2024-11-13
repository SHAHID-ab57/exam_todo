import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface insialValue {
    addValue:any,
    fetchValue:any,
    detailsValue:any
  

}

const initialState: insialValue = {
    addValue: null,
    fetchValue:[],
    detailsValue:null
    
};


 

const addSlicer = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            state.addValue=action.payload.data
        },
        fetchTodos:(state,action)=>{
            state.fetchValue=action.payload;
        },
        detailsTodo:(state,action)=>{
            state.detailsValue=action.payload;
        }
        
    },
    

    
})

export default addSlicer.reducer;

export const {addTodo,detailsTodo,fetchTodos} = addSlicer.actions