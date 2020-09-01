import React, {useEffect} from 'react'
import {FiCheckCircle} from 'react-icons/fi'
import {useHistory} from 'react-router-dom'

import './style.css'

const End = () => {

    const history = useHistory()

    useEffect(() => {
        const timer = setTimeout(() => {
            history.push('/')
          }, 2000);
          return () => clearTimeout(timer);
    },[history])
    return (
        <div className="fullBlack">
            <div className="correctContent">
                <div>
                    <span>
                        <FiCheckCircle className='ico' />
                    </span> 
                </div>
                <div>
                    <h1 id="text_sucesso">Cadastro concluído com sucesso!</h1>
                </div>
            </div>
        </div>
    )
}

export default End