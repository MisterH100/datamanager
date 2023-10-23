import {useEffect, useRef } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
import { useGlobalContext } from '../utils/globalContext';

export const ProgressBar = ()=>{
    const progress = useRef<LoadingBarRef>(null);
    const {loading} = useGlobalContext()
    const color = window.matchMedia('(prefers-color-scheme: dark)').matches? 'white' : 'blue'
    
    useEffect(()=>{
        if(loading){
            progress.current?.continuousStart();
        }
        progress.current?.complete();
        
    },[loading])
    
    return(
        <div>
            <LoadingBar 
                color={color} 
                ref={progress} 
                shadow={true}
            />
        </div>
    )
}