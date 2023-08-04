
// material-ui
import {
  Grid,
  Stack,
  Button,
  TextField,
  InputLabel,
  Typography,
  Snackbar,
  Card
} from "@mui/material";


import { CopyOutlined, ScissorOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"; //used to manage component state and side effects





const TextArea = () => {

  //State
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  /**
   * @method [handleCopyText] used to copy the data from textfield
   */
  const handleCopyText = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
    }
  }

  /**
   * @method [handleCutText] used to remove  complete data from textfield
   */
  const handleCutText = () => {
    setText("");
  }



  /**
   * @method [handleCloseSnackBar] used to handle toast message visiblity
   */
  const handleCloseSnackBar = () => {
    setIsCopied(false);
  }




  //timer variable is used to handle time duration of display toast message
  useEffect(() => {
    let timer;
    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000); // Hide the Snackbar after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [isCopied]
  )

  const isTextFieldEmpty = text.trim() === ""; // Check if the text field is empty

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} lg={6}>
        <Card sx={{ width: '70%', height: '100%', padding: '60px' }}>
          <Card sx={{ height: '10%', marginBottom: '25px' }}>
            <Typography variant="h5" component='h2' sx={{ marginBottom: "10px", marginLeft: '15px' }}>
              Copy from TextArea
            </Typography>
          </Card>

          <Stack>
            <Typography color="textSecondary">
              Enter Text to Copy
            </Typography>
            <InputLabel >
            </InputLabel>
            <TextField
              multiline
              rows={8}
              value={text}
              fullWidth
              onChange={(event) => setText(event.target.value)}
            />

          </Stack>
          <Stack direction="row"
            alignItems="center"
            spacing={2}
            sx={{ mt: 2.5, top: 0, right: 0, left: 0, position: "relative" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'rgb(65, 105, 225)', color: 'white', cursor: isTextFieldEmpty ? 'not-allowed' : 'pointer' }}
              size="small"
              disabled={isTextFieldEmpty}
              onClick={handleCopyText}
            >
              <CopyOutlined />
              Copy
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'rgb(210, 4, 45)', color: 'white', cursor: isTextFieldEmpty ? 'not-allowed' : 'pointer' }}
              size="small"
              onClick={handleCutText}
              disabled={isTextFieldEmpty}
            >
              <ScissorOutlined />
              Cut
            </Button>
          </Stack>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={isCopied}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
            message={"Text Copied"}
            ContentProps={{
              style: {
                backgroundColor: 'green', // Set the background color 
                color: 'white', // Set the text color 
                textAlign: 'center' // Center the text
              }
            }}
          />


        </Card>
      </Grid>
    </Grid>
  )
}


export default TextArea;