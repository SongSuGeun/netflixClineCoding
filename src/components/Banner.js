import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import axios from '../api/axios';
import './Banner.css';
import styled from 'styled-components';

export default function Banner() {
    const [movie, setMovie] = useState([]);

    // npm styled component를 사용
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영중인 여러 영화 정보를 가져오기
        const request = await axios.get(requests.fetchNowPlaying);
        console.log(request.data.results[Math.floor(Math.random() * 20)]);

        // 영화정보중에서 랜덤으로 하나 고르기
        const movieRandomId = Math.floor(Math.random() * request.data.results.length);
        console.log("MOVIE RANDOME ID : ", movieRandomId);

        const movieId = await request.data.results[movieRandomId].id;
        console.log(movieId);

        // 특정 영화 상세 정보(비디오) 가져오기
        // const result = await axios.get(`movie/${movieId}`, {
        //     params: { append_to_response: "videos" },
        // });

        // console.log("RESULT : ",result);

        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: "videos" },
        });
        console.log("movieDetail 정보 : ", movieDetail);

        setMovie(movieDetail);
        console.log("MOVIE 정보 : ", movie);
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
  
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;

    const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  `;

    const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
  `;

    if (!isClicked) {
        return (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",

                }}>
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {movie.title || movie.name || movie.original_name}
                    </h1>

                    <div className="banner__buttons">
                        <button className="banner__button play" onClick={() => {
                            setIsClicked(true)
                        }}>Play</button>
                        <button className="banner__button info">More Information</button>
                    </div>
                    <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
                </div>
                <div className="banner-fadeBottom" />
            </header>
        )
    } else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop&`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        allowfullscreen
                    />
                </HomeContainer>
            </Container>
        );
    }
}