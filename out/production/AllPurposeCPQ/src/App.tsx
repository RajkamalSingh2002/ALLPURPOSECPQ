import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        api.get<string>("/hello")
            .then((res) => setMessage(res.data))
            .catch(() => setMessage("Backend not reachable"));
    }, []);

    return <h1>{message}</h1>;
}

export default App;
