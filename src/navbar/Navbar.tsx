import { useLayoutEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import NavbarTop from './NavbarTop';
import data from './data.json';
import Portal from '../menu/Portal';
import NavbarSide from './NavbarSide';
export default function Navbar() {
    const { menu } = data;
    const [topNavWidth, setTopNavWidth] = useState(0)
    const [topNavBarData, setTopNavBarData] = useState(menu)
    const [sideNavBarData, setSideNavBarData] = useState(menu)

    // console.log(sideNavBarData, '***sideData')

    const [showSideNav, setShowSideNav] = useState(false);
    let [refEl, setRefEl]: any = useState();
    let [popEl, setPopEl]: any = useState();
    const { styles, attributes } = usePopper(refEl, popEl, { placement: 'bottom-end' })

    const topNavElementProps = {
        width: 90,
        padding: 20,
        offset: 0,
    }
    const showHambergurMenu = menu.length > topNavBarData.length;
    console.log(topNavBarData.length)
    useLayoutEffect(() => {
        const elemNumber = Math.floor(topNavWidth / (topNavElementProps.width + topNavElementProps.padding + topNavElementProps.offset));
        setTopNavBarData(menu.slice(0, elemNumber));
        setSideNavBarData(menu.slice(elemNumber))
        console.log(elemNumber, '***elemNumber')
    }, [topNavWidth, menu])

    return (
        <div className='w-full' ref={setRefEl}>
            <NavbarTop setTopNavWidth={setTopNavWidth} menu={topNavBarData} topNavElementProps={topNavElementProps} showHambergurMenu={showHambergurMenu} setShowSideNav={setShowSideNav} showSideNav={showSideNav} />
            {
                showSideNav && <Portal>
                    <div ref={setPopEl} style={styles.popper} {...attributes.popper}>
                        <NavbarSide data={sideNavBarData} />
                    </div>

                </Portal>
            }

        </div>
    )
}
