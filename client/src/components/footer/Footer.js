import React, { useContext, useEffect, useState } from 'react'
import {
  Image,
  Empty
} from 'antd'
import { Context } from '../../App'
import { NavLink, Link } from 'react-router-dom'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'
import telegram from '../../images/social-icon/telegram.svg'
import viber from '../../images/social-icon/viber.svg'
import instagram from '../../images/social-icon/instagram.svg'
import img from '../../images/footer/1.webp'
import img1 from '../../images/footer/2.webp'
import { useScreens } from '../../Constants/constants'


function Footer() {
  const { dataApp } = useContext(Context)
  const [menuItems, setMenuItems] = useState([])
  const [menuInfoPages, setMenuInfoPages] = useState([])
  const screens = useScreens()
  
  useEffect(() => {
    const itemsInfo = []
    if (dataApp.infoPages.length) {
      dataApp.infoPages.forEach(el => {
        itemsInfo.push(
          {
            label: (<NavLink
              to={`/info/${el.link}`} className='text-white' >
              {el.name}
            </NavLink>),
            key: el.link + el.id
          },
        )
      })
    }
    setMenuInfoPages(itemsInfo)
  }, [dataApp.infoPages])

  useEffect(() => {
    const items = []
    if (dataApp.dataMenu.length) {
      dataApp.dataMenu.forEach(el => {
        const type = []
        el.types.forEach((elem) => {
          type.push(
            {
              label: (
                <Link to={`/${el.link}/${elem.link}`} >
                  {elem.name}
                </Link>
              ),
              key: elem.link + el.id
            }
          )
        })
        items.push({
          label: (<NavLink to={`/${el.link}`} className='text-white' >
            {el.name}
          </NavLink>),
          key: el.link + el.id,
          children: type
        })
      })
    }
    setMenuItems(items)
  }, [dataApp.dataMenu])




  return (
    <footer className='mt-auto pt-12 bg-[#3E3E44]' id='contact'>
      <div className='container'>

        <div className='flex justify-between items-start text-white flex-wrap'>

          <div className='font-light text-base xs:mb-4'>
            <p className='border-b border-t-transparent border-l-transparent border-r-transparent border-white/60 border-solid font-light text-lg'>
              Информация
            </p>
            <ul className='no-underline list-none pl-0'>
              {menuInfoPages.length ?
                menuInfoPages.map(el => {
                  return (
                    <li key={el.id} className='no-underline list-none'>
                      {el.label}
                    </li>
                  )
                })
                :
                <Empty />
              }
            </ul>
          </div>

          <div className='font-light text-base xs:mb-4 xx:mb-4 xy:mb-4 xz:mb-4 xm:mb-0'>
            <p className='border-b border-t-transparent border-l-transparent border-r-transparent border-white/60 border-solid text-lg'>
              Контакты
            </p>
            <p>
              <PhoneOutlined className='mr-3 rotate-90 text-lg' />
              +375 (44) 584 20 68
            </p>
            <p>
              <MailOutlined className='mr-3 text-lg' />
              soqo.by@gmail.com
            </p>
          </div>

          <div className='font-light text-base xs:mb-4 xx:mb-4 xy:mb-4 xz:mb-4 xm:mb-0'>
            <p className='border-b border-t-transparent border-l-transparent border-r-transparent border-white/60 border-solid font-light text-lg'>
              Адрес
            </p>
            <p>
              Магазин: г.Минск, ул. Кульман, 5Б. Павильон 195
            </p>
          </div>
          <div className='font-light text-base xs:mb-4 xx:mb-4 xy:mb-4 xz:mb-4 xm:mb-0'>
            <p className='border-b border-t-transparent border-l-transparent border-r-transparent border-white/60 border-solid font-light text-lg'>
              График работы
            </p>
            <p>
              Вт-Вс - 10:00 - 20:00
            </p>
            <p>
              Пн - выходной
            </p>
          </div>

          <div className='font-light text-base xs:mb-4 xx:mb-4 xy:mb-4 xz:mb-4 xm:mb-0'>
            <p className='border-b border-t-transparent border-l-transparent border-r-transparent border-white/60 border-solid font-light text-lg'>
              Мы в соц. сетях
            </p>
            <div className='flex justify-evenly items-center pt-3'>
              <a href='https://www.instagram.com/psy_ir/' target='_blank' >
                <Image src={instagram} width='25px' />
              </a>
              <a href='https://t.me/ps' target='_blank' >
                <Image src={telegram} width='25px' />
              </a>
              <a href='viber://add?number=375445842068' target='_blank' >
                <Image src={viber} width='25px' />
              </a>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center mt-10 xs:flex-col xx:flex-col xy:flex-col xz:flex-col xm:flex-row' id='about'>
          <div className='mr-1 w-full'>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A7e323f30bc6aed08c1350f3e11e1b044fec4886e2ab6604d88ce6cae20edca48&amp;source=constructor"
              width={(screens.xl && '1050px') || (screens.lg && '840px') || (screens.md && '610px') || (screens.sm && '425px') || (screens.xs && '100%')}
              height="406"
              // frameborder="0"
            >
            </iframe>
          </div>

          <div className='h-[406px] xm:mt-0 flex xm:flex-col justify-between items-center xs:flex-row xs:mt-7 xx:mt-7 xy:mt-7 xz:mt-7'>
            <div className='xm:w-32 xs:w-[45%] xx:w-[45%] xy:w-[45%] xz:w-[45%]'>
              <Image src={img} className='' />
            </div>
            <div className='xm:w-32 xs:w-[45%] xx:w-[45%] xy:w-[45%] xz:w-[45%]'>
              <Image src={img1} />
            </div>
          </div>
        </div>

        <div className='mt-6 text-sm text-white font-light border-b'>
          <p>ООО “Чайна Сантехника”</p>
          <p>Юр.адрес: 223021, Минская обл., Минский р-н, Щомыслицкий с/с, район агрогородка Озерцо, тракт Меньковский, 2. Пом. 781. Зарегистрирован в торговом реестре 29 июля 2022 года в администрации Советского района города Минска № 538673. Свидетельство о регистрации выдано 27 января 2022 года УНП 693159769</p>
          <p className='mt-3'>
            Указанные контакты также являются контактами для связи по вопросам покупателей о нарушении их прав. Номер телефона работников местных исполнительных и распорядительных органов по месту государственной регистрации ООО “Чайна Сантехника”, уполномоченных рассматривать обращения покупателей: +375 17 500 41 25.
          </p>
        </div>

        <div
          className='mt-6'
        >
          <p className='text-slate-50/50 text-xs' >Copyright © 2023 | Created & Designed By
            <a href='https://vi-tech.by' target='_blank' rel="noreferrer" className='text-blue-500/100 no-underline'> VI:TECH</a>
          </p>
        </div>
      </div>

    </footer>
  )
}
export default Footer

