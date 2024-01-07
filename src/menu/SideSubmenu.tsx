import { useState } from 'react'
import Portal from './Portal';
import { usePopper } from 'react-popper';


export default function SideSubmenu(props: any) {
    const { data, placement } = props;
    const [showSubmenu, setShowSubmenu] = useState(false);
    let [refEl, setRefEl]: any = useState();
    let [popEl, setPopEl]: any = useState();
    console.log(showSubmenu, '***menu3')
    console.log(data.subMenu, 'Data')
    const { styles, attributes } = usePopper(refEl, popEl, {
        placement: placement || 'right'
    })
    return (
        <div className='mx-3 border-[1px] p-2 border-blue-500 cursor-pointer select-none bg-white'>
            {data.map((item: any, index: number) =>
                <div
                    onMouseEnter={(e) => { e.stopPropagation(); if (item.subMenu) setShowSubmenu(true) }}
                    onMouseLeave={(e) => { if (item.subMenu) setShowSubmenu(false) }}
                    key={item.label + index} className='border-[1px] border-slate-500 m-1 p-2'
                    ref={setRefEl}
                >
                    <h1>{item.label}</h1>
                    {
                        showSubmenu && item.subMenu &&
                        <Portal>
                            <div ref={setPopEl} style={styles.popper} {...attributes.popper}>
                                <SideSubmenu data={item.subMenu} placement={placement} />
                            </div>
                        </Portal>
                    }
                </div>
            )}

        </div>
    )
}
