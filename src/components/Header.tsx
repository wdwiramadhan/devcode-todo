import * as React from "react";
import { Link } from "react-router-dom";
import { Container } from ".";

function Header() {
  return (
    <header
      className="bg-primary pt-[19px] pb-[18px] sm:pt-[38px] sm:pb-[31px] w-full"
      data-cy="header-background"
    >
      <Container>
        <Link to="/">
          <h1
            className="text:lg sm:text-2xl text-white font-bold leading-[27px] sm:leading-9"
            data-cy="header-title"
          >
            TO DO LIST APP
          </h1>
        </Link>
      </Container>
    </header>
  );
}

export default Header;
