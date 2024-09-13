import React, { ChangeEvent } from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { INote } from '../../../interfaces/INote';
import FormElement from '../Form/FormElement';

interface NoteModalProps {
    open: boolean;
    onClose: () => void;
    note: INote | null;
    onSave: (note: INote) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    formErrors: { title: string; content: string };
}

const NoteModal: React.FC<NoteModalProps> = ({
    open,
    onClose,
    note,
    onSave,
    onChange,
    formErrors
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {note ? 'Edit Note' : 'Add Note'}
                </Typography>
                <FormElement
                    label="Title"
                    name="title"
                    value={note?.title || ''}
                    onChange={onChange}
                    required
                    error={formErrors.title}
                />
                <FormElement
                    label="Content"
                    name="content"
                    value={note?.content || ''}
                    onChange={onChange}
                    required
                    multiline
                    error={formErrors.content}
                />
                <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="contained" onClick={() => note && onSave(note)}>Save</Button>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default NoteModal;
