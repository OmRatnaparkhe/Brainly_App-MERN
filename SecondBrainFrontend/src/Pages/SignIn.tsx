import { useRef } from "react";
import { InputBox } from "../components/Input";
import { Button } from "../components/UI/button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", { username, password });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-purple-300 px-4">
            <div className="bg-white rounded-lg w-full max-w-4xl flex flex-col md:flex-row shadow-lg">
                {/* Left Section - Image (Hidden on small screens) */}
                <div className="hidden md:flex w-1/2 justify-center items-center p-6 border-r border-gray-300">
                    <img className="w-full rounded-lg shadow-md" 
                         src="https://plus.unsplash.com/premium_vector-1732660552503-80f0bd206ac1?q=80&w=800&auto=format&fit=crop" 
                         alt="Signin Illustration" />
                </div>

                {/* Right Section - Form */}
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-8">
                    <div className="text-violet-600 font-bold text-3xl mb-4 text-center">A Second Brain</div>
                    <div className="text-gray-600 text-xl font-bold mb-4 text-center">Welcome Back</div>
                    <div className="bg-gray-100 p-6 py-8 rounded-lg w-full max-w-sm">
                        <InputBox type="text" reference={usernameRef} placeholder="Username" />
                        <InputBox type="password" reference={passwordRef} placeholder="Password" />
                        <Button onClick={signin} variant="primary" text="Sign In" size="sm" fullWidth={true} loading={false} />
                    </div>
                    <div className="text-gray-500 mt-3 text-sm">
                        <a className="underline" href="/signup">Don't have an account? Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
