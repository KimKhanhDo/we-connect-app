import { useState } from "react";
import { Notifications, Search, MenuOutlined } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useLogout } from "@/hooks/useLogout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "@/redux/slices/settingsSlice";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const userInfo = useUserInfo();
    const { logOut } = useLogout();
    const theme = useTheme();
    const dispatch = useDispatch();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleMenuClose = () => setAnchorEl(null);

    const renderMenu = (
        <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={() => logOut()}>Logout</MenuItem>
        </Menu>
    );

    const handleUserProfileClick = (e) => setAnchorEl(e.target);

    return (
        <div>
            <AppBar color="white" position="static" className="py-4">
                <Toolbar className="!min-h-fit justify-between">
                    {/* Left */}
                    {isMobile ? (
                        <IconButton onClick={() => dispatch(toggleDrawer())}>
                            <MenuOutlined />
                        </IconButton>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/">
                                <img
                                    src="/we-connect-logo.png"
                                    alt="logo"
                                    className="h-[34px] w-[34px] object-cover"
                                />
                            </Link>

                            <div className="flex items-center gap-1">
                                <Search />
                                <TextField
                                    variant="standard"
                                    name="search"
                                    placeholder="Search"
                                    slotProps={{
                                        input: {
                                            className: "h-10 px-3 py-2",
                                        },
                                        htmlInput: {
                                            className: "!p-0",
                                        },
                                    }}
                                    sx={{
                                        ".MuiInputBase-root::before": {
                                            display: "none",
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Right */}
                    <div>
                        {isMobile && (
                            <IconButton>
                                <Search />
                            </IconButton>
                        )}
                        <IconButton size="medium">
                            <Badge badgeContent={4} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="medium"
                            onClick={handleUserProfileClick}
                        >
                            <Avatar className="!bg-primary">
                                {userInfo.fullName?.[0]?.toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
export default Header;
