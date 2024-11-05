import {useEffect, useState} from 'react';
import {IUser} from '../models/IUser';
import {getUser} from "../api/userActions";

function useUser() {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUser();
                setUser(fetchedUser);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    return {user};
}

export default useUser;
