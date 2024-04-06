import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData.js';


function AdvancedSearch() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const submitForm = async (data) => {
        let queryString = `searchBy=${data.searchBy}`;
        if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
        if (data.medium) queryString += `&medium=${data.medium}`;
        queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;
        setSearchHistory(await addToHistory(queryString))
        router.push(`/artwork?${queryString}`);
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)} className="container">
            <Form.Group controlId="q" className="mb-3">
                <Form.Label>Search Query</Form.Label>
                <Form.Control
                    type="text"
                    {...register('q', { required: true })}
                    className={`form-control ${errors.q ? 'is-invalid' : ''}`}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Col md={4}>
                    <Form.Group controlId="searchBy" className="mb-3">
                        <Form.Label>Search By</Form.Label>
                        <Form.Control as="select" {...register('searchBy')} className="form-select">
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="geoLocation" className="mb-3">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control type="text" {...register('geoLocation')} className="form-control" />
                        <Form.Text className="text-muted">
                            Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="medium" className="mb-3">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control type="text" {...register('medium')} className="form-control" />
                        <Form.Text className="text-muted">
                            Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="isHighlight" className="form-check">
                        <Form.Check type="checkbox" {...register('isHighlight')} />
                        <Form.Label className="form-check-label">Highlighted</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="isOnView" className="form-check">
                        <Form.Check type="checkbox" {...register('isOnView')} />
                        <Form.Label className="form-check-label">Currently on View</Form.Label>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Button variant="dark" type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default AdvancedSearch;