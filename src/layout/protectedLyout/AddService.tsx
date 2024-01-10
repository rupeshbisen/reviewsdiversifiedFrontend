import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddService() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    });

    return (
        <div>
            {/* Your component content */}
        </div>
    );
}