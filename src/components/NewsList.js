 import { useState, useEffect } from "react";
 import styled from "styled-components";
 import NewsItem from "./NewsItem";
 import axios from 'axios';

 const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

    const NewsList = () => {
        const [articles, setArticles] = useState(null);
        const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=b0da0a64c2914a4f890b183d90b8d1be',
                );
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    if (!articles) {
        return null;
    }

    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};
export default NewsList;