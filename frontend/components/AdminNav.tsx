import * as React from "react";

import { signOut } from "next-auth/client";

type NavBarProps = {
  props: string;
}

export default function NavBar(props: NavBarProps) {
  return (
  <div className="usersignedinnav">
    <div className="usersignedin">
      <p>Kirjautuneena sisään käyttäjänä {props.props}</p>
      <button className="signoutbutton" onClick={() => signOut()}>Kirjaudu ulos</button>
    </div>
  </div>
  )
}