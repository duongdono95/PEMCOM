'use client';
import React from 'react';
import { User } from 'next-auth';
import Tippy from '@tippyjs/react';
import NavMenuDropDown from '../NavMenuDropDown/NavMenuDropDown';
import UserAvatar from '../UserAvatar/UserAvatar';
import './NavUserAccount.scss';
interface NavUserAccountProps {
  user: Pick<User, 'name' | 'image' | 'email'>;
}
const NavUserAccount: React.FC<NavUserAccountProps> = ({ user }) => {
  return (
    <div className="nav-user-account">
      <Tippy
        content={<NavMenuDropDown />}
        interactive
        placement="bottom-end"
        animation="fade"
        arrow={true}
        theme="light-border"
        trigger="click"
        appendTo="parent"
      >
        <div>
          <UserAvatar image={user.image ? user.image : null} />
        </div>
      </Tippy>
    </div>
  );
};

export default NavUserAccount;
