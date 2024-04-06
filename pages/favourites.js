import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';


function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    if (favouritesList.length === 0) {
        return (
            <Card>
                <Card.Body>
                    <h4>Nothing Here</h4>
                    Try adding some new artwork to the list.
                </Card.Body>
            </Card>
        );
    }

    return (
        <Container>
            <Row>
                {favouritesList.map((objectID) => (
                    <Col lg={3} key={objectID}>
                        <ArtworkCard objectID={objectID} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Favourites;