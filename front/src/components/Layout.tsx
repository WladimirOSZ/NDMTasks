import { Outlet } from "react-router-dom"

const LayoutComponent = () => {
  return (
    <>
      <div className="container mx-auto shadow-lg">
        <Outlet />
      </div>
    </>
  )
}

export default LayoutComponent