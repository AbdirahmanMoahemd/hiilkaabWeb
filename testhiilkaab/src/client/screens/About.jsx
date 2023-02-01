import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listsettings } from '../../actions/settingsActions';
import Header from '../components/Header'

const About = () => {
  const dispatch = useDispatch();

  

  const settingsList = useSelector((state) => state.settingsList);
  const { loading, error, settings } = settingsList;

  useEffect(() => {
    dispatch(listsettings());
  }, [dispatch]);


  return (
    <>
    <Header/>
    {settings.map(setting => (
       <div className='container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4'>
       <di className='xl:col-span-7 lg:col-span-8 p-8'>
       <h2 className="text-2xl md:text-4xl font-medium text-gray-800 uppercase mb-6">
           About us
         </h2>
         
          <p className='text-lg'>{setting.about}</p>
         
       </di>
       <di className='xl:col-span-5 lg:col-span-4  p-8 rounded mt-6 lg:mt-0'>
         <img src={setting.aboutImg} className='w-full h-full'/>
       </di>
 
     </div>
    ))}
   
    
    </>
  )
}

export default About