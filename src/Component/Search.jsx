import {useRef} from 'react';
import {Box, TextField} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import debounce from "lodash.debounce";

const Search = ({setCityName,cityName}) => {
    const ref = useRef();
    const theme = useTheme();
    const Styledbox = styled(Box)(({theme}) =>
        (
            {
                [theme.breakpoints.down('sm')]:{margin: '10px 5px',},
                [theme.breakpoints.up('md')]:{margin:'55px 25px'},
                display: 'inline-flex',
                flexDirection:'column',
                justifyContent: 'center',
                padding: '25px 25px',
                margin: '5px 5px',
                alignItems: 'center',
                borderRadius: '20px',
                backgroundColor: 'rgba(65, 65, 75, 0.5)',
                backdropFilter: 'blur(7px)',
                fontWeight:'bold',
                fontsize:'50px',
                textAlign:'center',

            }))




    const debouncedOnChange = debounce(setCityName, 1200, { 'maxWait': 5000 });


    return (

        <Styledbox>
            <Box sx={{fontSize:'20px'}}>هواشناسی ایران </Box>
            <TextField  variant="standard" color={"info"}
                        autoFocus={true}
                       onKeyUp={debouncedOnChange } />
            <Box padding={3} fontSize={14} >اسم شهر را انگلیسی وارد کنید</Box>
        </Styledbox>
    );
};

export default Search;
