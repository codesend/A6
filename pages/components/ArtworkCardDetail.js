import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { addToFavourites, removeFromFavourites} from '@/lib/userData';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';

function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList])

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '22rem' }}>
        {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
        <Card.Body>
          <Card.Title>{data.title || 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>{data.objectDate || 'N/A'}
            <br />
            <strong>Classification: </strong>{data.classification || 'N/A'}
            <br />
            <strong>Medium: </strong>{data.medium || 'N/A'}
            <br />
            <br />
            <strong>Artist: </strong>{data.artistDisplayName || 'N/A'}
            {' ( '}{data.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank">wiki</a>}{' )'}
            <br />
            <strong>Credit Line: </strong>{data.creditLine || 'N/A'}
            <br />
            <strong>Dimensions: </strong>{data.dimensions || 'N/A'}
            <br />
            <br />
            <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ArtworkCardDetail;