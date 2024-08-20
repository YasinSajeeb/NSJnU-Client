import { useEffect, useState } from "react"

const useModerator = email => {
    const [isModerator, setIsModerator] = useState(false);
    const [isModeratorLoading, setIsModeratorLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://nsjnu-server.vercel.app/members/moderator/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsModerator(data.isModerator);
                    setIsModeratorLoading(false);
                })
        }
    }, [email])
    return [isModerator, isModeratorLoading]
}

export default useModerator;