import * as React from 'react';

import { useEffect, useState } from "react";
import { MainArea, StyledCard, CardInner, AddUl} from "../../components";

import { useForm, Controller } from "react-hook-form";
import { postTour } from "../../apis";
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export function TourAddPage({ setHdTitle }) {
  const [Tours, setTours] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  const onSubmit = data => { 
    console.log(data);
    postTour(data, 'add');
  }

  return (
    <MainArea>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AddUl>
                <li>
                  <TextField
                    label="ツアー名"
                    fullWidth
                    variant="standard"
                    {...register("name", { required: true })}
                    error={Boolean(errors.name)}
                    helperText={errors.name && errors.name.message}
                  />
                </li>
                <li>
                  <TextField
                    label="メモ"
                    fullWidth
                    id="select"
                    rows={3}
                    variant="standard"
                    {...register("memo")}
                    error={Boolean(errors.memo)}
                    helperText={errors.memo && errors.memo.message}
                  />
                </li>
                <Button type="submit" variant="contained" color="primary" className='submit_button'>
                  新規登録
                </Button>
              </AddUl>
            </form>
          </LocalizationProvider>
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}