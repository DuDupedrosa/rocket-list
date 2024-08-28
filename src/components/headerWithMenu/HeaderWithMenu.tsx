import { House, List, SignOut, User, X } from 'phosphor-react';
import styled from 'styled-components';
import Logo from '../../assets/Logo.svg';
import { useEffect, useState } from 'react';
import http from '../../api/http';
import { useNavigate } from 'react-router-dom';
import { fadeIn, fadeInDown } from '../../style/styled-components/Animation';
import * as style from './style/HeaderWithMenuStyle';
import Button from '../ui/buttons/Button';

function HeaderWithMenu() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  async function validToken() {
    setLoading(true);
    try {
      const { data } = await http.get('validate-token');

      if (data.content.validToken) {
        setShowMenu(true);
      }
    } catch (err) {
      setShowMenu(false);
    }
    setLoading(false);
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

      {showMenu && !loading && (
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
              <li onClick={() => navigate('/')}>
                <button>
                  <House size={24} />
                  <span>Home</span>
                </button>
              </li>
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

      {!showMenu && !loading && (
        <style.ButtonToLoginContainer onClick={() => navigate('/auth')}>
          <Button>Login / Cadastro</Button>
        </style.ButtonToLoginContainer>
      )}
    </style.Container>
  );
}

export default HeaderWithMenu;
