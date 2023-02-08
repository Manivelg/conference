import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DraggableDialog(props) {
const {open, onClose, onDelete} = props;
console.log('delete modal value: ' + JSON.stringify(props.value))
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {props.value ? props.value : "Yet to confirm" }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Are you sure..! you want to delete.</p> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}