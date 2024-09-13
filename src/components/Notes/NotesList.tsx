import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { fetchNotes, deleteNote, updateNote, createNote } from '../../features/notes/notesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { INote } from '../../interfaces/INote';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteModal from '../UI/Modal/NoteModal';

const NoteList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { notes, status, error } = useAppSelector((state) => state.notes);

    const [openModal, setOpenModal] = useState(false);
    const [currentNote, setCurrentNote] = useState<INote | null>(null);
    const [formErrors, setFormErrors] = useState({ title: '', content: '' });

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deleteNote(id));
    };

    const handleOpenModal = (note: INote | null = null) => {
        setCurrentNote(note);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentNote(null);
    };

    const handleSave = () => {
        if (!currentNote?.title) {
            setFormErrors({ ...formErrors, title: 'Title is required' });
            return;
        }
        if (!currentNote?.content) {
            setFormErrors({ ...formErrors, content: 'Content is required' });
            return;
        }

        if (currentNote?._id) {
            dispatch(updateNote({
                id: currentNote._id,
                note: {
                    title: currentNote.title,
                    content: currentNote.content
                }
            }));
        } else {
            dispatch(createNote({
                title: currentNote?.title || '',
                content: currentNote?.content || ''
            }));
        }

        handleCloseModal();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentNote({ ...currentNote!, [name]: value });
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    if (status === 'loading') return <Typography>Loading...</Typography>;
    if (status === 'failed') return <Typography color="error">{error}</Typography>;

    return (
        <>
        <Stack 
            direction="row" 
            spacing={2}
            sx={{
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Typography variant={"h4"}> 
                My memos
            </Typography>
            <Button variant="contained" onClick={() => handleOpenModal()}>Add+</Button>
        </Stack>
        
        <Grid container spacing={2} mt={2}>
            {notes.map((note: INote) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note._id}>
                    <Card
                        onClick={() => handleOpenModal(note)}
                        sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 6 } }}
                    >
                        <CardHeader
                            action={
                                <IconButton onClick={(e) => handleDelete(note._id, e)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            }
                            title={note.title}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>

        <NoteModal
            open={openModal}
            onClose={handleCloseModal}
            note={currentNote}
            onSave={handleSave}
            onChange={handleChange}
            formErrors={formErrors}
        />
        </>
    );
};

export default NoteList;
