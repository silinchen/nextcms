import Link from 'next/link'
import Logo from '@components/logo'
import Container from '@components/container'
import Search from './search'
import styles from '../styles.less'

function Navbar() {
  return (
    <Container>
      <nav className={styles.nav}>
        <Link href="/">
          <img src="/images/logo.jpg" width="60" />
        </Link>
        <Search></Search>
      </nav>
    </Container>
  );
}

export default Navbar
