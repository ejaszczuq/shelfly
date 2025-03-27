import React from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@src/contexts/Auth.context";
import { useModals } from "@src/contexts/Modals.context";
import { useBooks } from "@src/contexts/Books.context";
import { scrollToTop } from "@src/utils/scrollToTop";

import DynamicIcon from "@src/components/common/DynamicIcon";
import SearchInput from "@src/components/common/SearchInput/SearchInput";

import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { logout } = useAuth();
  const { searchQuery, setSearchQuery } = useBooks();
  const { openModal } = useModals();

  const handleOpenAddBookModal = () => openModal({ type: "addBook" });
  const handleOpenDeleteAccountModal = () => openModal({ type: "deleteAccount" });

  return (
    <nav className="navbar">
      {/* LEFT SECTION: ikona + nazwa strony */}
      <div className="navbar-left">
        <DynamicIcon
          iconName="MenuBookTwoTone"
          fontSize="large"
          color="action"
          onClick={scrollToTop}
          style={{ cursor: "pointer" }}
        />
        <span className="site-name" onClick={scrollToTop}>
          Shelfly
        </span>
      </div>

      {/* CENTER SECTION: wyszukiwarka */}
      <div className="navbar-center">
        <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* RIGHT SECTION: ikony */}
      <div className="navbar-right">
        <DynamicIcon iconName="PostAdd" fontSize="large" color="action" onClick={handleOpenAddBookModal} />
        <DynamicIcon iconName="BookmarkTwoTone" fontSize="large" color="action" />
        <DynamicIcon
          iconName="PersonRemoveTwoTone"
          fontSize="large"
          color="action"
          onClick={handleOpenDeleteAccountModal}
        />
        <DynamicIcon iconName="ExitToApp" fontSize="large" color="action" onClick={logout} />
      </div>
    </nav>
  );
};

export default Navbar;
