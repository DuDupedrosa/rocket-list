import styled from 'styled-components';
import TheHeader from './TheHeader';
import AddNewTask from './task/AddNewTask';
import HeaderWithMenu from './headerWithMenu/HeaderWithMenu';

const HomeBox = styled.div``;

function Home() {
  return (
    <HomeBox>
      <HeaderWithMenu />
      <TheHeader />
      <AddNewTask />
    </HomeBox>
  );
}

export default Home;
