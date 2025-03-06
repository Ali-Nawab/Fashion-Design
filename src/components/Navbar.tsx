import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCart } from "../redux/features/cart/CartSlice";
import CartModel from "../Pages/Shop/CartModel";
import apis from "../utils/apis";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { clearUser } from "../redux/features/User/UserSlice"

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string | null;
}

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // To get the current path
  const products: CartItem[] = useSelector((state: RootState) => state.cart.products);

  const { user_id, imageURL } = useSelector((state: RootState) => state.user);
  const totalCartItems = products.reduce(
    (total: number, product: CartItem) => total + product.quantity,
    0
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
    //fetchUserCart()
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutFunction = () => {
    dispatch(clearUser())
    navigate("/")
    window.location.reload();
  }

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await fetch(
          apis().fetchSingleUserCartData.replace(":userId", user_id.toString()),
          {
            method: "GET",
            headers: { "Content-Types": "application/json" },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.log(result.message);
        }

        if (result.status) {
          dispatch(setCart(result.cart));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(String(error));
        }
      }
    };
    fetchUserCart();
  }, [user_id]);

  

  return (
    <header className="py-8 px-6 grid items-center b-1 shadow-sm w-full bg-gray-900 z-10 sticky top-0 left-0">
      <nav className="grid grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto w-full bg-gray-900 text-white">
        <ul className="hidden lg:flex">
          {[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <li
              key={link.name}
              className={`pl-4 sm:pl-6 font-medium self-center text-[1.125rem] relative ${
                location.pathname === link.path ? "text-red-500" : ""
              }`}
            >
              <Link
                to={link.path}
                className={`relative after:absolute after:bottom-[-2px] after:w-0 after:left-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mb-0 self-center font-bold justify-self-center md:text-4xl">
          Glamour Haven
        </h2>
        <ul className="justify-self-center lg:justify-self-end flex">
          <li className="pr-3 sm:pr-5 self-center">
            <Link
              to="/search"
              className="text-xl transform hover:text-red-500 transition-all duration-300"
            >
              <i className="ri-search-line"></i>
            </Link>
          </li>
          <li className="pr-3 sm:pr-5 self-center text-xl transform hover:text-red-500 transition-all duration-300">
            <IconButton
              color="primary"
              aria-label="add to cart"
              sx={{ padding: 0, color: "white" }}
              onClick={handleCartToggle}
            >
              <Badge badgeContent={totalCartItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </li>
          <li className="pr-3 sm:pr-5 self-center text-xl transform hover:text-red-500 transition-all duration-300">
      {user_id ? (
        <>
          <Avatar alt="Remy Sharp" src={imageURL} 
          id="basic-button"
          aria-controls={open1 ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open1 ? 'true' : undefined}
          onClick={handleClick}
          className="cursor-pointer"/>
      
          <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open1}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          >
          <MenuItem><Link to="/dashboard/profile">Profile</Link></MenuItem>
          <MenuItem><Link to="/track/order">Track Your Order</Link></MenuItem>
          <MenuItem onClick={logoutFunction}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Link
          to="/login"
          className="text-xl transform hover:text-red-500 transition-all duration-300"
        > 
          <i className="ri-user-unfollow-line" onClick={handleOpen}></i>
        </Link>
      )}
          </li>
        </ul>
      </nav>
      {isCartOpen && (
        <CartModel isOpen={isCartOpen} onClose={handleCartToggle} />
      )}
    </header>
  );
};

export default Navbar;
