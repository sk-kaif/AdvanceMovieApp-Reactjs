import { useState,useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {getApiConfiguration,getGenres} from './store/homeSlice'
import { fetchDataFromApi } from "./utils/api"

import {Header,Footer} from './components/compoIndex'
import {Home,Details,SearchResult,Explore,PageNotFound} from './pages/pagesIndex'




const App = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(()=>{
    fetchApiConfig()
    allGenresCall()
  },[])

  // for fetching PosterImg
  const fetchApiConfig=async()=>{
    const res = await fetchDataFromApi('/configuration')
    const url = {
      backdrop : res.images.secure_base_url + 'original',
      poster : res.images.secure_base_url + 'original',
      profile : res.images.secure_base_url + 'original',
    } 
    dispatch(getApiConfiguration(url))
  }

  // for fetch Genre
  const allGenresCall=async()=>{
    const promises = []
    const endPoints = ['tv','movie']
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({genres})=>{
      return genres.map((item) => (allGenres[item.id] = item));
    })

    dispatch(getGenres(allGenres))
  }


  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}
export default App

