const HeaderGuest = (props) => {
  const { openLoginModal } = props;
  return (
    <header className="g-header">
      <button type="button" onClick={openLoginModal}>Login</button>
    </header>
  )
}

export default HeaderGuest;