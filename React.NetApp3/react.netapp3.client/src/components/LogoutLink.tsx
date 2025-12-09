import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type LogoutLinkProps = {
    children: ReactNode
}
export function LogoutLink({ children }: LogoutLinkProps) {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: ""
        }).then(response => {
            if (response.ok) {
                navigate("/login");
            }
        }).catch(error => console.log(error));

    }
    return (<a href="" onClick={handleClick}>{children}</a>);
}