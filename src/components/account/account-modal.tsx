import React from "react";
import { Modal, Menu, MenuProps, message } from "antd";
import AccountCalendar from "./account-calendar";
import AccountPayments from "./account-payments";
import AccountFamily from "./account-family";
import AccountSettings from "./account-settings";
import AccountMemberships from "./account-memberships";
import AccountOrganisations from "./account-organisations";

interface AccountModalProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  selectedMenuKey: string;
  setSelectedMenuKey: (key: string) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  handleOk,
  handleCancel,
  selectedMenuKey,
  setSelectedMenuKey,
}) => {
  const handleLogout = () => {
    message.success("Successfully signed out");
    setTimeout(() => {
      setSelectedMenuKey("");
      window.location.reload();
    }, 1000);
  };

  const handleMenuSelect = (e: { key: string }) => {
    setSelectedMenuKey(e.key);
  };

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key | null,
    icon: React.ReactNode,
    onClick?: () => void,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
      children,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      "Calendar",
      "calendar",
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
        ></path>
      </svg>,
      () => {
        handleMenuSelect({ key: "calendar" });
      }
    ),
    getItem(
      "Payments",
      "payments",
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
        ></path>
      </svg>,
      () => {
        handleMenuSelect({ key: "payments" });
      }
    ),
    getItem(
      "Memberships",
      "memberships",
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18.25 6.75a2 2 0 00-2-2H5.75v14.5h10.5a2 2 0 002-2V6.75z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.25 10a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM9.75 15.25h4.5"
        ></path>
      </svg>,
      () => {
        handleMenuSelect({ key: "memberships" });
      }
    ),
    getItem(
      "Family",
      "family",
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M11.25 7a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16.498 5.403c-.55-.715-1.467-.907-2.156-.253-.688.654-.785 1.748-.244 2.521l2.4 2.579 2.4-2.579c.542-.773.456-1.874-.244-2.52-.701-.648-1.606-.463-2.156.252z"
          clipRule="evenodd"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 9.75c-3.4 0-4.25 1.75-4.25 4.5h2v3a2 2 0 002 2h.5a2 2 0 002-2v-3h2c0-2.75-.85-4.5-4.25-4.5z"
        ></path>
      </svg>,
      () => {
        handleMenuSelect({ key: "family" });
      }
    ),
    getItem(
      "Settings",
      "settings",
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5.621 14.963l1.101.172c.813.127 1.393.872 1.333 1.71l-.081 1.137a.811.811 0 00.445.787l.814.4c.292.145.641.09.88-.134l.818-.773a1.55 1.55 0 012.138 0l.818.773a.776.776 0 00.88.135l.815-.402a.808.808 0 00.443-.785l-.08-1.138c-.06-.838.52-1.583 1.332-1.71l1.101-.172a.798.798 0 00.651-.62l.201-.9a.816.816 0 00-.324-.847l-.918-.643a1.634 1.634 0 01-.476-2.132l.555-.988a.824.824 0 00-.068-.907l-.563-.723a.78.78 0 00-.85-.269l-1.064.334a1.567 1.567 0 01-1.928-.949l-.407-1.058a.791.791 0 00-.737-.511l-.903.002a.791.791 0 00-.734.516l-.398 1.045a1.566 1.566 0 01-1.93.956l-1.11-.348a.78.78 0 00-.851.27l-.56.724a.823.823 0 00-.062.91l.568.99c.418.73.213 1.666-.469 2.144l-.907.636a.817.817 0 00-.324.847l.2.9c.072.325.33.57.651.62z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13.591 10.409a2.25 2.25 0 11-3.183 3.182 2.25 2.25 0 013.183-3.182z"
        ></path>
      </svg>,
      () => {
        handleMenuSelect({ key: "settings" });
      }
    ),
    getItem(
      "Switch organisations",
      "organisations",
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.25 11.25L4.75 8l3.5-3.25M4.75 8h10.5M15.75 12.75l3.5 3.25-3.5 3.25M19.25 16H8.75"
        ></path>
      </svg>,
      () => {
        handleMenuSelect({ key: "organisations" });
      }
    ),
  ];

  const modalTitle = selectedMenuKey ? selectedMenuKey : "My Account";

  return (
    <Modal
      title={
        <>
          <div className="md:hidden first-letter:capitalize">{modalTitle}</div>
          <div className="hidden md:block">My Account</div>
        </>
      }
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      width={800}
      className="modal-full-mobile"
      rootClassName="[&>*]:!z-[2147483647]"
    >
      <div className="md:grid md:grid-cols-[14rem,1fr] md:gap-x-6">
        <aside className="hidden md:block">
          <Menu
            className="!border-0 [&>li]:!mx-0 [&>li]:!rounded-md [&>li]:!px-3s [&>li]:!flex [&>li]:!items-center [&>li.ant-menu-item-selected]:bg-interactive/5 [&>li.ant-menu-item-selected]:font-medium"
            items={items}
            selectedKeys={[selectedMenuKey]}
            onSelect={handleMenuSelect}
          />
          <button
            type="button"
            className="flex items-center w-full h-10 gap-2.5 px-4 transition-colors rounded-md hover:bg-error/5 hover:text-error"
            onClick={handleLogout}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.75 8.75l3.5 3.25-3.5 3.25M19 12h-8.25M15.25 4.75h-8.5a2 2 0 00-2 2v10.5a2 2 0 002 2h8.5"
              ></path>
            </svg>
            <span>Sign out</span>
          </button>
        </aside>
        <div className="">
          {selectedMenuKey === "calendar" && <AccountCalendar />}
          {selectedMenuKey === "payments" && <AccountPayments />}
          {selectedMenuKey === "memberships" && <AccountMemberships />}
          {selectedMenuKey === "family" && <AccountFamily />}
          {selectedMenuKey === "settings" && <AccountSettings />}
          {selectedMenuKey === "organisations" && <AccountOrganisations />}
        </div>
      </div>
    </Modal>
  );
};

export default AccountModal;
