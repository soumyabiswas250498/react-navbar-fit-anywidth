import Menu from './menu/Menu';
import NavbarTop from './navbar/NavbarTop';
import Navbar from './navbar/NavBar';



function App() {
  return (
    <div className='w-screen h-screen '>
      <div className='flex items-center w-screen gap-2 pt-4'>
        <h1 className='w-fit px-14'>Hello</h1>
        <div className='w-full'>
          {/* <Menu /> */}
          <Navbar />
        </div>
        <h1 className='w-fit px-14'>Hello</h1>
      </div>



    </div>
  );
}

export default App;
