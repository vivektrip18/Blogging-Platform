import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@vivektrip/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const [postInput, setPostInput] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    })
    const navigate = useNavigate();

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup":"signin"}`,postInput);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        } catch (error) {
            alert("Error while signing up");
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-8">
                    <div className="font-bold text-3xl">
                        {type === "signup" ? "Create an account": "Login to your account"}
                    </div>
                    <div className="text-slate-500">
                        {type === "signup" ? "Already have an account?": "Don't have an account?"}
                        <Link className=" pl-2 underline" to={type==="signup" ? "/signin":"/signup"}>{type==="signup" ? "Login": "Signup"}</Link>
                    </div>
                </div>
                <div className="pt-6">
                    {type === "signup" ? <LabelledInput label="First Name" placeholder="Vivek Tripathi" onChange={(e) => {
                        setPostInput({
                            ...postInput,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Username" placeholder="vivek@gmail.com" onChange={(e) => {
                        setPostInput({
                            ...postInput,
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" placeholder="123456" onChange={(e) => {
                        setPostInput({
                            ...postInput,
                            password: e.target.value
                        })
                    }} />
                    <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup" ? "Signup" : "Signin"}  </button>
                </div>
                

            </div>

        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900 dark:text-white pt-3">{label}</label>
        <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}