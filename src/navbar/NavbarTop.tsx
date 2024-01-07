import { useRef, useLayoutEffect } from 'react'
import hambergerMenuIcon from './burger-menu-svgrepo-com.svg'
import crossMenuIcon from './cross-svgrepo-com.svg'
import Menu from '../menu/Menu';


export default function NavbarTop(props: any) {
    const { setTopNavWidth, menu, topNavElementProps, showHambergurMenu, setShowSideNav, showSideNav } = props;
    const selectedParentElement = useRef<HTMLDivElement | null>(null);
    const oneElementWidth = `w-[${topNavElementProps.width}px]`;
    const oneElementPadding = `px-[${topNavElementProps.padding}px]`;

    // console.log(oneElementPadding, '***element')

    useLayoutEffect(() => {
        function handleResize() {
            if (selectedParentElement.current) {
                const rect = selectedParentElement.current.getBoundingClientRect();
                const width = rect.width;
                // console.log(width, '***width');
                setTopNavWidth(width);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [selectedParentElement, menu]);

    return (
        <div className='flex justify-between w-full gap-2 py-2 border border-green-500' ref={selectedParentElement}>
            {
                menu.map((item: any, index: number) =>
                    <div
                        className={`${oneElementWidth} ${oneElementPadding} flex justify-center border-blue-400 border`}
                        key={item.label + index}>
                        <Menu data={item} />
                    </div>
                )
            }
            {showHambergurMenu &&
                <div className='w-6 h-full' onClick={() => { setShowSideNav((prev: Boolean) => !prev) }}>
                    {showSideNav ? <img src={crossMenuIcon} alt='menu' /> : <img src={hambergerMenuIcon} alt='menu' />}

                </div>
            }
        </div>
    )
}
