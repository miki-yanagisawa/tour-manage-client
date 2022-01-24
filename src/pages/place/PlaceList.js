import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, Loading, MainArea, SearchPlace } from "../../components";
import { getPlaces } from "../../apis";

export function PlaceListPage({ setHdTitle }) {
  const [places, setPlaces] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  
  
  useEffect(() => {
    getPlaces({
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setPlaces(data);
      setHdTitle('会場一覧')
    });
  }, [page]); 


  return (
    <>
      {places == null ? (
        <Loading />
      ) : (
        <MainArea>
          <SearchPlace 
            places={places}
          />
        </MainArea>
      )}
    </>
  );
}