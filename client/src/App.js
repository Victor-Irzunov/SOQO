import React, { createContext, useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import { Spin, ConfigProvider, Affix, theme } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import UserStore from './store/UserStore'
import DataStore from './store/DataStore'
import ProductsStore from './store/ProductsStore'
import Header from './components/header/Header'
import BreadCrumbComp from './components/breadcrumb/BreadcrumbComp'
// import MainPage from './pages/main/MainPage'
import ErrorPage from './pages/error/ErrorPage'
import Footer from './components/footer/Footer'
import ProductPage from './pages/productPage/ProductPage'
import { observer } from "mobx-react-lite"
import { check } from './http/userAPI'
// import ResultComp from './components/result/ResultComp'
// import AdminPage from './pages/admin/AdminPage'
import locale from 'antd/es/locale/ru_RU'
import { categoryType } from './http/productsAPI'
import UniversalPage from './pages/universal/UniversalPage'
// import BasketPage from './pages/basket/BasketPage'
// import ProductComparison from './pages/comparison/ProductComparison'
// import UniversalList from './pages/universalList/UniversalList'
// import OrderHistory from './pages/orderHistory/OrderHistory'
// import MyProfile from './pages/myProfile/MyProfile'
// import CourierPage from './pages/kurer/CourierPage'
import { getAllInfoPages } from './http/infoPagesAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
// import InfoUniversalPage from './pages/infoUniversalPages/InfoUniversalPage'
import ResultFalseLogin from './components/result/ResultFalseLogin'
import RequireAuth from '../src/hoc/RequireAuth'
import { getAllQuestionResponseAdmin } from './http/questionAPI'
import { DrawerNewQuestions } from './components/drawerNewQuestions/DrawerNewQuestions'
import 'antd/dist/reset.css'
import { SearchPage } from './pages/search/SearchPage'
import { ViewAllPage } from './pages/viewAll/ViewAllPage'
// import { StoksPage } from './pages/stocks/StoksPage'
// import { ResetPasswordPage } from './pages/resetPasswordPage/ResetPasswordPage'
// import { DogovorPage } from './pages/dogovor/DogovorPage'
import { Helmet } from 'react-helmet'

const DogovorPage = lazy(() => import('./pages/dogovor/DogovorPage'))
const AdminPage = lazy(() => import('./pages/admin/AdminPage'))
const InfoUniversalPage = lazy(() => import('./pages/infoUniversalPages/InfoUniversalPage'))
const MainPage = lazy(() => import('./pages/main/MainPage'))
const MyProfile = lazy(() => import('./pages/myProfile/MyProfile'))
const ProductComparison = lazy(() => import('./pages/comparison/ProductComparison'))
const BasketPage = lazy(() => import('./pages/basket/BasketPage'))
const ResultComp = lazy(() => import('./components/result/ResultComp'))
const OrderHistory = lazy(() => import('./pages/orderHistory/OrderHistory'))
const CourierPage = lazy(() => import('./pages/kurer/CourierPage'))
const UniversalList = lazy(() => import('./pages/universalList/UniversalList'))
// const ViewAllPage = lazy(() => import('./pages/viewAll/ViewAllPage'))
const StoksPage = lazy(() => import('./pages/stocks/StoksPage'))
const ResetPasswordPage = lazy(() => import('./pages/resetPasswordPage/ResetPasswordPage'))

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
          colorLink: '#292D51',
        },
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
            <Helmet>
              <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
            </Helmet>

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
            <main className='bg-[#F0F0F2] relative xs:pt-14 xx:pt-14 xy:pt-14 xz:pt-14 lg:pt-20'>
              <BreadCrumbComp />


              <Routes>
                <Route path='/' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <MainPage />
                  </Suspense>
                } />
                <Route path='/:category' element={<UniversalPage />} />
                <Route path='/:category/:type' element={<UniversalPage />} />
                <Route path='/assortiment' element={<UniversalPage assortiment={true} />} />
                <Route path='/uspeshno' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <ResultComp />
                  </Suspense>
                } />
                <Route path='/super-adminka' element={
                  <RequireAuth>
                    <Suspense fallback={<p>loading...</p>}>
                      <AdminPage />
                    </Suspense>
                  </RequireAuth>

                } />
                <Route path='/korzina' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <BasketPage />
                  </Suspense>
                } />
                <Route path='/cpisok-sravneniya' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <ProductComparison />
                  </Suspense>
                } />
                <Route path='/spisok-ponravivshikhsya' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <UniversalList like={true} />
                  </Suspense>
                } />
                <Route path='/prosmotrennye-tovari' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <UniversalList view={true} />
                  </Suspense>
                } />
                <Route path='/istoriya-zakazov' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <OrderHistory />
                  </Suspense>
                } />
                <Route path='/moi-dannye' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <MyProfile />
                  </Suspense>
                } />
                <Route path='/dlya-voditelya' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <CourierPage />
                  </Suspense>
                } />
                <Route path='/info/:link' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <InfoUniversalPage />
                  </Suspense>
                } />
                <Route path='/false/auth' element={<ResultFalseLogin />} />
                <Route path='/:category/:type/:title' element={<ProductPage />} />
                <Route path='/poisk' element={<SearchPage />} />
                <Route path='/assortiment/:title' element={
                
                    <ViewAllPage />
                
                } />
                <Route path='/dogovor' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <DogovorPage />
                  </Suspense>
                } />

                <Route path='/aktsii' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <StoksPage />
                  </Suspense>
                } />
                <Route path='/sbros-parolya' element={
                  <Suspense fallback={<p>loading...</p>}>
                    <ResetPasswordPage />
                  </Suspense>
                } />
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
