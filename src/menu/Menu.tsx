import { useState } from 'react'
import Portal from './Portal';
import { usePopper } from 'react-popper';
import SideSubmenu from './SideSubmenu';

const menuData = [
    {
        title: 'menu', path: '/menu', subMenu: [
            { title: 'submenu1', path: '/submenu1' },
            { title: 'submenu2', path: '/submenu2' },
            {
                title: 'submenu3', path: '/submenu3', subMenu: [
                    { title: 'submenu21', path: '/submenu22' },
                    { title: 'submenu22', path: '/submenu22' },
                    {
                        title: 'submenu23', path: '/submenu23', subMenu: [
                            { title: 'submenu31', path: '/submenu31' },
                            { title: 'submenu32', path: '/submenu32' },
                            {
                                title: 'submenu33', path: '/submenu33', subMenu: [
                                    { title: 'submenu41', path: '/submenu42' },
                                    { title: 'submenu42', path: '/submenu42' },
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    }
]

function SubMenu(props: any) {
    const { data } = props;
    // console.log(data)
    return (
        <>
            <div className='absolute z-20 cursor-pointer select-none text-md'>
                <SideSubmenu data={data} />
            </div>
        </>
    )
}

export default function Menu() {
    const [showSubmenu, setShowSubmenu] = useState(false);
    let [refEl, setRefEl]: any = useState();
    let [popEl, setPopEl]: any = useState();
    const { styles, attributes } = usePopper(refEl, popEl, { placement: 'bottom-start' })
    console.log(showSubmenu, '***menu1')
    return (
        <div
            onMouseEnter={(e) => { e.stopPropagation(); setShowSubmenu(true) }}
            onMouseLeave={(e) => { e.stopPropagation(); setShowSubmenu(false) }}
            className='relative cursor-pointer select-none' ref={setRefEl}
        >
            <div className='my-2'>Menu</div>
            {showSubmenu &&
                <Portal>
                    <div ref={setPopEl} style={styles.popper} {...attributes.popper}>
                        <SubMenu data={menuData[0].subMenu} />
                    </div>
                </Portal>}
        </div>
    )
}
