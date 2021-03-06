import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { MainArea, Loading, FormatUpdate, StyledCard, CardInner, StyledDeleteButton, AddUl } from "../../components";
import { getPlace, postPlace, getPlaceCats } from "../../apis";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import CallIcon from '@mui/icons-material/Call';
import FaxIcon from '@mui/icons-material/Fax';
import NotesIcon from '@mui/icons-material/Notes';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DeleteIcon from '@mui/icons-material/Delete';
import { blueGrey } from '@mui/material/colors';



export function PlaceDetailPage({ place }) {
  const history = useHistory();

  const [placeCats, setPlaceCats] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const params = useParams();

  const onSubmit = data => { 
    data.id = place.id;
    console.log(data);
    postPlace(data, 'edit').then(()=>{
      history.go(0);//レンダリング
    });
  }
  
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getPlaceCats().then((data) =>{ 
      if (!unmounted) {
        setPlaceCats(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [params.placeId]);

  const onDelete = data => { 
    data.id = place.id;
    data.removed = true;
    console.log(data);
    postPlace(data, 'edit').then(()=>{
      history.push({ pathname: '/', state: { rootIndex: 2 }});
      //遷移先にrootIndexを渡す　→　会場一覧に飛ぶ
    });
  }

  return (
    <MainArea>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="会場名"
                  fullWidth
                  defaultValue={place.name}
                  //disabled={!edit}
                  margin="normal"
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
                  margin="normal"
                  defaultValue={place.memo}
                  multiline
                  rows={2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NotesIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("memo")}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && errors.memo.message}
                />
              </li>
              <li>
                <TextField
                  label="TEL"
                  margin="normal"
                  className="three"
                  defaultValue={place.tel}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("tel")}
                  error={Boolean(errors.tel)}
                  helperText={errors.tel && errors.tel.message}
                />
                <TextField
                  label="FAX"
                  margin="normal"
                  variant="standard"
                  className="three"
                  defaultValue={place.fax}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaxIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("fax")}
                  error={Boolean(errors.fax)}
                  helperText={errors.fax && errors.fax.message}
                />
              </li>
              <li>
                <TextField
                  fullWidth
                  {...register("PlaceCatId", { required: true })}
                  className="three"
                  margin="normal"
                  variant="standard"
                  defaultValue={place.PlaceCatId}
                  required
                  select
                  onChange={e => setValue('PlaceCatId', e.target.value, true)}
                  label="カテゴリー"
                  error={Boolean(errors.PlaceCatId)}
                  helperText={errors.PlaceCatId && '必須です'}
                >
                {placeCats && placeCats.map((placeCat) => (
                  <MenuItem value={placeCat.id} key={placeCat.id}>
                    {placeCat.name}
                  </MenuItem>
                ))}
                </TextField>
                <TextField
                  label="国"
                  variant="standard"
                  defaultValue="日本"
                  margin="normal"
                  className="three"
                  defaultValue={place.country}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("country")}
                  error={Boolean(errors.country)}
                  helperText={errors.country && errors.country.message}
                />
                <TextField
                  label="郵便番号"
                  margin="normal"
                  className="three"
                  defaultValue={place.postalCode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("postalCode")}
                  error={Boolean(errors.postalCode)}
                  helperText={errors.postalCode&& errors.postalCode.message}
                />
              </li>
              <li>
                <TextField
                  label="都道府県"
                  name="prefecture"
                  id="prefecture"
                  margin="normal"
                  className="three"
                  defaultValue={place.prefecture}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("prefecture")}
                  error={Boolean(errors.prefecture)}
                  helperText={errors.prefecture && errors.prefecture.message}
                />
                <TextField
                  name="city"
                  id="city"
                  label="市町村区"
                  margin="normal"
                  defaultValue={place.city}
                  className="three"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("city")}
                  error={Boolean(errors.city)}
                  helperText={errors.city && errors.city.message}
                />
                <TextField
                  name="street"
                  id="street"
                  label="番地"
                  margin="normal"
                  defaultValue={place.street}
                  className="three"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapsHomeWorkIcon  />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("street")}
                  error={Boolean(errors.street)}
                  helperText={errors.street && errors.street.message}
                />
              </li>
              <Button type="submit" variant="contained" color="primary" className='submit_button'>
                更新
              </Button>
            </AddUl>
          </form>
          <form onSubmit={handleSubmit(onDelete)} className="bin_icon">
            <button type="submit"><DeleteIcon sx={{ color: blueGrey[500] }}/></button>
          </form>
          <FormatUpdate updateAt={place.updatedAt}/>
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}

