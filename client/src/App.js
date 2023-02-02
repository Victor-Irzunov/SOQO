import React, { createContext, useState, useEffect } from 'react'
import './App.css'
import { Spin, ConfigProvider, Affix,theme } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import UserStore from './store/UserStore'
import DataStore from './store/DataStore'
import ProductsStore from './store/ProductsStore'
import Header from './components/header/Header'
import BreadCrumbComp from './components/breadcrumb/BreadcrumbComp'
import MainPage from './pages/main/MainPage'
import ErrorPage from './pages/error/ErrorPage'
import Footer from './components/footer/Footer'
import ProductPage from './pages/productPage/ProductPage'
import { observer } from "mobx-react-lite"
import { check } from './http/userAPI'
import ResultComp from './components/result/ResultComp'
import AdminPage from './pages/admin/AdminPage'
import locale from 'antd/es/locale/ru_RU'
import { categoryType } from './http/productsAPI'
import UniversalPage from './pages/universal/UniversalPage'
import BasketPage from './pages/basket/BasketPage'
import ProductComparison from './pages/comparison/ProductComparison'
import LikedList from './pages/likedList/LikedList'
import OrderHistory from './pages/orderHistory/OrderHistory'
import MyProfile from './pages/myProfile/MyProfile'
import CourierPage from './pages/kurer/CourierPage'
import { getAllInfoPages } from './http/infoPagesAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import InfoUniversalPage from './pages/infoUniversalPages/InfoUniversalPage'
import ResultFalseLogin from './components/result/ResultFalseLogin'
import RequireAuth from '../src/hoc/RequireAuth'
import { getAllQuestionResponseAdmin } from './http/questionAPI'
import { DrawerNewQuestions } from './components/drawerNewQuestions/DrawerNewQuestions'
import 'antd/dist/reset.css'
import { SearchPage } from './pages/search/SearchPage'
import { ViewAllPage } from './pages/viewAll/ViewAllPage'
import { StoksPage } from './pages/stocks/StoksPage'
import { ResetPasswordPage } from './pages/resetPasswordPage/ResetPasswordPage'


// ConfigProvider.config({
//   theme: {
//     primaryColor: '#292D51',
//   },
// })

export const Context = createContext(null)

const App = observer(() => {
  const [loading, setLoading] = useState(true)
  const [question, setQuestion] = useState([])
  const [open, setOpen] = useState(false)
  const [isReq, setIsReq] = useState(false)
  const [user] = useState(new UserStore())
  const [dataApp] = useState(new DataStore())
  const cyrillicToTranslit = new CyrillicToTranslit()

  useEffect(() => {
    check()
      .then(data => {
        user.setUserData(data)
        if (data.isActivation) {
          user.setIsAuth(true)
          user.setUser(true)
        }
      })
      .catch(data => {
        console.log('check err:', data.response.data.message)
      })
      .finally(() => setLoading(false))
  }, [user])

  useEffect(() => {
    categoryType()
      .then(data => {
        dataApp.setDataMenu(data)
      })
    getAllInfoPages()
      .then(data => {
        const items = []
        if (Array.isArray(data)) {
          data.forEach(el => {
            items.push({
              link: (cyrillicToTranslit.transform(el.link.split(' ').join('-'))).toLowerCase(),
              name: el.link,
              id: el.id,
              content: el.content,
              title: el.title
            })
          })
        }
        dataApp.setInfoPages(items)
      })
  }, [])

  useEffect(() => {
    getAllQuestionResponseAdmin()
      .then(data => {
        setQuestion(data)
      })
  }, [isReq])

  const showDrawer = () => {
    setOpen(true)
  }


  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'><Spin size="large" /></div>
  }

  return (
    <ConfigProvider
     
      theme={{
        token: {
          colorPrimary: '#292D51',
          colorLink:'#292D51',
        },
        // components: {
        //   Radio: {
        //     colorPrimary: '#00b96b',
        //   },
        // },
      }}
      locale={locale}
    >
      <Context.Provider value={{
        user,
        dataApp,
        dataProducts: new ProductsStore()
      }}>
        <BrowserRouter>
          <div className="app">
            <Header />
            {
              question.length && user.userData.role === "ADMIN" ?
              <Affix offsetTop={60} style={{ position: 'absolute', right: '40px', zIndex: '100' }}>
                <MailOutlined
                  className='text-4xl animate-bounce text-green-600'
                  onClick={showDrawer}
                />
                </Affix>
                :
                undefined
            }
            <main className='bg-[#F0F0F2] relative xs:pt-14 xx:pt-14 xy:pt-14 lg:pt-20'>
              <BreadCrumbComp />
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:category' element={<UniversalPage />} />
                <Route path='/:category/:type' element={<UniversalPage />} />
                <Route path='/uspeshno' element={<ResultComp />} />
                <Route path='/super-adminka' element={
                  <RequireAuth>
                    <AdminPage />
                  </RequireAuth>
                } />
                <Route path='/korzina' element={<BasketPage />} />
                <Route path='/cpisok-sravneniya' element={<ProductComparison />} />
                <Route path='/spisok-ponravivshikhsya' element={<LikedList />} />
                <Route path='/istoriya-zakazov' element={<OrderHistory />} />
                <Route path='/moi-dannye' element={<MyProfile />} />
                <Route path='/dlya-voditelya' element={<CourierPage />} />
                <Route path='/info/:link' element={<InfoUniversalPage />} />
                <Route path='/false/auth' element={<ResultFalseLogin />} />
                <Route path='/:category/:type/:title' element={<ProductPage />} />
                <Route path='/poisk' element={<SearchPage />} />
                <Route path='/assortiment/:title' element={<ViewAllPage />} />
                <Route path='/aktsii' element={<StoksPage />} />
                <Route path='/sbros-parolya' element={<ResetPasswordPage />} />
                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>


        <DrawerNewQuestions setOpen={setOpen} open={open} question={question} setIsReq={setIsReq} />


      </Context.Provider>
    </ConfigProvider>
  )
})

export default App
