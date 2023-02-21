import React, { useContext, useEffect, useState, } from 'react'
import { Helmet } from "react-helmet"
import { FloatButton } from 'antd'
import CarouselComp from '../../components/carousel/CarouselComp'
import MainCard from '../../components/mainCard/MainCard'
import HisotyStore from '../../components/historyeStore/HisotyStore'
// import BrandMain from '../../components/brandMain/BrandMain'
// import SubscriptionMain from '../../components/subscriptionMain/SubscriptionMain'
import { observer } from "mobx-react-lite"
import { Context } from '../../App'
import { getHitProduct, getNewProduct } from '../../http/productsAPI'
import { getSliderImg } from '../../http/imgAPI'
import { MainPageInfoBlock } from '../../components/mainPageInfoBlock/MainPageInfoBlock'

const MainPage = observer(() => {
  const { dataApp } = useContext(Context)
  const [cardItem, setCardItem] = useState([])
  const [cardItem2, setCardItem2] = useState([])
  const [imgData, setImgData] = useState([])

  useEffect(() => {
    getNewProduct()
      .then(data => {
        setCardItem(data)
      })
    getHitProduct()
      .then(data => {
        console.log('data: ', data)
        setCardItem2(data)
      })
    getSliderImg()
      .then(data => {
        setImgData(data)
      })
  }, [])


  return (
    <>
      <Helmet>
        {/* <title>{dataApp.data['/'].title}</title> */}
        <title>Крупный онлайн-магазин сантехники в Минске</title>
        <meta name="description" content='Первый поставщик качественной недорогой сантехники SOQO в Беларуси.' />
      </Helmet>
      <FloatButton.BackTop />

      <section className='container'>
        <CarouselComp imgData={imgData} />
        <MainCard cardItem={cardItem2} title={'Хиты продаж'} hit={true} />
        <MainCard cardItem={cardItem} title={'Новое поступление'} />
        <MainPageInfoBlock />
        <HisotyStore />
      </section>
    </>
  )
})
export default MainPage