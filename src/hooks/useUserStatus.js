import { useEffect, useState } from "react";

const useUserStatus = (email) => {
    const [isUserStatus, setIsUserStatus] = useState(false);
    const [isUserStatusLoading, setIsUserStatusLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://nsjnu-server.vercel.app/members/email/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsUserStatus(data.isUserStatus);
                    setIsUserStatusLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user status:', error);
                    setIsUserStatusLoading(false);
                });
        } else {
            setIsUserStatusLoading(false);
        }
    }, [email]);

    return [isUserStatus, isUserStatusLoading];
};

export default useUserStatus;
