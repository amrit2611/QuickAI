import React, { useRef, useState } from "react";
import ReactMarkDown from "react-markdown";
import axios from "axios";
import { Button } from "./ui/button";


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
            <div className="w py-5 px-10 mx-auto mt-40" >
                <div className="mb-6 text-center p-3 text-4xl font-mono">QuickAI</div>
                <div className="flex mx-auto w-4/6 border border-black rounded-lg ">
                    <input
                        type="text"
                        placeholder="What's on your mind today?"
                        className="flex-grow p-2 pl-4 bg-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ref={searchText}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className=" text-white rounded-lg whitespace-nowrap hover:bg-blue-600 transition duration-200 border min-w-20"
                        onClick={handleAISearch}
                    >
                        Search
                    </button>
                </div>
                {
                    loading ? (
                        <div className="border border-gray-400 rounded-lg w-4/6 my-2 mx-auto p-4 flex justify-center">
                            <h3>Loading...</h3>
                        </div>
                    ) : (
                        searchResult && (
                            <div className="border border-gray-400 rounded-lg w-4/6 my-2 mx-auto p-4 flex">
                                <ReactMarkDown>{searchResult}</ReactMarkDown>
                            </div>
                        )
                    )
                }
            </div>
        </>
    )
};
export default AISearch;