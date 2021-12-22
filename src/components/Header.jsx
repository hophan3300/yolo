import React, { useRef, useEffect} from 'react'
import { Link, useLocation ,useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'

import {logouted} from '../redux/apiCalls'
import logo from '../assets/images/Logo-2.png'


const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Tìm kiếm",
        path: "/search"
    },
]


const clickOutsideRef = (content_ref,toggle_ref) => {
   document.addEventListener("mousedown", (e) => {
      // user click toggle
      if(toggle_ref.current && toggle_ref.current.contains(e.target)){
         content_ref.current.classList.add('active')
      }else{
         //user click outside toggle and content
         if(content_ref.current && !content_ref.current.contains(e.target)){
            content_ref.current.classList.remove('active')
         }
      }
   })
	
}

const Header = () => {

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const user = useSelector(state => state.user.currentUser)

    const headerRef = useRef(null)

	 const dispatch = useDispatch()

	 const history = useHistory()

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll")
        };
    }, []);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

	const dropdown_toggle_el = useRef(null)
  	const dropdown_content_el = useRef(null)

  	clickOutsideRef(dropdown_content_el,dropdown_toggle_el)

	const handleLogout = () => {
		logouted(dispatch)
		history.push('/login')
	}


    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                         
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                            <i className='bx bx-cart'></i>
                            </Link>
                        </div>
                           {user ? 
										<div className="header__menu__item header__menu__right__item">
											<div ref={dropdown_toggle_el} className="dropdown">
											<button className="dropdown__toggle">
												<i className="bx bx-user"></i>
											</button>
											<div ref={dropdown_content_el} className="dropdown__content">
                                                    {user.isAdmin && <div  
														className="user__list__item">
														<i className='bx bxs-dashboard'></i>
														<span>Dashboard</span>
													</div>}
													<div 
														onClick={()=>handleLogout()} 
														className="user__list__item"
													>
														<i className="bx bx-log-out-circle bx-rotate-180"></i> 
														<span>Đăng xuất</span>
													</div>
											</div>
      								</div>
										</div>
										: (
											<div className="header__menu__item header__menu__right__item">
												<Link to="/login"><i className='bx bx-user'></i></Link>
											</div>
										)
									}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header