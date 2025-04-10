import React, { useRef, useState } from "react";
import ReactMarkDown from "react-markdown";
import axios from "axios";
import "./../App"
import { Card2 } from "./Card2";
import { SendIcon } from "./icons/SendIcon";

const AISearch = () => {
    const searchText = useRef();
    const [searchResult, setSearchResult] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAISearch = async () => {
        const prompt = `You are an AI recommendation system named QuickAI. Provide the best response possible for this prompt - ${searchText.current.value}. Never begin your response with a question. Just reply to the best of your ability.`
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/ai`, { prompt }) // gemini api route
            setSearchResult(data.response);
        }
        catch (error) {
            setError("An error occured while fetching a response");
        }
        finally {
            setLoading(false)
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === "Enter") { handleAISearch() };
    }
    return (
        <>
            <div className="bg-stone-700 flex justify-center h-screen">
                <div className="my-auto">
                    <div className=" w-screen text-center p-5 bg-stone-600 text-4xl font-mono fixed top-0 left-1/2 -translate-x-1/2 border">QuickAI</div>
                    <div className="my-auto border-2 border-stone-800 rounded-3xl py-10 px-5 hover:border-blue-500 hover:shadow hover:shadow-xl w-4/5 mx-auto hover:bg-stone-600 sm:w-full transition-all duration-300 ease-in-out">
                        <div className="mb-15 text-2xl">Try <span className="text-3xl text-stone-500 font-bold  hover:text-blue-500 transition-all duration-300 ease-in-out">QuickAI</span> , your Gemini powered assistant. <br/>Just chat like you would with any other AI tool</div>
                        <div className="flex border border-gray-600 p-2 bg-stone-900 rounded-lg h-12">
                            <input
                                type="text"
                                placeholder="What's on your mind today?"
                                className="w-full p-2 bg-stone-900 rounded-lg focus:outline-none text-white outline-none"
                                ref={searchText}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className=" text-white rounded-lg whitespace-nowrap transition duration-200 border-none"
                                onClick={handleAISearch}
                            >
                                <SendIcon />
                            </button>
                        </div>
                        {
                            loading ? (
                                <div className=" text-white my-2 mx-auto p-4 flex justify-center">
                                    <h3>Loading...</h3>
                                </div>
                            ) : (
                                searchResult && (
                                    <div className="text-white my-2 mx-auto p-4">
                                        <ReactMarkDown>{searchResult}</ReactMarkDown>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
};
export default AISearch;