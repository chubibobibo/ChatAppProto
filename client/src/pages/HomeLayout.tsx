import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <>
      <section className='h-screen flex flex-col justify-between'>
        <Outlet />
        <footer className='footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4'>
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              ACME Industries Ltd
            </p>
          </aside>
        </footer>
      </section>
    </>
  );
}
export default HomeLayout;
