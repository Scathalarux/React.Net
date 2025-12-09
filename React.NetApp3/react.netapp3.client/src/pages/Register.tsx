/* eslint-disable no-useless-escape */
import { useState } from "react";
import { useNavigate } from "react-router";

export function Register() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };
    const handleLoginClick = () => {
        navigate("/login");
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setError("");
        event.preventDefault();

        //const passRegex = "/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/";

        if (!email || !password || !confirmPassword) {
            setError("Please, fill in all fields to login correctly");
        
        } else if (password !== confirmPassword) {
            setError("Passwords don't match");
        }
        else {
            fetch("/register", {
                method: "POST",
                headers: { 'Content-Type': "application/json;charset=utf-8" },
                body: JSON.stringify({ email: email, password: password }),
            }).then(result => {
                console.log(result);

                if (result.ok) {
                    setError("Successful register");

                    //para asegurarnos que se se recarga todo por completo
                    window.location.href = "/";
                } else {
                    setError("Error registering");
                }

            }).catch(error => {
                console.log(error);
                setError("Error registering");
            })
        }
    };
    return (<div className="font-sans m-auto max-w-60 bg-sky-100 flex flex-col justify-center items-center p-4 rounded-2xl inset-0">
        <h3 className="text-4xl">Register</h3 >
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-start mx-3 mt-8 mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} className="bg-white rounded-md h-8 my-2" />
            </div>
            <div className="flex flex-col justify-center items-start mx-3 my-2">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={handleChange} className="bg-white rounded-md h-8 my-2" />
            </div>
            <div className="flex flex-col justify-center items-start mx-3 my-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange} className="bg-white rounded-md h-8 my-2" />
            </div>
            <div className="flex justify-evenly items-start mx-3 my-2">
                <button type="submit" className=" text-white px-3 py-2 rounded-xl bg-sky-600 hover:cursor-pointer hover:bg-sky-500">Register</button>
                <button type="button" onClick={handleLoginClick} className=" text-black px-3 py-2 rounded-xl bg-neutral-200 hover:cursor-pointer hover:bg-neutral-100">Login</button>
            </div>
        </form>
        {error && <p className="text-xs text-red-800">{error}</p>}
    </div>
    );
}