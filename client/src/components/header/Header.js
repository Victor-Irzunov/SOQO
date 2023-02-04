import React, { useContext, useEffect, useState } from 'react'
import HeaderAddress from './header-address/HeaderAddress'
import { Affix, Button, Typography, Popover } from 'antd'
import { MenuOutlined, CloseOutlined, PhoneOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons'
import HeaderMenu from './headerMenu/HeaderMenu'
import BadgeIconHeard from '../badgeIcon/badgeIconHeard/BadgeIconHeard'
import BadgeIconBasked from '../badgeIcon/BadgeIconBasket'
import BadgeIconVesy from '../badgeIcon/badgeIconVesy/BadgeIconVesy'
import { Context } from '../../App'
import { motion, AnimatePresence } from "framer-motion"
import { observer } from "mobx-react-lite"
import { getAllBasketUser } from '../../http/basketAPI'
import { useScreens } from '../../Constants/constants'
import logo from '../../images/logo/Logo.png'
import MenuMobil from './menuMobil/MenuMobil'
import MenuLinkMobil from './menuLinkMobil/MenuLinkMobil'
import { Link, NavLink } from 'react-router-dom'
import ModalComponent from '../modalLoginRegistrat/ModalComponent'
import { ContentAdmin, ContentCourier } from './header-address/headerTimeTel/HeaderTimeTel'
import { Content } from '../../content/Content'
const { Paragraph } = Typography

const Header = observer(() => {
  const { dataApp, user, dataProducts } = useContext(Context)
  const [isAffix, setIsAffix] = useState(false)
  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const screens = useScreens()
  const [hover, setHover] = useState();
  // console.log('screens:', screens)
  // console.log('dataApp: ',dataApp.viewLength)
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }

  useEffect(() => {
    let cookie = {}
    decodeURIComponent(document.cookie).split(';').forEach(el => {
      let [k, v] = el.split('=')
      cookie[k.trim()] = v
    })
    if (cookie['ComparisonList']) {
      let arr = JSON.parse(cookie['ComparisonList'])
      dataApp.setVesyLength(arr.length)
      dataApp.setVesyArr(arr)
    }
  }, [dataApp.vesyLength])

  useEffect(() => {
    let cookie = {}
    decodeURIComponent(document.cookie).split(';').forEach(el => {
      let [k, v] = el.split('=')
      cookie[k.trim()] = v
    })
    if (cookie['view_product']) {
      let arr = JSON.parse(cookie['view_product'])
      dataApp.setViewLength(arr.length)
      dataApp.setViewArr(arr)
    }
  }, [dataApp.viewLength])

  useEffect(() => {
    let cookie = {}
    decodeURIComponent(document.cookie).split(';').forEach(el => {
      let [k, v] = el.split('=')
      cookie[k.trim()] = v
    })
    if (cookie['LikedList']) {
      let arr = JSON.parse(cookie['LikedList'])
      dataApp.setLikedLength(arr.length)
      dataApp.setLikedArr(arr)
    }
  }, [dataApp.likedLength])

  useEffect(() => {
    if (!user.isAuth) {
      let cookie = {}
      decodeURIComponent(document.cookie).split(';').forEach(el => {
        let [k, v] = el.split('=')
        cookie[k.trim()] = v
      })
      if (cookie['BasketProduct']) {
        let arr = JSON.parse(cookie['BasketProduct'])
        dataApp.setBasketLength(arr.length)
        dataApp.setBasketArr(arr)
      }
    } else {
      getAllBasketUser()
        .then(data => {
          dataApp.setBasketLength(data.length)
          dataProducts.setDataBasket(data)
        })
    }
  }, [dataApp.basketLength])

  const handleMouseLeave = () => {
    setHover(false);
  }


  const items = []
  dataApp.dataMenu.forEach(el => {
    const type = []
    el.types.forEach((elem) => {
      type.push({
        label: (
          <NavLink to={`/${el.link}/${elem.link}`} className='text-white no-underline' >
            {elem.name}
          </NavLink>
        ),
        key: elem.link + el.id
      })
    })
    items.push({
      label: (<NavLink to={`/${el.link}`} className='text-white no-underline' >
        {el.name}
      </NavLink>),
      key: el.link + el.id,
      children: type
    })
  })

  return (
    <>
      {screens.lg ?
        <>
          <HeaderAddress />
          <Affix
            offsetTop={0}
            className='z-50 relative'
            onChange={(affixed) => setIsAffix(affixed)}
          >
            <header
              className={`pt-2 pb-2 absolute top-0 left-0 right-0 z-50`}
              // className={isAffix ? 'pt-1 pb-1' : `pt-2 pb-2`}
              style={{
                background: '#3E3E44',
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className='container'>
                <nav className=''>
                  <HeaderMenu isAffix={isAffix} setHover={setHover} />
                </nav>
              </div>

              <AnimatePresence>
                {
                  hover &&
                  (<motion.div
                    initial={{ heigth: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='w-full mt-2'
                    style={{ borderTop: '1px solid #ccc', zIndex: '100000' }}
                  >
                    <div className='container'>

                      <div className='flex justify-evenly text-white pt-10 text-sm border-t-white font-light'>
                        {items.map(el => {
                          return (
                            <dl key={el.key}>
                              <dt
                                className='text-base mb-3'
                                onClick={handleMouseLeave}
                              >{el.label}</dt>
                              {el.children.map(elem => {
                                return (
                                  <dd
                                    key={elem.key}
                                    onClick={handleMouseLeave}
                                  >{elem.label}</dd>
                                )
                              })}
                            </dl>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>)
                }
              </AnimatePresence>
            </header>
          </Affix>
        </>
        :
        <Affix
          offsetTop={0}
          className='z-10'
        >
          <div className={`duration-500 ${isActiveMenu ? 'h-screen' : 'h-12'}
         bg-[#3E3E44] opacity-90 pt-2 pb-2 px-3
         absolute left-0 right-0 top-0
         overflow-y-auto
         `}>
            <div className='container flex justify-between items-center z-50'>
              <div className='z-50'>
                {
                  isActiveMenu ?
                    <CloseOutlined
                      className='text-3xl text-white pointer'
                      onClick={() => setIsActiveMenu(i => !i)}
                    />
                    :
                    <MenuOutlined
                      className='text-3xl text-white pointer'
                      onClick={() => setIsActiveMenu(i => !i)}
                    />
                }
              </div>
              <div className='z-50'>
                <Link to='/'>
                  <img src={logo} className='w-28 ml-6 xz:hidden xy:block' />
                </Link>
              </div>
              <div className='flex justify-between items-center z-50'>
                <Button type='link' href='tel:80445842068' className='pr-2'>
                  <PhoneOutlined className='text-white text-2xl rotate-90' />
                </Button>

                {user.isAuth
                  ?
                  <Popover
                    placement="bottomRight"
                    content={user.userData.role === 'ADMIN' && ContentAdmin || user.userData.role === 'COURIER' && ContentCourier || user.userData.role === 'USER' && <Content />}
                    trigger="click"
                  >
                    <UserOutlined className='text-white text-2xl mr-3' />
                  </Popover>
                  :
                  <UserOutlined
                    className='text-white text-2xl mr-3'
                    onClick={showModal}
                  />
                }
                <BadgeIconVesy mobil={true} />
                <BadgeIconHeard mobil={true} />
                <BadgeIconBasked mobil={true} />
              </div>
            </div>
            <div className={`container duration-500	${isActiveMenu ? 'translate-y-0' : '-translate-y-[150%]'} flex flex-col justify-between`}>
              <div className={`pt-8`}>
                <MenuMobil setIsActiveMenu={setIsActiveMenu} />
              </div>
              <div className={``}>
                <MenuLinkMobil setIsActiveMenu={setIsActiveMenu} />
              </div>
              <div className={`flex justify-center items-center mt-10`}>
                <Button type='link'
                  className='text-base text-white'
                  icon={<PhoneOutlined className='text-base rotate-90' />} href='tel:80445842068'>
                  +375 (44) 584 20 68
                </Button>
              </div>
            </div>
            <div className={`flex justify-center items-center mt-4`}>
              <HistoryOutlined className='text-base mr-1 text-white' />
              <Paragraph
                className='text-white ml-2'
              >
                08:30-20:00 пн-пт
              </Paragraph>
              <Paragraph
                className='text-white ml-2'
              >
                10:00-19:00 сб-вс
              </Paragraph>
            </div>
          </div>

        </Affix>
      }
      <ModalComponent open={open} setOpen={setOpen} />
    </>
  )
})

export default Header