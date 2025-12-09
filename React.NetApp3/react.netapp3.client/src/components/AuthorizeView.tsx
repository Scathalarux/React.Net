import { createContext, useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";

const UserContext = createContext({});

type User = {
    email: string
}
type AuthorizeViewProps = {
    children: ReactNode
}
const emptyUser = {
    email: ""
}
function AuthorizeView({ children }: AuthorizeViewProps) {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>(emptyUser);

    useEffect(() => {
        //Get the cookie value
        let retryCount = 0;
        const maxRetries = 10;
        const delay = 1000; //in ms

        function wait(delay: number) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async function fetchWithRetry(url: string, options: any) {
            try {
                const response = await fetch(url, options);

                if (response.status == 200) {
                    console.log("Authorized");

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const json: any = response.json();
                    setUser({ email: json.email });
                    setAuthorized(true);
                    return response;

                } else if (response.status == 401) {
                    console.log("Unauthorized");

                    return response;

                } else {

                    throw new Error("" + response.status);
                }
            } catch (e) {
                retryCount++;

                if (retryCount > maxRetries) {
                    throw e;
                } else {
                    await wait(delay);
                    return fetchWithRetry(url, options);
                }
            }
        }

        fetchWithRetry("/pingauth", { method: "GET" })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);



    if (loading) {
        return (
            <>
                <p className="text-xl">Loading...</p>
            </>);
    } else {
        if (authorized && !loading) {
            return (
                <>
                    <UserContext.Provider value={user}>{children}</UserContext.Provider>
                </>);
        } else {
            return (
                <>
                    <Navigate to="/login"></Navigate>
                </>);
        }
    }

}
export default AuthorizeView;