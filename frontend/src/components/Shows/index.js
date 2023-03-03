import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShows } from '../../store/show';
import { NavLink } from 'react-router-dom';

const ShowsIndex = () => {
  const dispatch = useDispatch(),
    shows = useSelector((state) => state.shows.data),
    songs = useSelector((state) => state.songs.data);
  useEffect(() => {
    dispatch(fetchAllShows());
  }, [dispatch]);

  if (!shows) return <h1>hi</h1>;
  return (
    <>
      <ol>
        {Object.keys(shows).map((key) => {
          const show = shows[key];
          return (
            <li key={show.id}>
              <NavLink
                exact
                to={{
                  pathname: `/shows/${show.id}`,
                  state: { show: show, songs: songs },
                }}
              >
                {show.venue}
              </NavLink>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default ShowsIndex;
