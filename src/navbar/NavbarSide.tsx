import React from 'react';
import Menu from '../menu/Menu';

export default function NavbarSide(props: any) {
    const { data } = props;
    console.log(data)
    return (
        <div className='z-20 cursor-pointer select-none text-md'>
            {
                data.map((item: any, index: number) =>
                    <div
                        className={`${'w-24'} ${'m-4'} flex justify-center border-blue-400 border`}
                        key={item.label + index}>
                        <Menu data={item} />
                    </div>
                )
            }
        </div>
    )
}
