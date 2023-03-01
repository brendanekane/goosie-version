import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShows } from '../../store/show';
import { NavLink, Route, useRouteMatch, Switch } from 'react-router-dom';
import ShowPage from '../ShowPage';

const ShowsIndex = () => {
  const dispatch = useDispatch(),
    shows = useSelector((state) => state.shows),
    { path, url } = useRouteMatch();

  useEffect(() => {
    dispatch(getAllShows());
  }, [dispatch]);

  console.log(path, url);

  if (!shows) return <h1>hi</h1>;
  return (
    <>
      <ol>
        {Object.keys(shows).map((key) => {
          const show = shows[key];
          return (
            <li>
              <NavLink
                exact
                to={{
                  pathname: `/shows/${show.id}`,
                  state: { show: show },
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
