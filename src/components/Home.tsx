import styled from 'styled-components';
import TheHeader from './TheHeader';
import AddNewTask from './task/AddNewTask';

const HomeBox = styled.div``;

function Home() {
  return (
    <HomeBox>
      <TheHeader />
      <AddNewTask />
    </HomeBox>
  );
}

export default Home;
