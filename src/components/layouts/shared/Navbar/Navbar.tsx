import React from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@src/contexts/Auth.context";
import { useModals } from "@src/contexts/Modals.context";
import { useBooks } from "@src/contexts/Books.context";
import { scrollToTop } from "@src/utils/scrollToTop";

import DynamicIcon from "@src/components/common/DynamicIcon";

import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { searchQuery, setSearchQuery } = useBooks();
  const { handleOpenAddBookModal } = useModals();

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
        <div className="input-section">
          <DynamicIcon iconName="SearchTwoTone" fontSize="medium" color="action" className="input-icon" />
          <input
            type="text"
            placeholder={t("common:searchBooks") ?? "Szukaj książek..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* RIGHT SECTION: ikony */}
      <div className="navbar-right">
        <DynamicIcon iconName="PostAdd" fontSize="large" color="action" onClick={handleOpenAddBookModal} />
        <DynamicIcon iconName="BookmarkTwoTone" fontSize="large" color="action" />
        <DynamicIcon iconName="AccountCircleTwoTone" fontSize="large" color="action" />
        <DynamicIcon iconName="ExitToApp" fontSize="large" color="action" onClick={logout} />
      </div>
    </nav>
  );
};

export default Navbar;
