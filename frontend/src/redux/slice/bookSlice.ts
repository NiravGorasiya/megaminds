import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addBookApi, listBookApi } from '../../services/bookservices';

interface Book {
    _id: string;
    title: string;
    author: string;
    __v: number;
}

interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
};

const addBook = createAsyncThunk(
    'books/addBook',
    async ({ author, title }: { author: string; title: string }, thunkAPI) => {
        try {
            const response = await addBookApi(author, title);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error adding book');
        }
    }
);


const listBooks = createAsyncThunk<any, void, { rejectValue: string }>(
    'books/listBooks',
    async (_, thunkAPI) => {
      try {
        const books = await listBookApi(); 
        return books; 
      } catch (error) {
        return thunkAPI.rejectWithValue('Fetching books failed');
      }
    }
  );


// Create the slice
const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action:any) => {
                state.loading = false;
                state.books.push(action.payload.data)
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add book';
            })
            .addCase(listBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(listBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch books';
            });
    },
});

export { addBook, listBooks }
export default bookSlice.reducer;
