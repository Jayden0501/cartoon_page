import { useQuery } from 'react-query';
import { React, useEffect, useState } from 'react';
import Character from './Character';

const Characters = () => {
  const [page, setPage] = useState(1);
  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };

  const { data, status } = useQuery(['characters', page], fetchCharacters, {
    keepPreviousData: true,
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>error</div>;
  }
  console.log(data);
  return (
    <div className='characters'>
      {data.results.map((character) => (
        <Character character={character} />
      ))}
      <div>
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          prev
        </button>
        <button
          disabled={data.info.next === null}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};
export default Characters;
