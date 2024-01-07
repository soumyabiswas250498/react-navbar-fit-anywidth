import { useState } from 'react'
import Portal from './Portal';
import { usePopper } from 'react-popper';
import SideSubmenu from './SideSubmenu';

const menuData = [
    {
        label: 'menu', path: '/menu', subMenu: [
            { label: 'submenu1', path: '/submenu1' },
            { label: 'submenu2', path: '/submenu2' },
            {
                label: 'submenu3', path: '/submenu3', subMenu: [
                    { label: 'submenu21', path: '/submenu22' },
                    { label: 'submenu22', path: '/submenu22' },
                    {
                        label: 'submenu23', path: '/submenu23', subMenu: [
                            { label: 'submenu31', path: '/submenu31' },
                            { label: 'submenu32', path: '/submenu32' },
                            {
                                label: 'submenu33', path: '/submenu33', subMenu: [
                                    { label: 'submenu41', path: '/submenu42' },
                                    { label: 'submenu42', path: '/submenu42' },
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    }
]



export default function Menu(props: any) {
    const { data } = props;
    console.log(data, '***menudata')
    const [showSubmenu, setShowSubmenu] = useState(false);
    let [refEl, setRefEl]: any = useState();
    let [popEl, setPopEl]: any = useState();
    const { styles, attributes } = usePopper(refEl, popEl, { placement: 'bottom', modifiers: [{ name: 'offset', options: { offset: [-80, 0] } }] })
    console.log(showSubmenu, '***menu1')
    return (
        <div
            onMouseEnter={(e) => { e.stopPropagation(); setShowSubmenu(true) }}
            onMouseLeave={(e) => { e.stopPropagation(); setShowSubmenu(false) }}
            className='relative cursor-pointer select-none' ref={setRefEl}
        >
            <div className='my-2'>{data.label}</div>
            {showSubmenu && data?.subMenu &&
                <Portal>
                    <div ref={setPopEl} style={styles.popper} {...attributes.popper}>
                        <div className='absolute z-20 cursor-pointer select-none text-md'>
                            <SideSubmenu data={data?.subMenu} placement={'right'} />
                        </div>
                        {/* <SubMenu data={menuData[0].subMenu} /> */}
                    </div>
                </Portal>}
        </div>
    )
}
