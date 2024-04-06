import { useRouter } from 'next/router';
import { ListGroup, Button, Card } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { removeFromHistory } from '@/lib/userData.js';

function History() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    if(!searchHistory) return null;
    let parsedHistory = [];
    
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (index) => {
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    };

    const handleRemoveClick = (index) => {
        return () => {
            removeHistoryClicked(index);
        };
      };

    if (parsedHistory.length === 0) {
        return (
            <Card>
                <Card.Body>
                    <h4>Nothing Here</h4>
                    Try searching for some artwork.
                </Card.Body>
            </Card>
        );
    }

    return (
        <ListGroup>
            {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item key={index} onClick={e => historyClicked(e, index)} className={styles.historyListItem}>
                    {Object.keys(historyItem).map(key => (
                        <span key={key}>{key}: <strong>{historyItem[key]}</strong>&nbsp;</span>
                    ))}
                    <Button className="float-end" variant="danger" size="sm" onClick={handleRemoveClick(index)}>&times;</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}


export default History;