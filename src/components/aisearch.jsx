import React, { useRef, useState } from "react";
import ReactMarkDown from "react-markdown";
import axios from "axios";


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
            const {data} = await axios.post("/api/ai", {prompt}) // gemini api route
          
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
        <div className="container-fluid py-5 w-75">
            <h2 className="text-center">QuickAI</h2>
            <div className="d-flex">
                <input type="text" placeholder="What's on your mind today?" className="form-control" ref={searchText} onKeyDown={handleKeyDown} />
                <button className="btn btn-info text-nowrap" onClick={handleAISearch}>Search</button>
            </div>
            {
                loading ? (
                    <div className="border border-1 border-secondary rounded my-2 p-4 justify-content-md-center">
                        <h3 >Loading...</h3>
                    </div>
                ) : (
                    searchResult && (
                        <div className="border border-1 border-secondary rounded my-2 p-4">
                            <ReactMarkDown>{searchResult}</ReactMarkDown>
                        </div>
                    )
                )
            }
        </div>
    )
};

export default AISearch;