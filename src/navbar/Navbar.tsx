import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import NavbarTop from './NavbarTop';
import data from './data.json';
import Portal from '../menu/Portal';
import NavbarSide from './NavbarSide';
export default function Navbar() {
    const { menu } = data;
    const mobileMenuBreakPoint = 425;
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

        if (mobileMenuBreakPoint < topNavWidth) {
            const elemNumber = Math.floor(topNavWidth / (topNavElementProps.width + topNavElementProps.padding + topNavElementProps.offset));
            setTopNavBarData(menu.slice(0, elemNumber));
            setSideNavBarData(menu.slice(elemNumber))
        } else {
            setTopNavBarData(menu.slice(0, 0));
            setSideNavBarData(menu)
        }

        console.log(topNavWidth, '***elemNumber')
    }, [topNavWidth, menu]);


    const sideNavRef = useRef<HTMLDivElement>(null);
    const ClickAwayListner = () => {
        const handleClickOutside = (event: Event) => {
            console.log(sideNavRef.current, '***')
            if (sideNavRef.current && sideNavRef.current.contains(event.target as Node)) {
                console.log('***click Inside');
            } else {
                console.log('***click outside');
                const menuDetect = (event.target as HTMLElement)?.id
                // this is done only to detect if the outside click is caused by the click on hamberger menu
                if (menuDetect !== 'menuIcon') {
                    setShowSideNav(false);
                }
            }
        }
        useEffect(() => {
            document.addEventListener('click', handleClickOutside)
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };

        }, [sideNavRef])
    }
    ClickAwayListner()



    return (
        <div className='w-full' ref={setRefEl}>
            <NavbarTop setTopNavWidth={setTopNavWidth} menu={topNavBarData} topNavElementProps={topNavElementProps} showHambergurMenu={showHambergurMenu} setShowSideNav={setShowSideNav} showSideNav={showSideNav} />
            {
                showSideNav && <Portal>
                    <div ref={setPopEl} style={styles.popper} {...attributes.popper}>
                        <div ref={sideNavRef} className='border w-fit h-fit border-amber-400'>
                            <NavbarSide data={sideNavBarData} />
                        </div>

                    </div>
                </Portal>
            }

        </div>
    )
}
