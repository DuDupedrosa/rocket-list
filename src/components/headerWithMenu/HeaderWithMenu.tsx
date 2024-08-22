import { List, SignOut, User, X } from 'phosphor-react';
import styled from 'styled-components';
import Logo from '../../assets/Logo.svg';
import { useEffect, useState } from 'react';
import http from '../../api/http';
import { useNavigate } from 'react-router-dom';
import { fadeIn, fadeInDown } from '../../style/styled-components/Animation';
import * as style from './style/HeaderWithMenuStyle';

function HeaderWithMenu() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  async function validToken() {
    try {
      const { data } = await http.get('validate-token');

      if (data.content.validToken) {
        setShowMenu(true);
      }
    } catch (err) {
      setShowMenu(false);
    }
  }

  function handleSignOut() {
    localStorage.clear();
    navigate('/auth');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      validToken();
    }
  }, []);

  return (
    <style.Container>
      <style.LogoContainer>
        <span onClick={() => navigate('/')}>
          <img src={Logo} alt="logo" />
        </span>
      </style.LogoContainer>

      {showMenu && (
        <style.ButtonMenuContainer>
          <button onClick={() => setOpenDropdown(!openDropdown)}>
            <style.IconWrapper isVisible={openDropdown}>
              <X size={32} />
            </style.IconWrapper>
            <style.IconWrapper isVisible={!openDropdown}>
              <List size={32} />
            </style.IconWrapper>
          </button>

          {openDropdown && (
            <ul>
              <li onClick={() => navigate('/profile')}>
                <button>
                  <User size={24} />
                  <span>Perfil</span>
                </button>
              </li>
              <li onClick={() => handleSignOut()}>
                <button>
                  <SignOut size={24} />
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          )}
        </style.ButtonMenuContainer>
      )}
    </style.Container>
  );
}

export default HeaderWithMenu;
