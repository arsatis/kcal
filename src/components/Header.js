function Header(props) {
    let title = "hello world"
    return (
      <header className={props.className}>
        <h1>{title}</h1>
      </header>
    )
}

export default Header;
