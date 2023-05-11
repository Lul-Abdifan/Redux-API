import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=5");
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user data");
  }
});
const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
