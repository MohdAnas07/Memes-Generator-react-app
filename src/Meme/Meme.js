import React, { useEffect, useState } from 'react'
import './Meme.css'

export const Meme = () => {

    const [memes, setMemes] = useState([])
    const [memeIndex, setMemeIndex] = useState(0)
    const [captions, setCaptions] = useState([])

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };


    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => {
                const memesData = data.data.memes;
                shuffleMemes(memesData)
                setMemes(memesData);
            })

    }, [])


    useEffect(() => {
        if (memes.length) {
            setCaptions(Array(memes[memeIndex].box_count).fill(''))
        }
    }, [memeIndex, memes])

    useEffect(() => {
        console.log(captions)
    }, [captions])

    return (
        memes.length ?
            <div className='container'>
                <button className='generate' onClick={() => console.log('Generate a meme')}> Generate </button>
                <button className='skip' onClick={() => setMemeIndex(memeIndex + 1)}> Skip </button>
                {
                    captions.map((ele, index) => (
                        <input type="text" key={index} />
                    ))
                }
                < img src={memes[memeIndex].url} alt='meme-img' />
            </div > : <></>
    )
}
