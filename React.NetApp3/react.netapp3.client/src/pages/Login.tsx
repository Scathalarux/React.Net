import { useState } from "react";
import { useNavigate } from "react-router";

export function Login() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [rememberMe, setRememberMe] = useState<boolean>();

    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberMe") setRememberMe(event.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setError("");
        event.preventDefault();

        if (!email || !password) {
            setError("Please, fill in all fields to login correctly");
        } else {
            let loginUrl = "";

            if (rememberMe) {
                loginUrl = "/login?useCookies=true";
            } else {
                loginUrl = "/login?useSessionCookies=true";
            }

            fetch(loginUrl, {
                method: "POST",
                headers: { 'Content-Type': "application/json;charset=utf-8" },
                body: JSON.stringify({ email: email, password: password }),
            }).then(result => {
                console.log(result);

                if (result.ok) {
                    setError("Successful login");

                    //para asegurarnos que se se recarga todo por completo (+ establecimiento de cookies)
                    window.location.href = "/";
                } else {
                    setError("Error logging in");
                }

            }).catch(error => {
                console.log(error);
                setError("Error logging in");
            })
        }
    };
    return (
        <div className="font-sans m-auto bg-sky-100 max-w-60 flex flex-col justify-center items-center p-4 rounded-2xl inset-0">
            <h3 className="text-4xl">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-start mx-3 mt-8 mb-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleChange} className="bg-white rounded-md h-8 my-2"  />
                </div>
                <div className="flex flex-col justify-center items-start mx-3 my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange} className="bg-white rounded-md h-8 my-2" />
                </div>
                <div className="flex justify-start gap-3 items-center mx-3 my-4">
                    <input type="checkbox" name="rememberMe" id="rememberMe" checked={rememberMe} onChange={handleChange} className="hover:cursor-pointer" />
                    <label htmlFor="rememberMe" className="text-sm">Remember me</label>
                </div>
                <div className="flex justify-evenly items-start mx-3 my-2">
                    <button type="submit" className=" text-white px-3 py-2 rounded-xl bg-sky-600 hover:cursor-pointer hover:bg-sky-500">Login</button>
                    <button type="button" onClick={handleRegisterClick} className=" text-black px-3 py-2 rounded-xl bg-neutral-200 hover:cursor-pointer hover:bg-neutral-100">Register</button>
                </div>
            </form>
            {error && <p className="text-xs text-red-800">{error}</p>}
        </div>);
}