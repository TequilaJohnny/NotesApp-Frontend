import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { INote } from '../../interfaces/INote';
import axiosInstance from '../../api/api';
import { toast } from 'react-toastify';

interface NotesState {
    notes: INote[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: NotesState = {
    notes: [],
    status: 'idle',
    error: null,
};

export const createNote = createAsyncThunk(
    'notes/createNote',
    async (note: { title: string; content: string }) => {
        const response = await axiosInstance.post('/notes', note);
        return response.data as INote;
    }
);
  
export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async () => {
        const response = await axiosInstance.get('/notes');
        return response.data as INote[];
    }
);

export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, note }: { id: string; note: Partial<INote> }) => {
        const response = await axiosInstance.put(`/notes/${id}`, note);
        return response.data as INote;
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id: string) => {
        await axiosInstance.delete(`/notes/${id}`);
        return id;
    }
);

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createNote.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createNote.fulfilled, (state, action) => {
            state.status = 'idle';
            state.notes.push(action.payload);
            toast.success('Note created successfully!');
        })
        .addCase(createNote.rejected, (state) => {
            state.status = 'failed';
            toast.error('Failed to create note.');
        })
        .addCase(fetchNotes.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = 'idle';
            state.notes = action.payload;
        })
        .addCase(fetchNotes.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(updateNote.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateNote.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.notes.findIndex(note => note._id === action.payload._id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
            toast.success('Note updated successfully!');
        })
        .addCase(updateNote.rejected, (state) => {
            state.status = 'failed';
            toast.error('Failed to update note.');
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            state.notes = state.notes.filter(note => note._id !== action.payload);
            toast.success('Note deleted successfully!');
        });
    },
});

export default notesSlice.reducer;
