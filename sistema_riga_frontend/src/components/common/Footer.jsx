import React from 'react'

const FooterComponent = () => {
    return (
        <div>
            <footer className='footer'>
                <span> &copy; {new Date().getFullYear()} </span>
            </footer>
        </div>
    )
}

export default FooterComponent