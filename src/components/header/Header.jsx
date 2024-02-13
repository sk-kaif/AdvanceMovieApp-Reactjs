import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from '../../assets/movix-logo.svg'

const Header = () => {
  const [query,setQuery] = useState("")

  const [show,setShow] = useState('top')
  const [lastScrollY,setLastScrollY] = useState(0)

  const [mobileMenu,setMobileMenu] = useState(false)
  const [showSearch,setShowSearch] = useState("")

  const navigate = useNavigate()
  const location = useLocation()




  // for reset scroll to top
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])


  // for scroll active navbar
  useEffect(()=>{
    window.addEventListener('scroll',controlNavbar)
    return ()=> window.removeEventListener('scroll',controlNavbar)
  },[lastScrollY])

  const controlNavbar=()=>{
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow('hide')
      } else{
        setShow('show')
      }
    }else{
      setShow('top')
    }
    setLastScrollY(window.scrollY)
  }

  // forMobileSearchBar
  const searchQueryHandler=(e)=>{
    if(e.key === 'Enter' && query.length > 0){
      navigate(`/search/${query}`)
      setTimeout(()=>{
        setShowSearch(false)
      },1000)
    }

  }

  // openSearch
  const openSearch=()=>{
    setMobileMenu(false)
    setShowSearch(true)
  }

  // openMobileMenu
  const openMobileMenu=()=>{
    setMobileMenu(true)
    setShowSearch(false)
  }

  // for Navigate From Link
  const navigatorLink=(type)=>{
    if(type === "movie"){
      navigate("/explore/movie")
    }
    else{
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }



  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=> navigate("/")}>
          <img src={logo}  />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigatorLink("movie")}>Movie</li>
          <li className="menuItem" onClick={()=>navigatorLink("tv")}>Tv Show</li>
          <li className="menuItem" onClick={openSearch}><HiOutlineSearch /></li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={()=>openSearch()}/>
          {mobileMenu 
            ? <VscChromeClose onClick={()=>setMobileMenu(false)} /> 
            : <SlMenu onClick={openMobileMenu} />
          }
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={()=>setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  )
}

export default Header