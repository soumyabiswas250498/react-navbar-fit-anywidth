import React, { useRef, useLayoutEffect, useState } from 'react'
import data from './data.json'

export default function Navbar() {
    const { menu } = data
    const selectedElement = useRef<HTMLDivElement | null>(null);
    const [width, setWidth]: any = useState(0);
    const oneElementWidth = 61;
    // console.log(selectedElement, '***select')
    console.log(width, '***width')
    useLayoutEffect(() => {
        function handleResize() {
            if (selectedElement.current) {
                const rect = selectedElement.current.getBoundingClientRect();
                const width = rect.width;
                // const height = rect.height;
                setWidth(width);
                // setElementHeight(height);
            }
        }

        handleResize(); // initial call to get width and height of the element
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [selectedElement]);
    // console.log(menu)
    return (
        <div className='flex justify-between w-full gap-2 border border-green-500' ref={selectedElement}>
            {
                menu.map((item: any, index: number) => <div className={`w-[${oneElementWidth}px] flex justify-center border-blue-400 border`} key={item.label + index}>{item.label}</div>)
            }
        </div>
    )
}
