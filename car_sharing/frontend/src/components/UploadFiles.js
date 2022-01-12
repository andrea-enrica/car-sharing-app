import React from "react";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";

const UploadFiles = ({parentCallback}) => {
    const {
        setError,
        clearErrors,
        formState: {errors}
    } = useForm();

    const handleOnChange = (event) => {
        let files = event.target.files;
        let fileList = [];

        let hasError = false;
        Array.from(files).forEach(file => {
            if (!/^.*[jpg|JPG|png|PNG|jpeg|JPEG]$/.test(file.name) || file.size > 6000000) {
                hasError = true;
                setError('file', {message: "File does not supported!"});
                document.getElementById("error").style.display = 'flex';
                return false;
            } else {
                fileList.push(file);
            }
        })
        if(!hasError) {
            clearErrors('file');
        }
        parentCallback([...fileList]);
    }

    const handleClick = () => {
        const selectedFileInput = document.getElementById('selectedFile');
        selectedFileInput.click();
        document.getElementById("error").style.display = 'none';
    }

    return(
        <div>
            <input
                type="file" name="file" id="selectedFile" multiple="multiple"
                style={{display: 'none'}}
                onChange={handleOnChange}
            />
            <input type="button" value="Choose File" onClick={handleClick}/>

            <Typography style={{display: "none"}} id="error" variant="inherit" color="red">
                {errors.file?.message}
            </Typography>
        </div>
    );
}
export default UploadFiles;
