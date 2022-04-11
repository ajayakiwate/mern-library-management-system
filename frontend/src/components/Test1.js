import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {Typeahead} from 'react-bootstrap-typeahead'
import ComboBox from "./ComboBox"

const options = JSON.parse('[{"_id":"61f2bbf83d70ec8c83e108e2","bookid":"a","received":true,"issuedate":"2022-01-27T15:36:24.827Z","__v":0,"submitdate":"2022-01-27T15:40:19.101Z"},{"_id":"61f2c5814c30078544956780","bookid":"2","received":true,"issuedate":"2022-01-27T16:17:05.976Z","__v":0,"submitdate":"2022-01-27T17:09:12.879Z"},{"_id":"61f2d1dc32d5c4cc3a4098be","bookid":"a","received":true,"issuedate":"2022-01-27T17:09:48.384Z","__v":0,"submitdate":"2022-01-27T17:21:26.198Z"},{"_id":"61f2d1e132d5c4cc3a4098c9","bookid":"2","received":true,"issuedate":"2022-01-27T17:09:53.484Z","__v":0,"submitdate":"2022-01-27T17:21:28.562Z"}]')

const op1 = [1,2,3,4,5];

export default function Test1(){
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const [singleSelections, setSingleSelections] = React.useState([]);

    return(<div>
        <Typeahead
          id="basic-typeahead-single"
          labelKey="bookid"
          onChange={setSingleSelections}
          options={options}
          placeholder="Choose a state..."
          selected={singleSelections}
        />
        <ComboBox/>
        <div>
      <div>{value._id}{value.bookid}</div>
      <div>{inputValue}</div>
      <br />
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
        if(newValue){setValue(newValue)}
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.bookid}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="USN" />}
      />
    </div>
        
        
    </div>);
}
