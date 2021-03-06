import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MainArea, Loading, EventDetail, TabArea, StyledTabs, StyledTab} from "../../components";
import { getEvent, getEventSches } from "../../apis";


export function EventDetailPage({ setHdTitle }) {
  
  const [event, setEvent] = useState(null);
  const [sches, setSches] = useState(null);
  const [index, setIndex] = useState(0);

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getEventSches(params.eventId).then((data) =>{ 
      if (!unmounted) {
        setSches(data);
      }
    });
    getEvent(params.eventId).then((data) => {
      if (!unmounted) {
        setEvent(data);
        setHdTitle(data.name);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [params.eventId]);

  return (
    <>
      {event == null ? (
        <Loading />
      ) : (
        <>
          <TabArea>
            <StyledTabs
              value={index}
              indicatorColor="primary"
            >
              <StyledTab label="イベント情報" />
            </StyledTabs>
          </TabArea>
          <MainArea>
            <EventDetail
              event = {event}
              sches = {sches}
            />
          </MainArea>
        </>
      )}
    </>
  );
}
