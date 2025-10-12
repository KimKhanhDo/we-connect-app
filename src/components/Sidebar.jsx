import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
    HomeOutlined,
    Hub,
    Lock,
    MessageOutlined,
    People,
    Translate,
} from "@mui/icons-material";
import {
    Drawer,
    List,
    ListSubheader,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { toggleDrawer } from "@/redux/slices/settingsSlice";

const ListStyled = styled(List)`
    padding: 16px;
    border-radius: 4px;
    gap: 4px;
`;

const SideBarContent = () => {
    return (
        <div className="flex w-64 flex-col gap-4">
            <ListStyled className="flex flex-col bg-white shadow">
                <Link to="/" className="flex items-center gap-1">
                    <HomeOutlined fontSize="small" /> New Feeds
                </Link>
                <Link to="/messages" className="flex items-center gap-1">
                    <MessageOutlined fontSize="small" /> Messenger
                </Link>
                <Link to="/friends" className="flex items-center gap-1">
                    <People fontSize="small" /> Friends
                </Link>
                <Link to="/groups" className="flex items-center gap-1">
                    <Hub fontSize="small" /> Groups
                </Link>
            </ListStyled>

            <ListStyled className="flex flex-col bg-white shadow">
                <ListSubheader className="mb-2 !px-0 !leading-none">
                    Settings
                </ListSubheader>
                <Link
                    to="/settings/account"
                    className="flex items-center gap-1"
                >
                    <Lock fontSize="small" /> Account
                </Link>
                <Link
                    to="/settings/languages"
                    className="flex items-center gap-1"
                >
                    <Translate fontSize="small" />
                    Languages
                </Link>
            </ListStyled>
        </div>
    );
};

function Sidebar() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isShowDrawer = useSelector((store) => store.settings.isShowDrawer);

    return isMobile ? (
        <Drawer
            open={isShowDrawer}
            onClose={() => dispatch(toggleDrawer())}
            classes={{ paper: "p-4  flex flex-col gap-4 !bg-dark-100" }}
        >
            <div>
                <Link to="/">
                    <img
                        src="/we-connect-logo.png"
                        alt="logo"
                        className="h-[34px] w-[34px] object-cover"
                    />
                </Link>
            </div>
            <SideBarContent />
        </Drawer>
    ) : (
        <SideBarContent />
    );
}
export default Sidebar;
