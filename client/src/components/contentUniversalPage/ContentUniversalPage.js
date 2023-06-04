import React, { useEffect, useState, useContext, useRef } from 'react';
import { Badge } from 'antd';
import { Context } from '../../App';
import { getOneUniqueContent } from '../../http/adminAPI';
import parse from 'html-react-parser';

export const ContentUniversalPage = ({ typeId, categoryId }) => {
  const { user } = useContext(Context);
  const [data, setData] = useState({});
  const iframeRef = useRef(null);
  console.log('iframeRef::: ', iframeRef);
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  useEffect(() => {
    setData({});
    if (categoryId) {
      getOneUniqueContent({ typeId, categoryId }).then((data) => {
        if (data && !data.message) {
          setData(data);
        } else {
          setData({});
        }
      });
    }
  }, [categoryId, typeId]);

  useEffect(() => {
    const handleScroll = () => {
      if (iframeRef.current) {
        const iframePosition = iframeRef.current.getBoundingClientRect();
	
        const isIframeVisible = iframePosition.top < window.innerHeight;
        setIsIframeVisible(isIframeVisible);
		 
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем функцию handleScroll в начале, чтобы установить правильное значение isIframeVisible
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <article className='mt-32 mb-24'>
      {Object.keys(data).length ? (
        <div className='relative text-justify' ref={iframeRef}>
          {isIframeVisible && data.link !== 'undefined' ? (
            <iframe
              width='100%'
              height='415'
              src={data.link}
              className='mb-20'
              title={data.title ? data.title : ''}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
				  ) : null}
				  
          {parse(data.content)}
          {user.userData.role === 'ADMIN' && (
            <span className='absolute top-0 right-0 text-blue-700 text-xl'>
              <Badge count={data.id} color='#292D51' />
            </span>
          )}
        </div>
      ) : null}
    </article>
  );
};
