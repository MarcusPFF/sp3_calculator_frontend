import { useParams } from 'react-router';

const NotFound = () => {
    const params = useParams();
    const filepath = params['*'];

    return (
        <div>
            <h2>404 - Not Found</h2>
            <p>The requested path "{filepath}" was not found.</p>
        </div>
    );
}
export default NotFound;