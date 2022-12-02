import * as S from './styles';

export const Header = () => {
  return (
    <S.MainHeader>
      <S.MenuItem to="/">Home</S.MenuItem>
      <S.MenuItem to="/customers">Customers</S.MenuItem>
      <S.MenuItem to="/users">Users</S.MenuItem>
      <S.MenuItem to="/businesses">Businesses</S.MenuItem>
    </S.MainHeader>
  );
};
